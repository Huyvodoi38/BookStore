import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import BookDetail from '../pages/BookDetail'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import OrderSuccess from '../pages/OrderSuccess'

const CustomRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default CustomRouter