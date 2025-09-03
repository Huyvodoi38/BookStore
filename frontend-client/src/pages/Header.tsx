import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Badge,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Book as BookIcon,
  Category as CategoryIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setCategoryAnchorEl(null);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  const categories = [
    'Tiểu thuyết',
    'Kinh tế',
    'Khoa học',
    'Văn học',
    'Thiếu nhi',
    'Giáo dục',
    'Công nghệ',
    'Nghệ thuật'
  ];

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#6CA6CD',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar sx={{ px: 4, py: 2 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 8 }}>
          <BookIcon sx={{ color: 'white', fontSize: 32, mr: 1 }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              color: 'white', 
              fontWeight: 'bold',
              fontSize: '1.5rem'
            }}
          >
            BookStore
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ flex: 1, maxWidth: '800px', mx: 4 }}>
          <form onSubmit={handleSearch}>
            <Box sx={{ position: 'relative' }}>
              <InputBase
                placeholder="Tìm kiếm sách, tác giả..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '25px',
                  padding: '8px 16px 8px 48px',
                  width: '100%',
                  '& .MuiInputBase-input': {
                    color: 'white',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      opacity: 1
                    }
                  }
                }}
              />
              <SearchIcon 
                sx={{ 
                  position: 'absolute', 
                  left: 12, 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.7)'
                }} 
              />
            </Box>
          </form>
        </Box>

        {/* Categories */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 4 }}>
          <IconButton
            onClick={handleCategoryMenuOpen}
            sx={{ 
              color: 'white',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <CategoryIcon sx={{ mr: 1 }} />
            <Typography sx={{ color: 'white', fontWeight: 500 }}>
              Danh mục
            </Typography>
          </IconButton>
          <Menu
            anchorEl={categoryAnchorEl}
            open={Boolean(categoryAnchorEl)}
            onClose={handleCategoryMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }
            }}
          >
            {categories.map((category) => (
              <MenuItem 
                key={category} 
                onClick={handleCategoryMenuClose}
                sx={{ py: 1.5 }}
              >
                <Typography>{category}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Cart */}
        <IconButton sx={{ color: 'white', mr: 2 }}>
          <Badge badgeContent={0} color="error">
            <CartIcon />
          </Badge>
        </IconButton>

        {/* Account */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleMenuOpen}
            sx={{ 
              color: 'white',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                mr: 1
              }}
            >
              <PersonIcon />
            </Avatar>
            <Typography sx={{ color: 'white', fontWeight: 500 }}>
              Tài khoản
            </Typography>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 180,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <AccountIcon sx={{ mr: 2 }} />
              Thông tin cá nhân
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <BookIcon sx={{ mr: 2 }} />
              Đơn hàng của tôi
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              Đăng xuất
            </MenuItem>
          </Menu>
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, ml: 2 }}>
          <IconButton sx={{ color: 'white' }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;