import { Header } from '../components/Header'
import { QueryClient, QueryClientProvider } from 'react-query'
import { DarkModeContextProvider } from '../contexts/DarkModeContext'
import { CountriesContextProvider } from '../contexts/CountriesContext'
import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeContextProvider>
        <CountriesContextProvider>
          <main className='bg-light-background dark:bg-dark-background'>
            <Header />
            <Component {...pageProps} />
          </main>
        </CountriesContextProvider>
      </DarkModeContextProvider>
    </QueryClientProvider>
  )
}

export default MyApp
