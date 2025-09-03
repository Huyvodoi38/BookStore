import { Create, ImageField, ImageInput, NumberInput, SimpleForm, TextInput } from 'react-admin';

const AuthorCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <TextInput source="name" label="Tên tác giả" />
            <ImageInput source="profile_image" label="Ảnh" accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}>
                <ImageField source="src" title="title" />
            </ImageInput>
            <NumberInput source="birth_year" label="Năm sinh" />
            <TextInput source="nationality" label="Quốc tịch" />
            <TextInput source="biography" label="Giới thiệu" multiline rows={4} />
        </SimpleForm>
    </Create>
)

export default AuthorCreate;