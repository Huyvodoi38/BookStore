import { DateField, EmailField, NumberField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const CustomerShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" label="Tên khách hàng"/>
            <EmailField source="email" label="Email"/>
            <TextField source="phone" label="Số điện thoại"/>
            <TextField source="address" label="Địa chỉ"/>
            <DateField source="birth_date" label="Ngày sinh"/>
            <TextField source="gender" label="Giới tính"/>
            <DateField source="registration_date" label="Ngày đăng ký"/>
            <NumberField source="total_orders" label="Tổng đơn hàng"/>
            <NumberField source="total_spent" label="Tổng tiền"/>
        </SimpleShowLayout>
    </Show>
);