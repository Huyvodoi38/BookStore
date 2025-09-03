import {
  Container,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1f2937', color: 'white' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                marginBottom: 2
              }}
            >
              BookStore
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#d1d5db',
                marginBottom: 2
              }}
            >
              Cửa hàng sách trực tuyến hàng đầu Việt Nam, cung cấp đa dạng các thể loại sách 
              từ văn học, khoa học đến kinh doanh với chất lượng và dịch vụ tốt nhất.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ 
                color: '#d1d5db',
                '&:hover': { color: 'white' }
              }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ 
                color: '#d1d5db',
                '&:hover': { color: 'white' }
              }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ 
                color: '#d1d5db',
                '&:hover': { color: 'white' }
              }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ 
                color: '#d1d5db',
                '&:hover': { color: 'white' }
              }}>
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                marginBottom: 2
              }}
            >
              Danh mục
            </Typography>
            <List dense>
              <ListItem sx={{ paddingLeft: 0 }}>
                <ListItemText 
                  primary="Văn học" 
                  sx={{ 
                    color: '#d1d5db',
                    '&:hover': { color: 'white' },
                    cursor: 'pointer'
                  }}
                />
              </ListItem>
              <ListItem sx={{ paddingLeft: 0 }}>
                <ListItemText 
                  primary="Khoa học" 
                  sx={{ 
                    color: '#d1d5db',
                    '&:hover': { color: 'white' },
                    cursor: 'pointer'
                  }}
                />
              </ListItem>
              <ListItem sx={{ paddingLeft: 0 }}>
                <ListItemText 
                  primary="Kinh doanh" 
                  sx={{ 
                    color: '#d1d5db',
                    '&:hover': { color: 'white' },
                    cursor: 'pointer'
                  }}
                />
              </ListItem>
              <ListItem sx={{ paddingLeft: 0 }}>
                <ListItemText 
                  primary="Tự lực" 
                  sx={{ 
                    color: '#d1d5db',
                    '&:hover': { color: 'white' },
                    cursor: 'pointer'
                  }}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                marginBottom: 2
              }}
            >
              Hỗ trợ
            </Typography>
            <List dense>
              <ListItem sx={{ paddingLeft: 0 }}>
                <ListItemText 
                  primary="Hướng dẫn mua hàng" 
                  sx={{ 
                    color: '#d1d5db',
                    '&:hover': { color: 'white' },
                    cursor: 'pointer'
                  }}
                />
              </ListItem>
              <ListItem sx={{ paddingLeft: 0 }}>
                <ListItemText 
                  primary="Chính sách đổi trả" 
                  sx={{ 
                    color: '#d1d5db',
                    '&:hover': { color: 'white' },
                    cursor: 'pointer'
                  }}
                />
              </ListItem>
              <ListItem sx={{ paddingLeft: 0 }}>
                <ListItemText 
                  primary="Chính sách bảo mật" 
                  sx={{ 
                    color: '#d1d5db',
                    '&:hover': { color: 'white' },
                    cursor: 'pointer'
                  }}
                />
              </ListItem>
              <ListItem sx={{ paddingLeft: 0 }}>
                <ListItemText 
                  primary="Điều khoản sử dụng" 
                  sx={{ 
                    color: '#d1d5db',
                    '&:hover': { color: 'white' },
                    cursor: 'pointer'
                  }}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                marginBottom: 2
              }}
            >
              Liên hệ
            </Typography>
            <List dense>
              <ListItem sx={{ paddingLeft: 0 }}>
                <LocationIcon sx={{ color: '#d1d5db', marginRight: 1 }} />
                <ListItemText 
                  primary="123 Đường ABC, Quận 1, TP.HCM" 
                  sx={{ color: '#d1d5db' }}
                />
              </ListItem>
              <ListItem sx={{ paddingLeft: 0 }}>
                <PhoneIcon sx={{ color: '#d1d5db', marginRight: 1 }} />
                <ListItemText 
                  primary="+84 123 456 789" 
                  sx={{ color: '#d1d5db' }}
                />
              </ListItem>
              <ListItem sx={{ paddingLeft: 0 }}>
                <EmailIcon sx={{ color: '#d1d5db', marginRight: 1 }} />
                <ListItemText 
                  primary="info@bookstore.com" 
                  sx={{ color: '#d1d5db' }}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Divider sx={{ 
          marginY: 4,
          backgroundColor: '#374151'
        }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#d1d5db' }}>
            © 2024 BookStore. Tất cả quyền được bảo lưu.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
