import '@/styles/globals.css'
import { UserProvider } from '@/components/userContext'
import { CartProvider } from '../components/checkout/CartContext'

export default function App({ Component, pageProps }) {
  return (
  <UserProvider>
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  </UserProvider>
  )
}
