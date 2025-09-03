import { ArrayField, DataTable, DateField, NumberField, ReferenceField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const PurchaseOrderShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField source="customer_id" reference="customers" label="Khách hàng"/>
            <DateField source="order_date" label="Ngày đặt hàng"/>
            <TextField source="status" label="Trạng thái"/>
            <NumberField source="total_amount" label="Tổng tiền"/>
            <TextField source="shipping_address" label="Địa chỉ giao hàng"/>
            <TextField source="payment_method" label="Phương thức thanh toán"/>
            <NumberField source="shipping_fee" label="Phí vận chuyển"/>
            <DateField source="discount" label="Giảm giá"/>
            <TextField source="notes" label="Ghi chú"/>
            <ArrayField source="order_items" label="Sách">
                <DataTable bulkActionButtons={false}>
                    <DataTable.Col source="book_id" label="Sách">
                        <ReferenceField source="book_id" reference="books" label="Sách"/>
                    </DataTable.Col>
                    <DataTable.Col source="quantity" label="Số lượng">
                        <NumberField source="quantity" label="Số lượng"/>
                    </DataTable.Col>
                    <DataTable.Col source="unit_price" label="Đơn giá">
                        <NumberField source="unit_price" label="Đơn giá"/>
                    </DataTable.Col>
                    <DataTable.Col source="subtotal" label="Thành tiền">
                        <NumberField source="subtotal" label="Thành tiền"/>
                    </DataTable.Col>
                </DataTable>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);