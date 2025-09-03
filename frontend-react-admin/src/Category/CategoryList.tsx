import { ColumnsButton, CreateButton, DataTable, DeleteButton, EditButton, FilterButton, List, TextInput, TopToolbar, BulkDeleteButton, BulkActionsToolbar } from 'react-admin';
import { usePermissions } from 'react-admin';
import { canCreateResource, canEditResource, canDeleteResource } from '../Authentication/ResourceByRole';

const categoryFilter = [
    <TextInput source="name_like" label="Tên thể loại" />,
];

const CategoryListAction = () => {
    const { permissions } = usePermissions();
    const canCreate = permissions && canCreateResource(permissions, 'categories');
    
    return (
        <TopToolbar>
            {canCreate && <CreateButton label="Thêm thể loại" />}
            <ColumnsButton />
            <FilterButton />
        </TopToolbar>
    );
}

export const CategoryList = () => {
    const { permissions } = usePermissions();
    const canDelete = permissions && canDeleteResource(permissions, 'categories');
    const canEdit = permissions && canEditResource(permissions, 'categories');
    
    return (
        <List filters={categoryFilter} actions={<CategoryListAction />}>
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
                <DataTable.Col source="name" label="Tên thể loại" />
                {(canEdit || canDelete) && (
                    <DataTable.Col label="Hành động">
                        {canEdit && (
                            <EditButton label="" sx={{
                                '& .MuiButton-label': {
                                    marginRight: 0,
                                },
                                minWidth: 'auto',
                                padding: (theme: any) => theme.spacing(1),
                            }}/>
                        )}
                        {canDelete && (
                            <DeleteButton label="" sx={{
                                '& .MuiButton-label': {
                                    marginRight: 0,
                                },
                                minWidth: 'auto',
                                padding: (theme: any) => theme.spacing(1),
                            }}/>
                        )}
                    </DataTable.Col>
                )}
            </DataTable>
        </List>
    );
};