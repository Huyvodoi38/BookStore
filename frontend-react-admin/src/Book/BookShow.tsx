import { Show, SimpleShowLayout, TextField, DateField, NumberField, ReferenceField, ReferenceArrayField, ImageField } from 'react-admin';

const BookShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="title" />
            <ImageField source="cover_image" label="Ảnh"/>
            <ReferenceField source="author_id" reference="authors" link = 'show'>
                <TextField source="name" />
            </ReferenceField>
            <ReferenceArrayField source="category_ids" reference="categories" />
            <DateField source="published_date" />
            <NumberField source="price" />
            <NumberField source="stock" />
            <NumberField source="likes" />
        </SimpleShowLayout>
    </Show>
)

export default BookShow;