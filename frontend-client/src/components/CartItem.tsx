import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  TextField,
  Button,
  Grid
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= item.book.stock) {
      setQuantity(newQuantity);
      updateQuantity(item.book.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.book.id);
  };

  const subtotal = item.book.price * quantity;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Book Image */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <CardMedia
              component="img"
              height="120"
              image={item.book.cover_image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop'}
              alt={item.book.title}
              sx={{
                objectFit: 'cover',
                borderRadius: 1
              }}
            />
          </Grid>

          {/* Book Info */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {item.book.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
              Còn lại: {item.book.stock} sách
            </Typography>
            <Typography variant="h6" sx={{ color: '#2563eb', fontWeight: 'bold' }}>
              ${item.book.price}
            </Typography>
          </Grid>

          {/* Quantity Controls */}
          <Grid size={{ xs: 12, sm: 3 }}>
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
                  max: item.book.stock,
                  style: { textAlign: 'center' }
                }}
                sx={{
                  width: '60px',
                  '& .MuiOutlinedInput-root': {
                    height: '36px'
                  }
                }}
              />
              <IconButton
                size="small"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= item.book.stock}
                sx={{
                  border: '1px solid #e5e7eb',
                  borderRadius: 1
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Subtotal and Remove */}
          <Grid size={{ xs: 12, sm: 2 }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2563eb', mb: 1 }}>
                ${subtotal.toFixed(2)}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={handleRemove}
                sx={{ minWidth: 'auto' }}
              >
                Xóa
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItem;
