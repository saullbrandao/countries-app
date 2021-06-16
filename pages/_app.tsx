import { Header } from '../components/Header'
import { QueryClient, QueryClientProvider } from 'react-query'
import { DarkModeContextProvider } from '../contexts/DarkModeContext'
import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeContextProvider>
        <main className='bg-light-background dark:bg-dark-background'>
          <Header />
          <Component {...pageProps} />
        </main>
      </DarkModeContextProvider>
    </QueryClientProvider>
  )
}

export default MyApp
