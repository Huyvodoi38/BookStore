import { ImageField, NumberField, RichTextField, Show, SimpleShowLayout, TextField } from 'react-admin';

const AuthorShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Tên tác giả" />
            <ImageField source="profile_image" label="Ảnh" />
            <NumberField source="birth_year" label="Năm sinh" />
            <TextField source="nationality" label="Quốc tịch" />
            <RichTextField source="biography" label="Giới thiệu" />
        </SimpleShowLayout>
    </Show>
)

export default AuthorShow;