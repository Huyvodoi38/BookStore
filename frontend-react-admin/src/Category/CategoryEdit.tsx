import { Edit, SimpleForm, TextInput } from 'react-admin';

const CategoryEdit = () => (
    <Edit redirect="show">
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" label="Tên thể loại" />
            <TextInput source="description" label="Mô tả" multiline rows={4} />
        </SimpleForm>
    </Edit>
)

export default CategoryEdit;