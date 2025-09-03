import { ColumnsButton, CreateButton, DataTable, EditButton, DeleteButton, FilterButton, List, TextInput, TopToolbar, NumberInput, ImageField, FunctionField, BulkDeleteButton, BulkActionsToolbar } from 'react-admin';
import { usePermissions } from 'react-admin';
import { canCreateResource, canEditResource, canDeleteResource } from '../Authentication/ResourceByRole';

const authorFilter = [
    <TextInput source="name_like" label="Tên tác giả" />,
    <NumberInput source="birth_year_gte" label="Năm sinh từ" />,
    <NumberInput source="birth_year_lte" label="Năm sinh đến" />,
    <TextInput source="nationality_like" label="Quốc tịch" />,
];

const AuthorListAction = () => {
    const { permissions } = usePermissions();
    const canCreate = permissions && canCreateResource(permissions, 'authors');
    
    return (
        <TopToolbar>
            {canCreate && <CreateButton label="Thêm tác giả" />}
            <ColumnsButton />
            <FilterButton />
        </TopToolbar>
    );
}

export const AuthorList = () => {
    const { permissions } = usePermissions();
    const canDelete = permissions && canDeleteResource(permissions, 'authors');
    const canEdit = permissions && canEditResource(permissions, 'authors');
    
    return (
        <List filters={authorFilter} actions={<AuthorListAction />}>
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
                <DataTable.Col source="name" label="Tên tác giả" />
                <DataTable.Col source="profile_image" label="Ảnh" sx={{
                    textAlign: 'center',
                }}>
                    <FunctionField
                        render={record => record.profile_image ? (
                            <ImageField record={record} source="profile_image" />
                        ) : (
                            <span>Không có</span>
                        )}
                    />
                </DataTable.Col>
                <DataTable.Col source="birth_year" label="Năm sinh" />
                <DataTable.Col source="nationality" label="Quốc tịch" />
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