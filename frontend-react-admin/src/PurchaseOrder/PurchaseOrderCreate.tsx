import { ArrayInput, Create, DateInput, NumberInput, ReferenceInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

export const PurchaseOrderCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <ReferenceInput source="customer_id" reference="customers" />
            <DateInput source="order_date" />
            <TextInput source="status" />
            <NumberInput source="total_amount" />
            <TextInput source="shipping_address" />
            <TextInput source="payment_method" />
            <NumberInput source="shipping_fee" />
            <DateInput source="discount" />
            <TextInput source="notes" />
            <ArrayInput source="order_items"><SimpleFormIterator><ReferenceInput source="book_id" reference="books" />
                <NumberInput source="quantity" />
                <NumberInput source="unit_price" />
                <NumberInput source="subtotal" /></SimpleFormIterator></ArrayInput>
        </SimpleForm>
    </Create>
);