export interface Book {
  id: number;
  title: string;
  author_id: number;
  category_ids: number[];
  published_date: string;
  price: number;
  stock: number;
  likes: number;
  cover_image?: string;
  description?: string;
}

export interface Author {
  id: number;
  name: string;
  nationality: string;
  profile_image?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CartItem {
  id: number;
  book: Book;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  birth_date?: string;
  gender?: string;
  registration_date?: string;
  total_orders?: number;
}

export interface OrderItem {
  book_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Order {
  id?: number;
  customer_id: number;
  order_date: string;
  status: string;
  total_amount: number;
  shipping_address: string;
  payment_method: string;
  shipping_fee: number;
  discount?: number;
  notes?: string;
  order_items: OrderItem[];
}

export interface CheckoutFormData {
  customer: Omit<Customer, 'id' | 'total_orders' | 'registration_date' | 'birth_date' | 'gender'>;
  payment_method: string;
  notes?: string;
}
