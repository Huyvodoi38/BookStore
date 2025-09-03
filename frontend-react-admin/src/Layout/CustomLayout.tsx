import { LayoutProps } from 'react-admin';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CustomMenu from './CustomMenu';
import AppBreadcrumbs, { usePageTitleAndCrumbs } from './AppBreadcrumbs';
import { authProvider } from '../Authentication/AuthProvider';

const CustomLayout = (props: LayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const location = useLocation();
    const { title } = usePageTitleAndCrumbs();

    const open = Boolean(anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        authProvider.logout({}).then(() => {
            window.location.reload();
        });
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // compute once to trigger rerender on route change; actual breadcrumb is in AppBreadcrumbs
    location.pathname.split('/').filter(Boolean);

    return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Custom Sidebar */}
        <div style={{ 
            width: sidebarOpen ? (isMobile ? '100%' : '250px') : '60px', 
            backgroundColor: '#1a1a1a', 
            borderRight: '1px solid #333',
            transition: 'width 0.3s ease',
            overflow: 'visible',
            position: 'relative',
            height: '100vh'
        }}>
            <div style={{ paddingTop: '20px' }}>
                {sidebarOpen ? (
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '0 16px', 
                        marginBottom: '20px' 
                    }}>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>Menu</h2>
                        <IconButton 
                            onClick={() => setSidebarOpen(false)}
                            style={{ color: 'white' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                ) : (
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        padding: '0 8px', 
                        marginBottom: '20px' 
                    }}>
                        <IconButton 
                            onClick={() => setSidebarOpen(true)}
                            style={{ color: 'white' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                )}
                <CustomMenu collapsed={!sidebarOpen} />
            </div>
        </div>

        {/* Main content area with header */}
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            flex: 1, 
            margin: isMobile ? '5px' : '10px',
            borderRadius: '15px',
            backgroundColor: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            overflow: 'hidden'
        }}>
            {/* Custom Header */}
            <div style={{ 
                backgroundColor: 'white', 
                color: '#333', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '4px',
                padding: isMobile ? '10px 15px' : '12px 20px', 
                borderBottom: '1px solid #e0e0e0',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                position: 'relative'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ 
                            margin: 0, 
                            fontSize: isMobile ? '18px' : '24px', 
                            color: '#333',
                        }}>{title}</h1>
                        <AppBreadcrumbs />
                    </div>
                    
                    {/* Personal Icon + username*/}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <IconButton
                            onClick={handleClick}
                            style={{
                                color: '#1976d2',
                                backgroundColor: '#f5f5f5',
                                width: '40px',
                                height: '40px',
                            }}
                            aria-controls={open ? 'personal-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <PersonIcon />
                        </IconButton>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                            {localStorage.getItem('username') || ''}
                        </span>
                    </div>
                </div>
                
                {/* Personal Menu Dropdown */}
                <Menu
                    id="personal-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Đăng xuất</ListItemText>
                    </MenuItem>
                </Menu>
            </div>
            
            {/* Main content - render children directly */}
            <div style={{ 
                flex: 1, 
                overflow: 'auto', 
                backgroundColor: 'white', 
                padding: isMobile ? '15px' : '20px',
                borderBottomLeftRadius: '15px',
                borderBottomRightRadius: '15px'
            }}>
                {props.children}
            </div>
        </div>
    </div>
    );
};

export default CustomLayout; 