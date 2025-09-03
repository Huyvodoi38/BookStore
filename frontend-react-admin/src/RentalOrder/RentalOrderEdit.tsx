import { ArrayInput, DateInput, Edit, NumberInput, ReferenceInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

export const RentalOrderEdit = () => (
    <Edit redirect="show">
        <SimpleForm>
            <TextInput source="id" disabled />
            <ReferenceInput source="customer_id" reference="customers" label="Khách hàng" />
            <DateInput source="rental_date" label="Ngày đặt hàng" />
            <DateInput source="return_date" label="Ngày trả hàng (Dự kiến)" />
            <DateInput source="actual_return_date" label="Ngày trả hàng (Thực tế)" />
            <TextInput source="status" label="Trạng thái" />
            <NumberInput source="total_amount" label="Tổng tiền" />
            <NumberInput source="deposit" label="Tiền đặt cọc" />
            <DateInput source="late_fee" label="Phí trễ" />
            <TextInput source="rental_address" label="Địa chỉ" />
            <TextInput source="notes" label="Ghi chú" />
            <ArrayInput source="rental_items">
                <SimpleFormIterator>
                    <ReferenceInput source="book_id" reference="books" label="Sách" />
                    <NumberInput source="rental_days" label="Số ngày mượn" />
                    <NumberInput source="daily_rate" label="Giá mỗi ngày" />
                    <NumberInput source="subtotal" label="Thành tiền" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);