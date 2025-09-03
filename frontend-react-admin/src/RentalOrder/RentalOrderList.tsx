import { DateField, DateInput, DeleteButton, EditButton, List, ReferenceField, ReferenceInput, SelectInput, TextInput, DataTable, BulkDeleteButton, BulkActionsToolbar } from 'react-admin';
import { TopToolbar, CreateButton, ColumnsButton, FilterButton } from 'react-admin';
import { usePermissions } from 'react-admin';
import { canCreateResource, canEditResource, canDeleteResource } from '../Authentication/ResourceByRole';

const rentalOrderFilter = [
    <ReferenceInput source="customer_id" label="Khách hàng" reference="customers">
        <SelectInput label="Khách hàng" optionText="name" />
    </ReferenceInput>, 
    <DateInput source="rental_date" label="Ngày đặt hàng" />,
    <DateInput source="return_date" label="Ngày trả hàng (Dự kiến)" />,
    <DateInput source="actual_return_date" label="Ngày trả hàng (Thực tế)" />,
    <SelectInput source="status" label="Trạng thái" choices={[
        { id: 'Đang mượn', name: 'Đang mượn' },
        { id: 'Đã trả', name: 'Đã trả' },
    ]} />,
    <TextInput source="total_amount_gte" label="Tổng tiền từ" />,
    <TextInput source="total_amount_lte" label="Tổng tiền đến" />,
]

const RentalOrderListAction = () => {
    const { permissions } = usePermissions();
    const canCreate = permissions && canCreateResource(permissions, 'rental_orders');
    
    return (
        <TopToolbar>
            {canCreate && <CreateButton label="Thêm đơn hàng" />}
            <ColumnsButton />
            <FilterButton />
        </TopToolbar>
    );
}

export const RentalOrderList = () => {
    const { permissions } = usePermissions();
    const canDelete = permissions && canDeleteResource(permissions, 'rental_orders');
    const canEdit = permissions && canEditResource(permissions, 'rental_orders');
    
    return (
        <List filters={rentalOrderFilter} actions={<RentalOrderListAction />}>
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
                <DataTable.Col source="customer_id" label="Khách hàng">
                    <ReferenceField source="customer_id" reference="customers" />
                </DataTable.Col>
                <DataTable.Col source="rental_date" label="Ngày đặt hàng">
                    <DateField source="rental_date" />
                </DataTable.Col>
                <DataTable.Col source="return_date" label="Ngày trả hàng (Dự kiến)">
                    <DateField source="return_date" />
                </DataTable.Col>
                <DataTable.Col source="actual_return_date" label="Ngày trả hàng (Thực tế)">
                    <DateField source="actual_return_date" />
                </DataTable.Col>
                <DataTable.Col source="status" label="Trạng thái" />
                <DataTable.Col source="total_amount" label="Tổng tiền" />
                <DataTable.Col source="rental_address" label="Địa chỉ" />
                {(canEdit || canDelete) && (
                    <DataTable.Col label="Hành động">
                        {canEdit && (
                            <EditButton label="" sx={{
                                '& .MuiButton-label': { marginRight: 0 },
                                minWidth: 'auto',
                                padding: (theme: any) => theme.spacing(1),
                            }} />
                        )}
                        {canDelete && (
                            <DeleteButton label="" sx={{
                                '& .MuiButton-label': { marginRight: 0 },
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