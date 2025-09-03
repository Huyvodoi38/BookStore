import { Create, SimpleForm, TextInput } from 'react-admin';

const CategoryCreate = () => (
    <Create redirect="show">    
        <SimpleForm>
            <TextInput source="name" label="Tên thể loại" />
            <TextInput source="description" label="Mô tả" multiline rows={4} />
        </SimpleForm>
    </Create>
)

export default CategoryCreate;