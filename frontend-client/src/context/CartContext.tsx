import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Book, CartContextType } from '../types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { book: Book; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { bookId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { bookId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { book, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.book.id === book.id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { ...state, items: updatedItems };
      } else {
        const newItem: CartItem = {
          id: Date.now(), // Simple ID generation
          book,
          quantity
        };
        return { ...state, items: [...state.items, newItem] };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const { bookId } = action.payload;
      return {
        ...state,
        items: state.items.filter(item => item.book.id !== bookId)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { bookId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.book.id !== bookId)
        };
      }
      
      const updatedItems = state.items.map(item =>
        item.book.id === bookId ? { ...item, quantity } : item
      );
      return { ...state, items: updatedItems };
    }
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (book: Book, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { book, quantity } });
  };

  const removeFromCart = (bookId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { bookId } });
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { bookId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
