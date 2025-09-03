import { Create, ReferenceInput, SimpleForm, TextInput, DateInput, NumberInput, ReferenceArrayInput, ImageInput, ImageField } from 'react-admin';

const BookCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <TextInput source="title" label="Tên sách"/>
            <ImageInput source="cover_image" label="Ảnh" accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}>
                <ImageField source="src" title="title" />
            </ImageInput>
            <ReferenceInput source="author_id" reference="authors" label="Tác giả"/>
            <ReferenceArrayInput source="category_ids" reference="categories" label="Thể loại"/>
            <DateInput source="published_date" label="Ngày xuất bản"/>
            <NumberInput source="price" label="Giá"/>
            <NumberInput source="stock" label="Số lượng"/>
            <NumberInput source="likes" label="Likes"/>
        </SimpleForm>
    </Create>
);

export default BookCreate;
