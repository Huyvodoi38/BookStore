import { useMemo } from 'react';
import { Card, CardContent, CardHeader, Typography, CircularProgress, Box } from '@mui/material';
import { useGetList } from 'react-admin';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from 'recharts';

type EntityName = 'books' | 'authors' | 'customers' | 'purchase_orders' | 'rental_orders' | 'categories';

const StatCard = ({ title, value, subtitle }: { title: string; value: number | string; subtitle?: string }) => (
    <Card elevation={2} sx={{ height: '100%' }}>
        <CardContent>
            <Typography variant="overline" color="text.secondary">
                {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
                {value}
            </Typography>
            {subtitle && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {subtitle}
                </Typography>
            )}
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const books = useGetList('books' as EntityName, {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'id', order: 'ASC' },
        filter: {},
    });
    const authors = useGetList('authors' as EntityName, {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'id', order: 'ASC' },
        filter: {},
    });
    const customers = useGetList('customers' as EntityName, {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'id', order: 'ASC' },
        filter: {},
    });
    const purchaseOrders = useGetList('purchase_orders' as EntityName, {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'order_date', order: 'ASC' },
        filter: {},
    });
    const rentalOrders = useGetList('rental_orders' as EntityName, {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'rental_date', order: 'ASC' },
        filter: {},
    });

    const isLoading =
        books.isLoading ||
        authors.isLoading ||
        customers.isLoading ||
        purchaseOrders.isLoading ||
        rentalOrders.isLoading;

    const hasError =
        books.error ||
        authors.error ||
        customers.error ||
        purchaseOrders.error ||
        rentalOrders.error;

    // Get current month and year
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // Filter data for current month
    const currentMonthPurchaseOrders = useMemo(() => {
        if (!purchaseOrders.data) return [];
        return purchaseOrders.data.filter((order: any) => {
            const orderDate = new Date(order.order_date);
            return orderDate.getFullYear() === currentYear && orderDate.getMonth() + 1 === currentMonth;
        });
    }, [purchaseOrders.data, currentYear, currentMonth]);

    const currentMonthRentalOrders = useMemo(() => {
        if (!rentalOrders.data) return [];
        return rentalOrders.data.filter((order: any) => {
            const orderDate = new Date(order.rental_date);
            return orderDate.getFullYear() === currentYear && orderDate.getMonth() + 1 === currentMonth;
        });
    }, [rentalOrders.data, currentYear, currentMonth]);

    // Current month revenue calculations
    const currentMonthPurchaseRevenue = useMemo(() => {
        return currentMonthPurchaseOrders.reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0);
    }, [currentMonthPurchaseOrders]);

    const currentMonthRentalRevenue = useMemo(() => {
        return currentMonthRentalOrders.reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0);
    }, [currentMonthRentalOrders]);

    // Daily revenue for current month
    const dailyRevenueData = useMemo(() => {
        const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
        const dailyData = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            const purchaseRevenue = currentMonthPurchaseOrders
                .filter((order: any) => order.order_date === dateStr)
                .reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0);

            const rentalRevenue = currentMonthRentalOrders
                .filter((order: any) => order.rental_date === dateStr)
                .reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0);

            dailyData.push({
                day: day,
                purchase: Number(purchaseRevenue.toFixed(2)),
                rental: Number(rentalRevenue.toFixed(2)),
                total: Number((purchaseRevenue + rentalRevenue).toFixed(2))
            });
        }

        return dailyData;
    }, [currentMonthPurchaseOrders, currentMonthRentalOrders, currentYear, currentMonth]);

    // Current month order statuses
    const currentMonthPurchaseOrdersByStatus = useMemo(() => {
        const map: Record<string, number> = {};
        currentMonthPurchaseOrders.forEach((o: any) => {
            map[o.status || 'Khác'] = (map[o.status || 'Khác'] || 0) + 1;
        });
        return Object.entries(map).map(([name, value]) => ({ name, value }));
    }, [currentMonthPurchaseOrders]);

    const currentMonthRentalOrdersByStatus = useMemo(() => {
        const map: Record<string, number> = {};
        currentMonthRentalOrders.forEach((o: any) => {
            map[o.status || 'Khác'] = (map[o.status || 'Khác'] || 0) + 1;
        });
        return Object.entries(map).map(([name, value]) => ({ name, value }));
    }, [currentMonthRentalOrders]);

    // Customer statistics for current month
    const currentMonthCustomerStats = useMemo(() => {
        const uniqueCustomers = new Set([
            ...currentMonthPurchaseOrders.map((o: any) => o.customer_id),
            ...currentMonthRentalOrders.map((o: any) => o.customer_id)
        ]);
        return {
            total: uniqueCustomers.size,
            purchaseOrders: currentMonthPurchaseOrders.length,
            rentalOrders: currentMonthRentalOrders.length
        };
    }, [currentMonthPurchaseOrders, currentMonthRentalOrders]);

    // Stock statistics
    const stockStats = useMemo(() => {
        if (!books.data) return { totalStock: 0, avgStock: 0, lowStock: 0 };
        const totalStock = books.data.reduce((sum: number, b: any) => sum + (b.stock || 0), 0);
        const avgStock = books.data.length > 0 ? (totalStock / books.data.length).toFixed(0) : 0;
        const lowStock = books.data.filter((b: any) => (b.stock || 0) < 10).length;
        return { totalStock, avgStock, lowStock };
    }, [books.data]);

    // Top 5 most purchased books this month
    const topPurchasedBooks = useMemo(() => {
        if (!books.data || !currentMonthPurchaseOrders.length) return [];

        const bookPurchaseCount: Record<number, number> = {};

        // Count purchases for each book
        currentMonthPurchaseOrders.forEach((order: any) => {
            if (order.order_items) {
                order.order_items.forEach((item: any) => {
                    bookPurchaseCount[item.book_id] = (bookPurchaseCount[item.book_id] || 0) + item.quantity;
                });
            }
        });

        // Convert to array and sort by purchase count
        const sortedBooks = Object.entries(bookPurchaseCount)
            .map(([bookId, count]) => {
                const book = books.data.find((b: any) => b.id === parseInt(bookId));
                return {
                    id: parseInt(bookId),
                    title: book?.title || `Sách #${bookId}`,
                    purchaseCount: count
                };
            })
            .sort((a, b) => b.purchaseCount - a.purchaseCount)
            .slice(0, 3);

        return sortedBooks;
    }, [books.data, currentMonthPurchaseOrders]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (hasError) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <Typography color="error">Không thể tải dữ liệu dashboard</Typography>
            </Box>
        );
    }

    const monthNames = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];

    return (
        <Box sx={{ p: 1 }}>
            {/* KPI cards */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)'
                    },
                    gap: 2,
                    mb: 2,
                }}
            >
                <StatCard
                    title="Tổng sách"
                    value={books.total ?? (books.data?.length || 0)}
                    subtitle={`${stockStats.totalStock} bản trong kho`}
                />
                <StatCard
                    title="Khách hàng tháng này"
                    value={currentMonthCustomerStats.total}
                    subtitle={`${currentMonthCustomerStats.purchaseOrders} đơn mua, ${currentMonthCustomerStats.rentalOrders} đơn thuê`}
                />
                <StatCard
                    title="Đơn mua tháng này"
                    value={currentMonthPurchaseOrders.length}
                />
                <StatCard
                    title="Đơn thuê tháng này"
                    value={currentMonthRentalOrders.length}
                />
                <StatCard
                    title="Tổng doanh thu tháng này"
                    value={(currentMonthPurchaseRevenue + currentMonthRentalRevenue).toLocaleString('vi-VN', { style: 'currency', currency: 'USD' })}
                />
                <StatCard
                    title="Doanh thu mua tháng này"
                    value={currentMonthPurchaseRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'USD' })}
                />
                <StatCard
                    title="Doanh thu thuê tháng này"
                    value={currentMonthRentalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'USD' })}
                />
                <StatCard
                    title="Sách sắp hết"
                    value={stockStats.lowStock}
                    subtitle="Dưới 10 bản"
                />
            </Box>

            {/* Daily revenue chart */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
                    gap: 2,
                    mb: 2,
                }}
            >
                <Card elevation={2} sx={{ height: 400 }}>
                    <CardHeader title={`Doanh thu theo ngày - ${monthNames[currentMonth - 1]} ${currentYear}`} subheader="So sánh mua và thuê" />
                    <CardContent sx={{ height: 320 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailyRevenueData}>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="purchase" name="Doanh thu mua" fill="#1976d2" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="rental" name="Doanh thu thuê" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card elevation={2} sx={{ height: 400 }}>
                    <CardHeader title={`Top 3 sách được mua nhiều nhất - ${monthNames[currentMonth - 1]} ${currentYear}`} subheader="Theo số lượng bán ra" />
                    <CardContent sx={{ height: 320 }}>
                        {topPurchasedBooks.length > 0 ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {topPurchasedBooks.map((book, index) => (
                                    <Box key={book.id} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        borderRadius: 1,
                                        backgroundColor: index === 0 ? 'primary.light' : 'grey.50',
                                        border: index === 0 ? '2px solid' : '1px solid',
                                        borderColor: index === 0 ? 'primary.main' : 'grey.300'
                                    }}>
                                        <Typography variant="h6" sx={{
                                            minWidth: 40,
                                            textAlign: 'center',
                                            color: index === 0 ? 'white' : 'text.primary'
                                        }}>
                                            #{index + 1}
                                        </Typography>
                                        <Box sx={{ flex: 1, ml: 2 }}>
                                            <Typography variant="body1" sx={{
                                                fontWeight: index === 0 ? 'bold' : 'normal',
                                                color: index === 0 ? 'white' : 'text.primary',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {book.title}
                                            </Typography>
                                        </Box>
                                        <Typography variant="h6" sx={{
                                            color: index === 0 ? 'white' : 'primary.main',
                                            fontWeight: 'bold'
                                        }}>
                                            {book.purchaseCount}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <Typography variant="body1" color="text.secondary">
                                    Chưa có dữ liệu mua sách trong tháng này
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>

            {/* Status charts row */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 2,
                }}
            >
                <Card elevation={2} sx={{ height: 400 }}>
                    <CardHeader title={`Đơn mua theo trạng thái - ${monthNames[currentMonth - 1]} ${currentYear}`} />
                    <CardContent sx={{ height: 320 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={currentMonthPurchaseOrdersByStatus}>
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" name="Số đơn" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card elevation={2} sx={{ height: 400 }}>
                    <CardHeader title={`Đơn thuê theo trạng thái - ${monthNames[currentMonth - 1]} ${currentYear}`} />
                    <CardContent sx={{ height: 320 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={currentMonthRentalOrdersByStatus}>
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#82ca9d" name="Số đơn" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Dashboard;


