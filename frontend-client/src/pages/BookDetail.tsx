import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, Button, Chip, Breadcrumbs, Link as MuiLink } from '@mui/material'
import { Favorite as FavoriteIcon } from '@mui/icons-material'

interface Book {
    id: number
    title: string
    author_id: number
    category_ids: number[]
    published_date: string
    price: number
    stock: number
    likes: number
    cover_image?: string
    description?: string
}

interface Author {
    id: number
    name: string
    nationality: string
    profile_image?: string
}

interface Category {
    id: number
    name: string
}

const BookDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [book, setBook] = useState<Book | null>(null)
    const [author, setAuthor] = useState<Author | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            setLoading(true)
            setError(null)
            try {
                const bookRes = await fetch(`http://localhost:3001/api/books/${id}`)
                if (!bookRes.ok) throw new Error('Không tìm thấy sách')
                const bookData: Book = await bookRes.json()
                setBook(bookData)

                const [authorRes, categoriesRes] = await Promise.all([
                    fetch(`http://localhost:3001/api/authors/${bookData.author_id}`),
                    fetch('http://localhost:3001/api/categories')
                ])
                if (authorRes.ok) {
                    const authorData: Author = await authorRes.json()
                    setAuthor(authorData)
                }
                if (categoriesRes.ok) {
                    const categoriesData: Category[] = await categoriesRes.json()
                    setCategories(categoriesData)
                }
            } catch (e: any) {
                setError(e.message || 'Đã xảy ra lỗi')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    const categoryChips = () => {
        if (!book) return null
        const map = new Map<number, string>()
        categories.forEach(c => map.set(c.id, c.name))
        return book.category_ids.map(cid => (
            <Chip key={cid} label={map.get(cid) || `Thể loại ${cid}`} sx={{ mr: 1, mb: 1 }} />
        ))
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <Typography variant="h6">Đang tải...</Typography>
            </Box>
        )
    }

    if (error || !book) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>{error || 'Không tìm thấy sách'}</Typography>
                <Button variant="contained" onClick={() => navigate(-1)}>Quay lại</Button>
            </Box>
        )
    }

    return (
        <Box sx={{ backgroundColor: '#f9fafb', py: 4 }}>
            <Container maxWidth="lg">
                <Breadcrumbs sx={{ mb: 3 }}>
                    <MuiLink underline="hover" color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                        Trang chủ
                    </MuiLink>
                    <Typography color="text.primary">{book.title}</Typography>
                </Breadcrumbs>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="480"
                                image={book.cover_image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=800&fit=crop'}
                                alt={book.title}
                                sx={{ objectFit: 'cover' }}
                            />
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>{book.title}</Typography>
                                <Typography variant="subtitle1" sx={{ color: '#6b7280', mb: 2 }}>
                                    {author ? author.name : 'Không rõ tác giả'}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <FavoriteIcon sx={{ color: '#ef4444', mr: 1 }} />
                                    <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                                        {book.likes} lượt thích
                                    </Typography>
                                </Box>
                                <Box sx={{ mb: 2 }}>{categoryChips()}</Box>
                                <Typography variant="h5" sx={{ color: '#2563eb', fontWeight: 'bold', mb: 2 }}>
                                    ${book.price}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 3, color: '#374151' }}>
                                    {book.description || 'Chưa có mô tả cho cuốn sách này.'}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button variant="contained" color="primary">Thêm vào giỏ</Button>
                                    <Button variant="outlined" color="primary">Mua ngay</Button>
                                </Box>
                                <Typography variant="caption" sx={{ display: 'block', mt: 2, color: book.stock > 0 ? '#059669' : '#ef4444' }}>
                                    {book.stock > 0 ? `Còn hàng (${book.stock})` : 'Hết hàng'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default BookDetail

