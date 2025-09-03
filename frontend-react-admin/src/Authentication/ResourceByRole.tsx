import { ResourceProps } from 'react-admin';
import { BookList } from '../Book/BookList';
import { AuthorList } from '../Author/AuthorList';
import { CategoryList } from '../Category/CategoryList';
import { CustomerList } from '../Customer/CustomerList';
import { PurchaseOrderList } from '../PurchaseOrder/PurchaseOrderList';
import { RentalOrderList } from '../RentalOrder/RentalOrderList';
import BookCreate from '../Book/BookCreate';
import BookEdit from '../Book/BookEdit';
import BookShow from '../Book/BookShow';
import AuthorCreate from '../Author/AuthorCreate';
import AuthorEdit from '../Author/AuthorEdit';
import AuthorShow from '../Author/AuthorShow';
import CategoryCreate from '../Category/CategoryCreate';
import CategoryEdit from '../Category/CategoryEdit';
import CategoryShow from '../Category/CategoryShow';
import { CustomerCreate } from '../Customer/CustomerCreate';
import { CustomerEdit } from '../Customer/CustomerEdit';
import { CustomerShow } from '../Customer/CustomerShow';
import { PurchaseOrderCreate } from '../PurchaseOrder/PurchaseOrderCreate';
import { PurchaseOrderEdit } from '../PurchaseOrder/PurchaseOrderEdit';
import { PurchaseOrderShow } from '../PurchaseOrder/PurchaseOrderShow';
import { RentalOrderCreate } from '../RentalOrder/RentalOrderCreate';
import { RentalOrderEdit } from '../RentalOrder/RentalOrderEdit';
import { RentalOrderShow } from '../RentalOrder/RentalOrderShow';

export const allResources: Record<string, ResourceProps> = {
    books:       { name: 'books', list: BookList, create: BookCreate, edit: BookEdit, show: BookShow },
    authors:     { name: 'authors', list: AuthorList, create: AuthorCreate, edit: AuthorEdit, show: AuthorShow },
    categories:  { name: 'categories', list: CategoryList, create: CategoryCreate, edit: CategoryEdit, show: CategoryShow },
    customers:   { name: 'customers', list: CustomerList, create: CustomerCreate, edit: CustomerEdit, show: CustomerShow },
    purchase_orders: { name: 'purchase_orders', list: PurchaseOrderList, create: PurchaseOrderCreate, edit: PurchaseOrderEdit, show: PurchaseOrderShow },
    rental_orders:   { name: 'rental_orders', list: RentalOrderList, create: RentalOrderCreate, edit: RentalOrderEdit, show: RentalOrderShow },
};

export const resourcesByRole: Record<
    string,
    (string | (ResourceProps & { name: string }))[]
> = {
    admin: [
        'books',
        'authors',
        'categories',
        'customers',
        'purchase_orders',
        'rental_orders',
    ],
    normal_staff: [
        { ...allResources.books, create: undefined, edit: undefined },
        'rental_orders',
        'purchase_orders',
    ],
    stock_manager: [
        'books',
        'authors',
        'categories',
    ],
    customer_service: [
        'customers',
    ],
};

// Utility functions để kiểm tra quyền truy cập
export const canAccessResource = (permissions: string, resourceName: string): boolean => {
    const role = permissions;
    const resources = resourcesByRole[role] ?? [];
    
    return resources.some(res => {
        if (typeof res === 'string') {
            return res === resourceName;
        }
        return res.name === resourceName;
    });
};

export const canCreateResource = (permissions: string, resourceName: string): boolean => {
    const role = permissions;
    const resources = resourcesByRole[role] ?? [];
    
    const resource = resources.find(res => {
        if (typeof res === 'string') {
            return res === resourceName;
        }
        return res.name === resourceName;
    });
    
    if (typeof resource === 'string') {
        return true; // Nếu là string thì có đầy đủ quyền
    }
    
    return !!(resource && resource.create !== undefined);
};

export const canEditResource = (permissions: string, resourceName: string): boolean => {
    const role = permissions;
    const resources = resourcesByRole[role] ?? [];
    
    const resource = resources.find(res => {
        if (typeof res === 'string') {
            return res === resourceName;
        }
        return res.name === resourceName;
    });
    
    if (typeof resource === 'string') {
        return true; // Nếu là string thì có đầy đủ quyền
    }
    
    return !!(resource && resource.edit !== undefined);
};

export const canDeleteResource = (permissions: string, resourceName: string): boolean => {
    // Mặc định cho phép delete nếu có quyền edit
    return canEditResource(permissions, resourceName);
};
