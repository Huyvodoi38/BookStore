import { ArrayInput, DateInput, Edit, NumberInput, ReferenceInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

export const PurchaseOrderEdit = () => (
    <Edit redirect="show">
        <SimpleForm>
            <TextInput source="id" disabled />
            <ReferenceInput source="customer_id" reference="customers" label="Khách hàng"/>
            <DateInput source="order_date" label="Ngày đặt hàng"/>
            <TextInput source="status" label="Trạng thái"/>
            <NumberInput source="total_amount" label="Tổng tiền"/>
            <TextInput source="shipping_address" label="Địa chỉ giao hàng"/>
            <TextInput source="payment_method" label="Phương thức thanh toán"/>
            <NumberInput source="shipping_fee" label="Phí vận chuyển"/>
            <DateInput source="discount" label="Giảm giá"/>
            <TextInput source="notes" label="Ghi chú"/>
            <ArrayInput source="order_items"><SimpleFormIterator><ReferenceInput source="book_id" reference="books" />
                <NumberInput source="quantity" label="Số lượng"/>
                <NumberInput source="unit_price" label="Đơn giá"/>
                <NumberInput source="subtotal" label="Thành tiền"/></SimpleFormIterator></ArrayInput>
        </SimpleForm>
    </Edit>
);