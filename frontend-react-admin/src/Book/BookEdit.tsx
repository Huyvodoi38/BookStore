import { Edit, ReferenceInput, SimpleForm, TextInput, DateInput, NumberInput, ReferenceArrayInput, ImageInput, ImageField } from 'react-admin';

const BookEdit = () => (
    <Edit redirect="show">
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="title" />

            <ImageInput
                source="cover_image"
                label="Ảnh"
                format={value => {
                    if (value && typeof value === 'string') {
                        // Trường hợp ảnh cũ từ API
                        return [{ src: value, title: '' }];
                    }
                    if (value && value.rawFile instanceof File) {
                        // Trường hợp ảnh mới được chọn từ file
                        return [{ src: URL.createObjectURL(value.rawFile), title: value.rawFile.name }];
                    }
                    // Trường hợp không có ảnh
                    return [];
                }}
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}>
                <ImageField source="src" title="title" />
            </ImageInput>

            <ReferenceInput source="author_id" reference="authors" />
            <ReferenceArrayInput source="category_ids" reference="categories" />
            <DateInput source="published_date" />
            <NumberInput source="price" />
            <NumberInput source="stock" />
            <NumberInput source="likes" />
        </SimpleForm>
    </Edit>
);

export default BookEdit;