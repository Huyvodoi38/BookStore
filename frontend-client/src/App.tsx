import CustomRouter from './routers/CustomRouter'
import Header from './pages/Header'
import Footer from './pages/Footer'
import { CartProvider } from './context/CartContext'

function App() {

  return (
    <CartProvider>
      <div>
        <Header />
        <CustomRouter />
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
