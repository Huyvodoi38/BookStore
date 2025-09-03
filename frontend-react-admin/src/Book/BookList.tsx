import { ImageField, ColumnsButton, CreateButton, DataTable, DateField, DateInput, DeleteButton, EditButton, FilterButton, List, ReferenceArrayField, ReferenceArrayInput, ReferenceField, ReferenceInput, TextInput, TopToolbar, SelectArrayInput, FunctionField, SelectInput, BulkActionsToolbar, BulkDeleteButton, useListContext, Button } from 'react-admin';
import { Clear as ClearIcon } from '@mui/icons-material';
import { IconButton, Box } from '@mui/material';
import React, { ReactElement } from 'react';
import { usePermissions } from 'react-admin';
import { canCreateResource, canEditResource, canDeleteResource } from '../Authentication/ResourceByRole';

// Generic clearable filter component
const ClearableFilter = ({ children, source, label }: { children: ReactElement; source: string; label: string }) => {
    const { setFilters, filterValues } = useListContext();
    
    const handleClear = () => {
        const newFilters = { ...filterValues };
        delete newFilters[source];
        setFilters(newFilters, undefined, false);
    };
    
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, borderRadius: 10 }}>
            {React.cloneElement(children, { resettable: false, label: label })}
            {filterValues[source] && (
                <IconButton 
                    onClick={handleClear}
                    size="small"
                    sx={{ 
                        color: '#666',
                    }}
                >
                    <ClearIcon fontSize="small" />
                </IconButton>
            )}
        </Box>
    );
};

const bookFilter = [
    <ClearableFilter source="author_id" label="Tác giả">
        <ReferenceInput source="author_id" label="Tác giả" reference="authors">
            <SelectInput label="Tác giả" optionText="name" />
        </ReferenceInput>
    </ClearableFilter>,
    <ClearableFilter source="category_ids" label="Thể loại">
        <ReferenceArrayInput source="category_ids" label="Thể loại" reference="categories">
            <SelectArrayInput label="Thể loại" optionText="name" />
        </ReferenceArrayInput>
    </ClearableFilter>,
    <ClearableFilter source="published_date" label="Ngày xuất bản">
        <DateInput source="published_date" label="Ngày xuất bản" />
    </ClearableFilter>,
    <ClearableFilter source="title_like" label="Tên sách">
        <TextInput source="title_like" label="Tên sách" />
    </ClearableFilter>,
    <ClearableFilter source="price_gte" label="Giá từ">
        <TextInput source="price_gte" label="Giá từ" />
    </ClearableFilter>,
    <ClearableFilter source="price_lte" label="Giá đến">
        <TextInput source="price_lte" label="Giá đến" />
    </ClearableFilter>
];

const ClearFilterButton = () => {
    const { setFilters } = useListContext();
    
    const handleClearFilters = () => {
        setFilters({}, undefined, false);
    };
    
    return (
        <Button
            label="Xóa bộ lọc"
            onClick={handleClearFilters}
            startIcon={<ClearIcon />}
            sx={{
                color: '#1976d2',
                '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                },
            }}
        />
    );
};

const BookListAction = () => {
    const { permissions } = usePermissions();
    const canCreate = permissions && canCreateResource(permissions, 'books');
    
    return (
        <TopToolbar>
            {canCreate && <CreateButton label="Thêm sách" />}
            <ColumnsButton />
            <FilterButton />
            <ClearFilterButton />
        </TopToolbar>
    );
}

export const BookList = () => {
    const { permissions } = usePermissions();
    const canDelete = permissions && canDeleteResource(permissions, 'books');
    const canEdit = permissions && canEditResource(permissions, 'books');
    
    return (
        <List filters={bookFilter} actions={<BookListAction />}>
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
                <DataTable.Col source="title" label="Tên sách" />
                <DataTable.Col source="cover_image" label="Ảnh" sx={{
                    textAlign: 'center',
                }}>
                    <FunctionField
                        render={record => record.cover_image ? (
                            <ImageField record={record} source="cover_image" />
                        ) : (
                            <span>Không có</span>
                        )}
                    />
                </DataTable.Col>
                <DataTable.Col source="author_id" label="Tác giả">
                    <ReferenceField source="author_id" reference="authors" />
                </DataTable.Col>
                <DataTable.Col source="category_ids" label="Thể loại" sx={{
                    width: '200px',
                }}>
                    <ReferenceArrayField source="category_ids" reference="categories" />
                </DataTable.Col>
                <DataTable.Col source="published_date" label="Ngày xuất bản">
                    <DateField source="published_date" />
                </DataTable.Col>
                <DataTable.Col source="price" label="Giá" />
                <DataTable.Col source="stock" label="Số lượng" />
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