import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Breadcrumbs,
  Link as MuiLink,
  Stepper,
  Step,
  StepLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import type { CheckoutFormData, Customer, Order, OrderItem } from '../types';

const steps = ['Thông tin giao hàng', 'Phương thức thanh toán', 'Xác nhận đơn hàng'];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [orderCreated, setOrderCreated] = useState<string | null>(null);

  const [formData, setFormData] = useState<CheckoutFormData>({
    customer: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    payment_method: 'Tiền mặt',
    notes: ''
  });

  const totalPrice = getTotalPrice();
  const shippingFee = totalPrice > 50 ? 0 : 5;
  const finalTotal = totalPrice + shippingFee;

  // Navigate to order success if order was created
  if (orderCreated) {
    navigate(`/order-success/${orderCreated}`);
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (field: keyof Customer | 'payment_method' | 'notes', value: string) => {
    if (field === 'payment_method' || field === 'notes') {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        customer: {
          ...prev.customer,
          [field]: value
        }
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        const { name, email, phone, address } = formData.customer;
        return !!(name && email && phone && address);
      case 1:
        return !!formData.payment_method;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
      setError('');
    } else {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
    setError('');
  };

  const createOrder = async (): Promise<void> => {
    setLoading(true);
    try {
      // Tạo customer trước
      const customerResponse = await fetch('http://localhost:3001/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData.customer,
          registration_date: new Date().toISOString().split('T')[0],
          total_orders: 1
        }),
      });

      if (!customerResponse.ok) {
        throw new Error('Không thể tạo thông tin khách hàng');
      }

      const customer = await customerResponse.json();

      // Tạo order items
      const orderItems: OrderItem[] = items.map(item => ({
        book_id: item.book.id,
        quantity: item.quantity,
        unit_price: item.book.price,
        subtotal: item.book.price * item.quantity
      }));

      // Tạo order
      const order: Omit<Order, 'id'> = {
        customer_id: customer.id,
        order_date: new Date().toISOString().split('T')[0],
        status: 'Chờ xử lý',
        total_amount: finalTotal,
        shipping_address: formData.customer.address,
        payment_method: formData.payment_method,
        shipping_fee: shippingFee,
        discount: 0,
        notes: formData.notes || undefined,
        order_items: orderItems
      };

      const orderResponse = await fetch('http://localhost:3001/api/purchase_orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!orderResponse.ok) {
        throw new Error('Không thể tạo đơn hàng');
      }

      const createdOrder = await orderResponse.json();

      // Cập nhật stock cho các sách
      for (const item of items) {
        const newStock = item.book.stock - item.quantity;
        await fetch(`http://localhost:3001/api/books/${item.book.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stock: Math.max(0, newStock)
          }),
        });
      }

      // Xóa giỏ hàng và set order ID để navigate
      clearCart();
      setOrderCreated(createdOrder.id.toString());
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi khi tạo đơn hàng');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1 }} />
                Thông tin giao hàng
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Họ và tên *"
                    value={formData.customer.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email *"
                    value={formData.customer.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Số điện thoại *"
                    value={formData.customer.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Địa chỉ giao hàng *"
                    placeholder="Ví dụ: 123 Đường Lê Lợi, Quận 1, TP.HCM"
                    value={formData.customer.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <PaymentIcon sx={{ mr: 1 }} />
                Phương thức thanh toán
              </Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend">Chọn phương thức thanh toán</FormLabel>
                <RadioGroup
                  value={formData.payment_method}
                  onChange={(e) => handleInputChange('payment_method', e.target.value)}
                >
                  <FormControlLabel
                    value="Tiền mặt"
                    control={<Radio />}
                    label="Thanh toán khi nhận hàng (COD)"
                    required
                  />
                  <FormControlLabel
                    value="Thẻ tín dụng"
                    control={<Radio />}
                    label="Thẻ tín dụng/ghi nợ"
                    required
                  />
                  <FormControlLabel
                    value="Chuyển khoản"
                    control={<Radio />}
                    label="Chuyển khoản ngân hàng"
                    required
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Ghi chú (tùy chọn)"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                sx={{ mt: 3 }}
              />
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <CheckIcon sx={{ mr: 1 }} />
                Xác nhận đơn hàng
              </Typography>

              {/* Customer Info */}
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Thông tin khách hàng
                </Typography>
                <Typography variant="body2">Họ tên: {formData.customer.name}</Typography>
                <Typography variant="body2">Email: {formData.customer.email}</Typography>
                <Typography variant="body2">Điện thoại: {formData.customer.phone}</Typography>
                <Typography variant="body2">
                  Địa chỉ: {formData.customer.address}
                </Typography>
              </Paper>

              {/* Payment Method */}
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Phương thức thanh toán
                </Typography>
                <Typography variant="body2">
                  {formData.payment_method}
                </Typography>
                {formData.notes && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Ghi chú: {formData.notes}
                  </Typography>
                )}
              </Paper>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f9fafb', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink underline="hover" color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            Trang chủ
          </MuiLink>
          <MuiLink underline="hover" color="inherit" onClick={() => navigate('/cart')} sx={{ cursor: 'pointer' }}>
            Giỏ hàng
          </MuiLink>
          <Typography color="text.primary">Thanh toán</Typography>
        </Breadcrumbs>

        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
          Thanh toán
        </Typography>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {renderStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Quay lại
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={createOrder}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <CheckIcon />}
                  sx={{ minWidth: 200 }}
                >
                  {loading ? 'Đang xử lý...' : 'Đặt hàng'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  Tiếp tục
                </Button>
              )}
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ position: 'sticky', top: 20 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, display: 'flex', alignItems: 'center' }}>
                  <CartIcon sx={{ mr: 1 }} />
                  Đơn hàng của bạn
                </Typography>

                <List>
                  {items.map((item) => (
                    <ListItem key={item.id} sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar
                          src={item.book.cover_image}
                          variant="rounded"
                          sx={{ width: 56, height: 56 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.book.title}
                        secondary={`Số lượng: ${item.quantity}`}
                        sx={{ ml: 2 }}
                      />
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        ${(item.book.price * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Tạm tính:</Typography>
                    <Typography variant="body1">${totalPrice.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Phí vận chuyển:</Typography>
                    <Typography variant="body1" sx={{ color: shippingFee === 0 ? '#059669' : 'inherit' }}>
                      {shippingFee === 0 ? 'Miễn phí' : `$${shippingFee.toFixed(2)}`}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Tổng cộng:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2563eb' }}>
                    ${finalTotal.toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Checkout;
