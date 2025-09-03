import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    Container,
    Box,
    IconButton,
    Paper,
} from '@mui/material';
import {
    Book as BookIcon,
    ShoppingCart as CartIcon,
    Favorite as FavoriteIcon,
    LocalShipping as ShippingIcon,
    Security as SecurityIcon,
    Support as SupportIcon,
    ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

interface Book {
    id: number;
    title: string;
    author_id: number;
    category_ids: number[];
    published_date: string;
    price: number;
    stock: number;
    likes: number;
    cover_image?: string;
}

interface Author {
    id: number;
    name: string;
    nationality: string;
    profile_image?: string;
}

interface Category {
    id: number;
    name: string;
    description: string;
}

const Home = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [booksRes, authorsRes, categoriesRes] = await Promise.all([
                    fetch('http://localhost:3001/api/books'),
                    fetch('http://localhost:3001/api/authors'),
                    fetch('http://localhost:3001/api/categories')
                ]);

                const booksData = await booksRes.json();
                const authorsData = await authorsRes.json();
                const categoriesData = await categoriesRes.json();

                setBooks(booksData);
                setAuthors(authorsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getAuthorName = (authorId: number) => {
        const author = authors.find(a => a.id === authorId);
        return author ? author.name : 'Unknown Author';
    };

    const getCategoryNames = (categoryIds: number[]) => {
        return categoryIds
            .map(id => categories.find(c => c.id === id)?.name)
            .filter(Boolean)
            .join(', ');
    };

    const featuredBooks = books.slice(0, 8);
    const topCategories = categories.slice(0, 6);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Typography variant="h6">Đang tải...</Typography>
            </Box>
        );
    }

    const handleBookClick = (bookId: number) => {
        navigate(`/books/${bookId}`);
        window.scrollTo(0, 0);
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            {/* Hero Section */}
            <Box sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                color: 'white',
                position: 'relative'
            }}>
                <Container maxWidth="lg" disableGutters sx={{ py: 10, px: { xs: 2, sm: 3, md: 4 } }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 'bold',
                                    marginBottom: 2
                                }}
                            >
                                Khám phá thế giới sách
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    marginBottom: 3,
                                    color: '#dbeafe'
                                }}
                            >
                                Hơn 1000 đầu sách chất lượng với đa dạng thể loại từ văn học, khoa học đến kinh doanh
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ position: 'relative' }}>
                                <Box
                                    component="img"
                                    src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"
                                    alt="Books"
                                    sx={{
                                        width: '100%',
                                        borderRadius: 2,
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                                    }}
                                />
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: -16,
                                    left: -16,
                                    backgroundColor: '#2563eb',
                                    padding: 2,
                                    borderRadius: 2,
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                }}>
                                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                        {books.length}+ Sách
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'white' }}>
                                        Có sẵn
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Stats Section */}
            <Container maxWidth="lg" sx={{ py: 8, px: { xs: 2, sm: 3, md: 4 } }}>

                {/* Featured Books Section */}
                <Box sx={{ marginBottom: 8 }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 4
                    }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                color: '#1f2937'
                            }}
                        >
                            Sách nổi bật
                        </Typography>
                        <Button
                            variant="outlined"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                borderColor: '#2563eb',
                                color: '#2563eb',
                                '&:hover': {
                                    backgroundColor: '#2563eb',
                                    color: 'white'
                                }
                            }}
                        >
                            Xem tất cả
                        </Button>
                    </Box>
                    <Grid container spacing={2}>
                        {featuredBooks.map((book) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={book.id}>
                                <Card onClick={() => handleBookClick(book.id)} sx={{
                                    height: '100%',
                                    '&:hover': {
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        transition: 'box-shadow 0.3s ease-in-out',
                                        transform: 'scale(1.05)',
                                        cursor: 'pointer'
                                    }
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="280"
                                        image={book.cover_image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop'}
                                        alt={book.title}
                                        sx={{
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <CardContent sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flex: 1
                                    }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                marginBottom: 1,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical'
                                            }}
                                        >
                                            {book.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#6b7280',
                                                marginBottom: 1
                                            }}
                                        >
                                            {getAuthorName(book.author_id)}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                            <FavoriteIcon sx={{ color: '#ef4444', fontSize: 16, marginRight: 0.5 }} />
                                            <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                                                {book.likes} lượt thích
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#9ca3af',
                                                marginBottom: 1.5,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {getCategoryNames(book.category_ids)}
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginTop: 'auto'
                                        }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2563eb' }}>
                                                ${book.price}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                <IconButton size="small" sx={{
                                                    color: '#9ca3af',
                                                    '&:hover': { color: '#ef4444' }
                                                }}>
                                                    <FavoriteIcon />
                                                </IconButton>
                                                <IconButton size="small" sx={{
                                                    color: '#9ca3af',
                                                    '&:hover': { color: '#2563eb' }
                                                }}>
                                                    <CartIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Categories Section */}
                <Box sx={{ marginBottom: 8 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1f2937',
                            textAlign: 'center',
                            marginBottom: 4
                        }}
                    >
                        Khám phá theo thể loại
                    </Typography>
                    <Grid container spacing={3}>
                        {topCategories.map((category) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
                                <Paper sx={{
                                    padding: 3,
                                    '&:hover': {
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        transition: 'box-shadow 0.3s ease-in-out',
                                        cursor: 'pointer'
                                    }
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                        <BookIcon sx={{ color: '#2563eb', fontSize: 32, marginRight: 1.5 }} />
                                        <Typography variant="h6" sx={{
                                            fontWeight: 600,
                                            '&:hover': { color: '#2563eb' }
                                        }}>
                                            {category.name}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#6b7280',
                                            marginBottom: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical'
                                        }}
                                    >
                                        {category.description}
                                    </Typography>
                                    <Button
                                        variant="text"
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            color: '#2563eb',
                                            '&:hover': {
                                                backgroundColor: '#eff6ff'
                                            }
                                        }}
                                    >
                                        Khám phá
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Features Section */}
                <Box sx={{ marginBottom: 8 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1f2937',
                            textAlign: 'center',
                            marginBottom: 4
                        }}
                    >
                        Tại sao chọn chúng tôi?
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <ShippingIcon sx={{ color: '#2563eb', fontSize: 48, marginBottom: 2 }} />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        marginBottom: 1
                                    }}
                                >
                                    Giao hàng nhanh
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                    Giao hàng trong 24h tại TP.HCM và 2-3 ngày cho các tỉnh khác
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <SecurityIcon sx={{ color: '#059669', fontSize: 48, marginBottom: 2 }} />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        marginBottom: 1
                                    }}
                                >
                                    Thanh toán an toàn
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                    Hỗ trợ nhiều phương thức thanh toán bảo mật
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <SupportIcon sx={{ color: '#ea580c', fontSize: 48, marginBottom: 2 }} />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        marginBottom: 1
                                    }}
                                >
                                    Hỗ trợ 24/7
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                    Đội ngũ hỗ trợ khách hàng chuyên nghiệp
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <BookIcon sx={{ color: '#7c3aed', fontSize: 48, marginBottom: 2 }} />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        marginBottom: 1
                                    }}
                                >
                                    Sách chất lượng
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                    Chỉ bán sách chính hãng, chất lượng cao
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Home;