import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookIcon from '@mui/icons-material/Book';
import CustomerIcon from '@mui/icons-material/Person';
import OrderIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SubMenu from './SubMenu';
import PopupMenu from './PopupMenu';
import { useRef } from 'react';
import { canAccessResource } from '../Authentication/ResourceByRole';
import DashboardIcon from '@mui/icons-material/Dashboard';

interface CustomMenuProps {
    collapsed?: boolean;
}

const CustomMenu = ({ collapsed = false }: CustomMenuProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isBookManagementOpen, setIsBookManagementOpen] = useState(true);
    const [isCustomerManagementOpen, setIsCustomerManagementOpen] = useState(true);
    const [isOrderManagementOpen, setIsOrderManagementOpen] = useState(true);
    const [showBookPopup, setShowBookPopup] = useState(false);
    const [showCustomerPopup, setShowCustomerPopup] = useState(false);
    const [showOrderPopup, setShowOrderPopup] = useState(false);
    const bookTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const customerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const orderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Kiểm tra quyền truy cập các resource
    const canAccessBooks = canAccessResource(localStorage.getItem('role') || '', 'books');
    const canAccessAuthors = canAccessResource(localStorage.getItem('role') || '', 'authors');
    const canAccessCategories = canAccessResource(localStorage.getItem('role') || '', 'categories');
    const canAccessCustomers = canAccessResource(localStorage.getItem('role') || '', 'customers');
    const canAccessPurchaseOrders = canAccessResource(localStorage.getItem('role') || '', 'purchase_orders');
    const canAccessRentalOrders = canAccessResource(localStorage.getItem('role') || '', 'rental_orders');
    // Kiểm tra xem có hiển thị menu quản lý sách không
    const showBookManagement = canAccessBooks || canAccessAuthors || canAccessCategories;

    // Kiểm tra xem có hiển thị menu quản lý khách hàng không
    const showCustomerManagement = canAccessCustomers;

    // Kiểm tra xem có hiển thị menu quản lý đơn hàng không
    const showOrderManagement = canAccessPurchaseOrders || canAccessRentalOrders;

    useEffect(() => {
    }, [showBookPopup, showCustomerPopup]);

    const handleMouseEnterBookIcon = () => {
        if (bookTimeoutRef.current) {
            clearTimeout(bookTimeoutRef.current);
        }
        setShowBookPopup(true);
    };

    const handleMouseLeaveBookIcon = () => {
        bookTimeoutRef.current = setTimeout(() => {
            setShowBookPopup(false);
        }, 50);
    };

    const handleMouseEnterBookPopup = () => {
        if (bookTimeoutRef.current) {
            clearTimeout(bookTimeoutRef.current);
        }
    };

    const handleMouseLeaveBookPopup = () => {
        setShowBookPopup(false);
    };

    const handleMouseEnterCustomerIcon = () => {
        if (customerTimeoutRef.current) {
            clearTimeout(customerTimeoutRef.current);
        }
        setShowCustomerPopup(true);
    };

    const handleMouseLeaveCustomerIcon = () => {
        customerTimeoutRef.current = setTimeout(() => {
            setShowCustomerPopup(false);
        }, 50);
    };

    const handleMouseEnterCustomerPopup = () => {
        if (customerTimeoutRef.current) {
            clearTimeout(customerTimeoutRef.current);
        }
    };

    const handleMouseLeaveCustomerPopup = () => {
        setShowCustomerPopup(false);
    };

    const handleMouseEnterOrderIcon = () => {
        if (orderTimeoutRef.current) {
            clearTimeout(orderTimeoutRef.current);
        }
        setShowOrderPopup(true);
    };

    const handleMouseLeaveOrderIcon = () => {
        orderTimeoutRef.current = setTimeout(() => {
            setShowOrderPopup(false);
        }, 50);
    };

    const handleMouseEnterOrderPopup = () => {
        if (orderTimeoutRef.current) {
            clearTimeout(orderTimeoutRef.current);
        }
    };

    const handleMouseLeaveOrderPopup = () => {
        setShowOrderPopup(false);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const toggleBookManagement = () => {
        setIsBookManagementOpen(!isBookManagementOpen);
    };

    const toggleCustomerManagement = () => {
        setIsCustomerManagementOpen(!isCustomerManagementOpen);
    };

    const toggleOrderManagement = () => {
        setIsOrderManagementOpen(!isOrderManagementOpen);
    };

    // Định nghĩa các menu items cho Quản lý sách
    const bookManagementItems = [
        ...(canAccessBooks ? [{ id: 'books', label: 'Danh mục sách', path: '/books' }] : []),
        ...(canAccessAuthors ? [{ id: 'authors', label: 'Tác giả', path: '/authors' }] : []),
        ...(canAccessCategories ? [{ id: 'categories', label: 'Thể loại', path: '/categories' }] : [])
    ];

    // Định nghĩa các menu items cho Quản lý khách hàng
    const customerManagementItems = [
        ...(canAccessCustomers ? [{ id: 'customers', label: 'Danh mục khách hàng', path: '/customers' }] : [])
    ];

    const orderManagementItems = [
        ...(canAccessPurchaseOrders ? [{ id: 'purchase_orders', label: 'Đơn mua sách', path: '/purchase_orders' }] : []),
        ...(canAccessRentalOrders ? [{ id: 'rental_orders', label: 'Đơn thuê sách', path: '/rental_orders' }] : [])
    ];

    return (
        <div style={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            height: '100%',
            position: 'relative'
        }}>
            {collapsed ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', position: 'relative' }}>
                    {/* Icon Dashboard */}
                    <div
                        style={{
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            backgroundColor: (isActive('/')) ? '#1976d2' : 'transparent',
                            position: 'relative'
                        }}
                        onClick={() => navigate('/')}
                    >
                        <DashboardIcon style={{ color: 'white', fontSize: '24px' }} />
                    </div>

                    {/* Icon Quản lý sách */}
                    {showBookManagement && (
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                backgroundColor: (isActive('/books') || isActive('/authors') || isActive('/categories')) ? '#1976d2' : 'transparent',
                                position: 'relative'
                            }}
                            onMouseEnter={handleMouseEnterBookIcon}
                            onMouseLeave={(e) => {
                                if (!(isActive('/books') || isActive('/authors') || isActive('/categories'))) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }
                                handleMouseLeaveBookIcon();
                            }}
                        >
                            <BookIcon style={{ color: 'white', fontSize: '24px' }} />
                        </div>
                    )}

                    {/* Icon Quản lý khách hàng */}
                    {showCustomerManagement && (
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                backgroundColor: (isActive('/customers')) ? '#1976d2' : 'transparent',
                                position: 'relative'
                            }}
                            onMouseEnter={handleMouseEnterCustomerIcon}
                            onMouseLeave={(e) => {
                                if (!(isActive('/customers'))) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }
                                handleMouseLeaveCustomerIcon();
                            }}
                        >
                            <CustomerIcon style={{ color: 'white', fontSize: '24px' }} />
                        </div>
                    )}

                    {/* Icon Quản lý đơn hàng */}
                    {showOrderManagement && (
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                backgroundColor: (isActive('/purchase_orders') || isActive('/rental_orders')) ? '#1976d2' : 'transparent',
                                position: 'relative'
                            }}
                            onMouseEnter={handleMouseEnterOrderIcon}
                            onMouseLeave={(e) => {
                                if (!(isActive('/purchase_orders') || isActive('/rental_orders'))) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }
                                handleMouseLeaveOrderIcon();
                            }}
                        >
                            <OrderIcon style={{ color: 'white', fontSize: '24px' }} />
                        </div>
                    )}

                    {/* Popup menus khi hover */}
                    {showBookManagement && bookManagementItems.length > 0 && (
                        <PopupMenu
                            items={bookManagementItems}
                            isVisible={showBookPopup}
                            onItemClick={handleNavigation}
                            isActive={isActive}
                            onMouseEnter={handleMouseEnterBookPopup}
                            onMouseLeave={handleMouseLeaveBookPopup}
                            position={{ left: '70px', top: '80px' }}
                        />
                    )}

                    {showCustomerManagement && customerManagementItems.length > 0 && (
                        <PopupMenu
                            items={customerManagementItems}
                            isVisible={showCustomerPopup}
                            onItemClick={handleNavigation}
                            isActive={isActive}
                            onMouseEnter={handleMouseEnterCustomerPopup}
                            onMouseLeave={handleMouseLeaveCustomerPopup}
                            position={{ left: '70px', top: '130px' }}
                        />
                    )}

                    {showOrderManagement && orderManagementItems.length > 0 && (
                        <PopupMenu
                            items={orderManagementItems}
                            isVisible={showOrderPopup}
                            onItemClick={handleNavigation}
                            isActive={isActive}
                            onMouseEnter={handleMouseEnterOrderPopup}
                            onMouseLeave={handleMouseLeaveOrderPopup}
                            position={{ left: '70px', top: '190px' }}
                        />
                    )}
                </div>
            ) : (
                <div style={{ padding: '0 8px' }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}>
                        {/* Dashboard - Menu cha */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px 16px',
                                color: 'white',
                                borderRadius: '8px',
                                transition: 'background-color 0.2s',
                                cursor: 'pointer',
                                backgroundColor: isActive('/') ? '#1976d2' : 'transparent'
                            }}
                            onMouseEnter={(e) => !isActive('/') && (e.currentTarget.style.backgroundColor = '#333')} 
                            onMouseLeave={(e) => !isActive('/') && (e.currentTarget.style.backgroundColor = 'transparent')}
                            onClick={() => navigate('/')}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <DashboardIcon style={{ color: 'white', fontSize: '20px', marginRight: '12px' }} />
                                <span>Trang chủ</span>
                            </div>
                        </div>

                        {/* Quản lý sách - Menu cha */}
                        {showBookManagement && (
                            <>
                                <div
                                    onClick={toggleBookManagement}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px 16px',
                                        color: 'white',
                                        borderRadius: '8px',
                                        transition: 'background-color 0.2s',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <BookIcon style={{ color: 'white', fontSize: '20px', marginRight: '12px' }} />
                                        <span>Quản lý sách</span>
                                    </div>
                                    {isBookManagementOpen ?
                                        <ExpandLessIcon style={{ color: 'white', fontSize: '16px' }} /> :
                                        <ExpandMoreIcon style={{ color: 'white', fontSize: '16px' }} />
                                    }
                                </div>

                                {/* Submenu Quản lý sách */}
                                <SubMenu
                                    items={bookManagementItems}
                                    isOpen={isBookManagementOpen}
                                    onItemClick={handleNavigation}
                                    isActive={isActive}
                                />
                            </>
                        )}

                        {/* Quản lý khách hàng - Menu cha */}
                        {showCustomerManagement && (
                            <>
                                <div
                                    onClick={toggleCustomerManagement}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px 16px',
                                        color: 'white',
                                        borderRadius: '8px',
                                        transition: 'background-color 0.2s',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <CustomerIcon style={{ color: 'white', fontSize: '20px', marginRight: '12px' }} />
                                        <span>Quản lý khách hàng</span>
                                    </div>
                                    {isCustomerManagementOpen ?
                                        <ExpandLessIcon style={{ color: 'white', fontSize: '16px' }} /> :
                                        <ExpandMoreIcon style={{ color: 'white', fontSize: '16px' }} />
                                    }
                                </div>

                                {/* Submenu Quản lý khách hàng */}
                                <SubMenu
                                    items={customerManagementItems}
                                    isOpen={isCustomerManagementOpen}
                                    onItemClick={handleNavigation}
                                    isActive={isActive}
                                />
                            </>
                        )}

                        {/* Quản lý đơn hàng - Menu cha */}
                        {showOrderManagement && (
                            <>
                                <div
                                    onClick={toggleOrderManagement}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px 16px',
                                        color: 'white',
                                        borderRadius: '8px',
                                        transition: 'background-color 0.2s',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <OrderIcon style={{ color: 'white', fontSize: '20px', marginRight: '12px' }} />
                                        <span>Quản lý đơn hàng</span>
                                    </div>
                                    {isOrderManagementOpen ?
                                        <ExpandLessIcon style={{ color: 'white', fontSize: '16px' }} /> :
                                        <ExpandMoreIcon style={{ color: 'white', fontSize: '16px' }} />
                                    }
                                </div>

                                {/* Submenu Quản lý đơn hàng */}
                                <SubMenu
                                    items={orderManagementItems}
                                    isOpen={isOrderManagementOpen}
                                    onItemClick={handleNavigation}
                                    isActive={isActive}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomMenu;


