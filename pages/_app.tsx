import { QueryClient, QueryClientProvider } from 'react-query'
import { DarkModeContextProvider } from '../contexts/DarkModeContext'
import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeContextProvider>
        <Component {...pageProps} />
      </DarkModeContextProvider>
    </QueryClientProvider>
  )
}

export default MyApp
