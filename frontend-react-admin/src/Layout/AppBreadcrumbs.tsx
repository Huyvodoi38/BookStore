import { Link as RouterLink, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Home from '@mui/icons-material/Home';

export const resourceLabels: Record<string, { list: string; singular: string }> = {
    books: { list: 'Danh mục sách', singular: 'sách' },
    authors: { list: 'Tác giả', singular: 'tác giả' },
    categories: { list: 'Thể loại', singular: 'thể loại' },
    customers: { list: 'Danh mục khách hàng', singular: 'khách hàng' },
    purchase_orders: { list: 'Đơn mua sách', singular: 'đơn mua sách' },
    rental_orders: { list: 'Đơn thuê sách', singular: 'đơn thuê sách' },
};

export const computeSegmentLabel = (segment: string, index: number, segments: string[]) => {
    if (resourceLabels[segment]) {
        return resourceLabels[segment].list;
    }

    const previous = index > 0 ? segments[index - 1] : '';
    const next = index < segments.length - 1 ? segments[index + 1] : '';
    const resourceKey = resourceLabels[previous] ? previous : '';
    const singular = resourceKey ? resourceLabels[resourceKey].singular : '';

    // Skip showing 'show' segment when we already have ID segment with show context
    if (segment === 'show' && index > 0 && /^\d+$/.test(segments[index - 1])) {
        return null;
    }

    if (segment === 'create') {
        return singular ? `Thêm ${singular}` : 'Thêm';
    }
    if (segment === 'edit') {
        return singular ? `Chỉnh sửa ${singular}` : 'Chỉnh sửa';
    }
    if (segment === 'show' || segment === 'detail') {
        return singular ? `Chi tiết ${singular}` : 'Chi tiết';
    }
    if (/^\d+$/.test(segment)) {
        if (next === 'show') return singular ? `Chi tiết ${singular}` : 'Chi tiết';
        if (next === 'edit' || !next) return singular ? `Chỉnh sửa ${singular}` : 'Chỉnh sửa';
    }

    return segment.charAt(0).toUpperCase() + segment.slice(1);
};

export const usePageTitleAndCrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);
    const items = pathnames
        .map((segment, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const label = computeSegmentLabel(segment, index, pathnames);
            return { to, label, isLast, segment };
        })
        .filter(item => item.label !== null);

    // Adjust the 'to' paths after filtering
    const adjustedItems = items.map((item, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === items.length - 1;
        return { ...item, to, isLast };
    });
    const title = adjustedItems.length ? adjustedItems[adjustedItems.length - 1].label : 'Trang chủ';
    return { title, items: adjustedItems };
};

const AppBreadcrumbs = () => {
    const { items } = usePageTitleAndCrumbs();

    return (
        <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ fontSize: 12, color: '#666' }}>
            <Link
                component={RouterLink}
                underline="hover"
                color="inherit"
                to="/"
                aria-label="Trang chủ"
                sx={{ display: 'inline-flex', alignItems: 'center' }}
            >
                <Home sx={{ fontSize: 20, color: '#757575' }} />
            </Link>
            {items.map(({ to, label, isLast }) => {
                if (isLast) {
                    return (
                        <Typography key={to} color="text.primary" sx={{ fontSize: 12 }}>
                            {label}
                        </Typography>
                    );
                }
                return (
                    <Link key={to} component={RouterLink} underline="hover" color="inherit" to={to} sx={{ fontSize: 12 }}>
                        {label}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default AppBreadcrumbs;


