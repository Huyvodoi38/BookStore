import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import BookDetail from '../pages/BookDetail'

const CustomRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default CustomRouter