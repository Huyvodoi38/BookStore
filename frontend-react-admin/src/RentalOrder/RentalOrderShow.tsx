import { ArrayField, DataTable, DateField, NumberField, ReferenceField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const RentalOrderShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField source="customer_id" reference="customers" label="Khách hàng" />
            <DateField source="rental_date" label="Ngày đặt hàng" />
            <DateField source="return_date" label="Ngày trả hàng (Dự kiến)" />
            <DateField source="actual_return_date" label="Ngày trả hàng (Thực tế)" />
            <TextField source="status" label="Trạng thái" />
            <NumberField source="total_amount" label="Tổng tiền" />
            <NumberField source="deposit" label="Tiền đặt cọc" />
            <DateField source="late_fee" label="Phí trễ" />
            <TextField source="rental_address" label="Địa chỉ" />
            <TextField source="notes" label="Ghi chú" />
            <ArrayField source="rental_items" label="Sách">
                <DataTable bulkActionButtons={false}>
                    <DataTable.Col source="book_id" label="Sách">
                        <ReferenceField source="book_id" reference="books" label="Sách" />
                    </DataTable.Col>
                    <DataTable.Col source="rental_days" label="Số ngày mượn">
                        <NumberField source="rental_days" label="Số ngày mượn" />
                    </DataTable.Col>
                    <DataTable.Col source="daily_rate" label="Giá mỗi ngày">
                        <NumberField source="daily_rate" label="Giá mỗi ngày" />
                    </DataTable.Col>
                    <DataTable.Col source="subtotal" label="Thành tiền">
                        <NumberField source="subtotal" label="Thành tiền" />
                    </DataTable.Col>
                </DataTable>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);