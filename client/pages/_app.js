import '@/styles/globals.css'
import { UserProvider } from '@/components/userContext'

export default function App({ Component, pageProps }) {
  return (
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
  )
}
