import { DataTable, DateField, DeleteButton, EditButton, List, ReferenceField, TextInput, ReferenceInput, SelectInput, DateInput, CreateButton, ColumnsButton, FilterButton, TopToolbar, BulkDeleteButton, BulkActionsToolbar } from 'react-admin';
import { usePermissions } from 'react-admin';
import { canCreateResource, canEditResource, canDeleteResource } from '../Authentication/ResourceByRole';

const PurchaseOrderListAction = () => {
    const { permissions } = usePermissions();
    const canCreate = permissions && canCreateResource(permissions, 'purchase_orders');
    
    return (
        <TopToolbar>
            {canCreate && <CreateButton label="Thêm đơn hàng" />}
            <ColumnsButton />
            <FilterButton />
        </TopToolbar>
    );
}

const purchaseOrderFilter = [
    <ReferenceInput source="customer_id" label="Khách hàng" reference="customers">
        <SelectInput label="Khách hàng" optionText="name" />
    </ReferenceInput>, 
    <DateInput source="order_date" label="Ngày đặt hàng" />,
    <SelectInput source="status" label="Trạng thái" choices={[
        { id: 'Đã giao', name: 'Đã giao' },
        { id: 'Đang giao', name: 'Đang giao' },
        { id: 'Đã hủy', name: 'Đã hủy' },
    ]} />,
    <TextInput source="total_amount_gte" label="Tổng tiền từ" />,
    <TextInput source="total_amount_lte" label="Tổng tiền đến" />,
    <SelectInput source="payment_method" label="Phương thức thanh toán" choices={[
        { id: 'Tiền mặt', name: 'Tiền mặt' },
        { id: 'Chuyển khoản', name: 'Chuyển khoản' },
        { id: 'Thẻ tín dụng', name: 'Thẻ tín dụng' },
    ]} />,
]

export const PurchaseOrderList = () => {
    const { permissions } = usePermissions();
    const canDelete = permissions && canDeleteResource(permissions, 'purchase_orders');
    const canEdit = permissions && canEditResource(permissions, 'purchase_orders');
    
    return (
        <List filters={purchaseOrderFilter} actions={<PurchaseOrderListAction />}>
            {canDelete && (
                <BulkActionsToolbar>
                    <BulkDeleteButton/>
                </BulkActionsToolbar>
            )}
            <DataTable sx={{
                height: 'calc(100vh - 300px)',
                overflow: 'auto',
                '& .RaDataTable-headerCell': {
                    border: '1px solid #e0e0e0',
                    position: 'static !important',
                },
                '& .RaDataTable-thead': {
                    position: 'static !important',
                },
                '& .RaDataTable-rowOdd': {
                    backgroundColor: '#fafafa',
                },
            }}>
                <DataTable.Col source="id" />
                <DataTable.Col source="customer_id" label="Tên khách hàng">
                    <ReferenceField source="customer_id" reference="customers" />
                </DataTable.Col>
                <DataTable.Col source="order_date" label="Ngày đặt hàng">
                    <DateField source="order_date" />
                </DataTable.Col>
                <DataTable.Col source="status" label="Trạng thái" />
                <DataTable.Col source="total_amount" label="Tổng tiền" />
                <DataTable.Col source="shipping_address" label="Địa chỉ giao hàng" />
                <DataTable.Col source="payment_method" label="Phương thức thanh toán" />
                {(canEdit || canDelete) && (
                    <DataTable.Col label="Hành động">
                        {canEdit && (
                            <EditButton label="" sx={{
                                '& .MuiButton-label': {
                                    marginRight: 0,
                                },
                                minWidth: 'auto',
                                padding: (theme: any) => theme.spacing(1),
                            }} />
                        )}
                        {canDelete && (
                            <DeleteButton label="" sx={{
                                '& .MuiButton-label': {
                                    marginRight: 0,
                                },
                                minWidth: 'auto',
                                padding: (theme: any) => theme.spacing(1),
                            }} />
                        )}
                    </DataTable.Col>
                )}
            </DataTable>
        </List>
    );
};
