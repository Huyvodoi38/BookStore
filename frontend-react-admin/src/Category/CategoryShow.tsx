import { Show, SimpleShowLayout, TextField, RichTextField } from 'react-admin';

const CategoryShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Tên thể loại" />
            <RichTextField source="description" label="Mô tả" />
        </SimpleShowLayout>
    </Show>
)

export default CategoryShow;