import { Header } from 'components/Header'
import { QueryClient, QueryClientProvider } from 'react-query'
import { DarkModeContextProvider } from 'contexts/DarkModeContext'
import { AppProps } from 'next/dist/next-server/lib/router/router'

import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
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
