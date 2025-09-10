import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, Button, Chip, Breadcrumbs, Link as MuiLink, Snackbar, Alert, TextField, IconButton } from '@mui/material'
import { Favorite as FavoriteIcon, Add as AddIcon, Remove as RemoveIcon, ShoppingCart as CartIcon } from '@mui/icons-material'
import { useCart } from '../context/CartContext'
import type { Book, Author, Category } from '../types'



const BookDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [book, setBook] = useState<Book | null>(null)
    const [author, setAuthor] = useState<Author | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')

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

    const handleQuantityChange = (newQuantity: number) => {
        if (book && newQuantity > 0 && newQuantity <= book.stock) {
            setQuantity(newQuantity)
        }
    }

    const handleAddToCart = () => {
        if (book && book.stock > 0) {
            addToCart(book, quantity)
            setSnackbarMessage(`Đã thêm ${quantity} cuốn "${book.title}" vào giỏ hàng!`)
            setSnackbarOpen(true)
        }
    }

    const handleBuyNow = () => {
        if (book && book.stock > 0) {
            addToCart(book, quantity)
            navigate('/cart')
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false)
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
                                
                                {/* Quantity Selector */}
                                {book.stock > 0 && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            Số lượng:
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleQuantityChange(quantity - 1)}
                                                disabled={quantity <= 1}
                                                sx={{
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: 1
                                                }}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <TextField
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                                inputProps={{
                                                    min: 1,
                                                    max: book.stock,
                                                    style: { textAlign: 'center' }
                                                }}
                                                sx={{
                                                    width: '80px',
                                                    '& .MuiOutlinedInput-root': {
                                                        height: '40px'
                                                    }
                                                }}
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={() => handleQuantityChange(quantity + 1)}
                                                disabled={quantity >= book.stock}
                                                sx={{
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: 1
                                                }}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                )}

                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        startIcon={<CartIcon />}
                                        onClick={handleAddToCart}
                                        disabled={book.stock === 0}
                                        sx={{ flex: 1 }}
                                    >
                                        Thêm vào giỏ
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        color="primary"
                                        onClick={handleBuyNow}
                                        disabled={book.stock === 0}
                                        sx={{ flex: 1 }}
                                    >
                                        Mua ngay
                                    </Button>
                                </Box>
                                <Typography variant="caption" sx={{ display: 'block', color: book.stock > 0 ? '#059669' : '#ef4444' }}>
                                    {book.stock > 0 ? `Còn hàng (${book.stock})` : 'Hết hàng'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* Snackbar for cart notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default BookDetail

