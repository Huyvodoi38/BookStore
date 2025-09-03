import { CreateButton, ColumnsButton, DataTable, DateField, DateInput, DeleteButton, EditButton, EmailField, FilterButton, List, SelectInput, TextInput, TopToolbar, BulkDeleteButton, BulkActionsToolbar } from 'react-admin';
import { usePermissions } from 'react-admin';
import { canCreateResource, canEditResource, canDeleteResource } from '../Authentication/ResourceByRole';

const customerFilter = [
    <TextInput source="name_like" label="Tên khách hàng" />,
    <TextInput source="email_like" label="Email" />,
    <TextInput source="phone_like" label="Số điện thoại" />,
    <DateInput source="birth_date" label="Ngày sinh" />,
    <SelectInput source="gender" label="Giới tính" choices={[
        { id: 'Nam', name: 'Nam' },
        { id: 'Nữ', name: 'Nữ' },
        { id: 'Khác', name: 'Khác' },
    ]} />,
]

const CustomerListAction = () => {
    const { permissions } = usePermissions();
    const canCreate = permissions && canCreateResource(permissions, 'customers');
    
    return (
        <TopToolbar>
            {canCreate && <CreateButton label="Thêm khách hàng" />}
            <ColumnsButton />
            <FilterButton />
        </TopToolbar>
    );
}

export const CustomerList = () => {
    const { permissions } = usePermissions();
    const canDelete = permissions && canDeleteResource(permissions, 'customers');
    const canEdit = permissions && canEditResource(permissions, 'customers');
    
    return (
        <List filters={customerFilter} actions={<CustomerListAction />}>
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
                <DataTable.Col source="name" label="Tên khách hàng" />
                <DataTable.Col source="email" label="Email">
                    <EmailField source="email" />
                </DataTable.Col>
                <DataTable.Col source="phone" label="Số điện thoại" />
                <DataTable.Col source="address" label="Địa chỉ" />
                <DataTable.Col source="birth_date" label="Ngày sinh">
                    <DateField source="birth_date" />
                </DataTable.Col>
                <DataTable.Col source="gender" label="Giới tính"/>
                {(canEdit || canDelete) && (
                    <DataTable.Col label="Hành động" sx={{
                        position: 'sticky',
                    }}>
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