import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import {
  ShoppingCartOutlined,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shippingFee = totalPrice > 50 ? 0 : 5; // Free shipping over $50
  const finalTotal = totalPrice + shippingFee;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleClearCart = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <Box sx={{ backgroundColor: '#f9fafb', minHeight: '60vh', py: 4 }}>
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ mb: 3 }}>
            <MuiLink underline="hover" color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
              Trang chủ
            </MuiLink>
            <Typography color="text.primary">Giỏ hàng</Typography>
          </Breadcrumbs>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '40vh',
            textAlign: 'center'
          }}>
            <ShoppingCartOutlined sx={{ fontSize: 80, color: '#9ca3af', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#374151' }}>
              Giỏ hàng của bạn đang trống
            </Typography>
            <Typography variant="body1" sx={{ color: '#6b7280', mb: 3 }}>
              Hãy thêm một số sách để bắt đầu mua sắm!
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              sx={{
                backgroundColor: '#2563eb',
                '&:hover': {
                  backgroundColor: '#1d4ed8'
                }
              }}
            >
              Tiếp tục mua sắm
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f9fafb', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink underline="hover" color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            Trang chủ
          </MuiLink>
          <Typography color="text.primary">Giỏ hàng</Typography>
        </Breadcrumbs>

        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Giỏ hàng của bạn
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280', mb: 4 }}>
          {totalItems} sản phẩm trong giỏ hàng
        </Typography>

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleClearCart}
                sx={{ mb: 2 }}
              >
                Xóa tất cả
              </Button>
            </Box>
            
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ position: 'sticky', top: 20 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Tóm tắt đơn hàng
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Tạm tính ({totalItems} sản phẩm):</Typography>
                    <Typography variant="body1">${totalPrice.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Phí vận chuyển:</Typography>
                    <Typography variant="body1" sx={{ color: shippingFee === 0 ? '#059669' : 'inherit' }}>
                      {shippingFee === 0 ? 'Miễn phí' : `$${shippingFee.toFixed(2)}`}
                    </Typography>
                  </Box>
                  {shippingFee === 0 && (
                    <Typography variant="caption" sx={{ color: '#059669', display: 'block' }}>
                      Bạn được miễn phí vận chuyển!
                    </Typography>
                  )}
                  {shippingFee > 0 && (
                    <Typography variant="caption" sx={{ color: '#6b7280', display: 'block' }}>
                      Mua thêm ${(50 - totalPrice).toFixed(2)} để được miễn phí vận chuyển
                    </Typography>
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Tổng cộng:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2563eb' }}>
                    ${finalTotal.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                  sx={{
                    backgroundColor: '#2563eb',
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: '#1d4ed8'
                    }
                  }}
                >
                  Tiến hành thanh toán
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate('/')}
                  sx={{ mt: 2 }}
                >
                  Tiếp tục mua sắm
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;
