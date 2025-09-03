import { Edit, NumberInput, SimpleForm, TextInput, ImageInput, ImageField } from 'react-admin';

const AuthorEdit = () => (
    <Edit redirect="show">
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" label="Tên tác giả" />
            <ImageInput
                source="profile_image"
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
            <NumberInput source="birth_year" label="Năm sinh" />
            <TextInput source="nationality" label="Quốc tịch" />
            <TextInput source="biography" label="Giới thiệu" multiline rows={4} />
        </SimpleForm>
    </Edit>
)

export default AuthorEdit;