import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Chip
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  ShoppingBag as ShoppingBagIcon,
  ArrowBack as ArrowBackIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import type { Order, Customer, Book } from '../types';

const OrderSuccess = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError('Không tìm thấy mã đơn hàng');
        setLoading(false);
        return;
      }

      try {
        // Fetch order details
        const orderResponse = await fetch(`http://localhost:3001/api/purchase_orders/${orderId}`);
        if (!orderResponse.ok) {
          throw new Error('Không tìm thấy đơn hàng');
        }
        const orderData: Order = await orderResponse.json();
        setOrder(orderData);

        // Fetch customer details
        const customerResponse = await fetch(`http://localhost:3001/api/customers/${orderData.customer_id}`);
        if (customerResponse.ok) {
          const customerData: Customer = await customerResponse.json();
          setCustomer(customerData);
        }

        // Fetch books details for order items
        const bookIds = orderData.order_items.map(item => item.book_id);
        const booksResponse = await fetch('http://localhost:3001/api/books');
        if (booksResponse.ok) {
          const allBooks: Book[] = await booksResponse.json();
          const orderBooks = allBooks.filter(book => bookIds.includes(book.id));
          setBooks(orderBooks);
        }
      } catch (err: any) {
        setError(err.message || 'Đã xảy ra lỗi khi tải thông tin đơn hàng');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  const getBookTitle = (bookId: number): string => {
    const book = books.find(b => b.id === bookId);
    return book ? book.title : `Sách ID: ${bookId}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Chờ xử lý':
        return 'warning';
      case 'Đang xử lý':
        return 'info';
      case 'Đã gửi hàng':
        return 'primary';
      case 'Đã giao':
        return 'success';
      case 'Đã hủy':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Typography variant="h6">Đang tải...</Typography>
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{error || 'Không tìm thấy đơn hàng'}</Typography>
        <Button variant="contained" onClick={() => navigate('/')}>Về trang chủ</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f9fafb', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        {/* Success Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <CheckIcon sx={{ fontSize: 80, color: '#059669', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#059669', mb: 1 }}>
            Đặt hàng thành công!
          </Typography>
          <Typography variant="h6" sx={{ color: '#6b7280' }}>
            Cảm ơn bạn đã mua hàng. Đơn hàng #{order.id} đã được tạo thành công.
          </Typography>
        </Box>

        {/* Order Details */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Chi tiết đơn hàng
              </Typography>
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={handlePrint}
                sx={{ '@media print': { display: 'none' } }}
              >
                In hóa đơn
              </Button>
            </Box>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Thông tin đơn hàng
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Mã đơn hàng:</strong> #{order.id}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Ngày đặt:</strong> {new Date(order.order_date).toLocaleDateString('vi-VN')}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2">
                      <strong>Trạng thái:</strong>
                    </Typography>
                    <Chip 
                      label={order.status} 
                      color={getStatusColor(order.status) as any}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2">
                    <strong>Phương thức thanh toán:</strong> {order.payment_method}
                  </Typography>
                </Paper>
              </Grid>

              {customer && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Thông tin giao hàng
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Họ tên:</strong> {customer.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Email:</strong> {customer.email}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Điện thoại:</strong> {customer.phone}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Địa chỉ:</strong> {order.shipping_address}
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>

            {order.notes && (
              <Paper sx={{ p: 2, mt: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Ghi chú
                </Typography>
                <Typography variant="body2">{order.notes}</Typography>
              </Paper>
            )}
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, display: 'flex', alignItems: 'center' }}>
              <ShoppingBagIcon sx={{ mr: 1 }} />
              Sản phẩm đã đặt
            </Typography>

            <List>
              {order.order_items.map((item, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar 
                      variant="rounded"
                      sx={{ width: 56, height: 56, backgroundColor: '#e5e7eb' }}
                    >
                      📚
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={getBookTitle(item.book_id)}
                    secondary={`Số lượng: ${item.quantity} × $${item.unit_price.toFixed(2)}`}
                    sx={{ ml: 2 }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    ${item.subtotal.toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ minWidth: 200 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Tạm tính:</Typography>
                  <Typography variant="body1">
                    ${(order.total_amount - order.shipping_fee + (order.discount || 0)).toFixed(2)}
                  </Typography>
                </Box>
                {order.discount && order.discount > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Giảm giá:</Typography>
                    <Typography variant="body1" sx={{ color: '#059669' }}>
                      -${order.discount.toFixed(2)}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Phí vận chuyển:</Typography>
                  <Typography variant="body1">
                    {order.shipping_fee === 0 ? 'Miễn phí' : `$${order.shipping_fee.toFixed(2)}`}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Tổng cộng:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2563eb' }}>
                    ${order.total_amount.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, '@media print': { display: 'none' } }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
          >
            Tiếp tục mua sắm
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default OrderSuccess;
