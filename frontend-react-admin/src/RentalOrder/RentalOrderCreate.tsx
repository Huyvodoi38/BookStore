import { ArrayInput, Create, DateInput, NumberInput, ReferenceInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

export const RentalOrderCreate = () => (
    <Create redirect="show">
        <SimpleForm>
            <ReferenceInput source="customer_id" reference="customers" />
            <DateInput source="rental_date" />
            <DateInput source="return_date" />
            <DateInput source="actual_return_date" />
            <TextInput source="status" />
            <NumberInput source="total_amount" />
            <NumberInput source="deposit" />
            <DateInput source="late_fee" />
            <TextInput source="rental_address" />
            <TextInput source="notes" />
            <ArrayInput source="rental_items"><SimpleFormIterator><ReferenceInput source="book_id" reference="books" />
<NumberInput source="rental_days" />
<NumberInput source="daily_rate" />
<NumberInput source="subtotal" /></SimpleFormIterator></ArrayInput>
        </SimpleForm>
    </Create>
);