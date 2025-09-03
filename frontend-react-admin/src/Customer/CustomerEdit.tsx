import { DateInput, Edit, NumberInput, SelectInput, SimpleForm, TextInput } from 'react-admin';

export const CustomerEdit = () => (
    <Edit redirect="show">
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" label="Tên khách hàng"/>
            <TextInput source="email" label="Email"/>
            <TextInput source="phone" label="Số điện thoại"/>
            <TextInput source="address" label="Địa chỉ"/>
            <DateInput source="birth_date" label="Ngày sinh"/>
            <SelectInput source="gender" label="Giới tính" choices={[
                { id: 'Nam', name: 'Nam' },
                { id: 'Nữ', name: 'Nữ' },
                { id: 'Khác', name: 'Khác' },
            ]} />
            <DateInput source="registration_date" label="Ngày đăng ký"/>
            <NumberInput source="total_orders" label="Tổng đơn hàng"/>
            <NumberInput source="total_spent" label="Tổng tiền"/>
        </SimpleForm>
    </Edit>
);