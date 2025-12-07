import { ChakraProvider } from '@chakra-ui/react'
import ActionsComponent from '../components/actions.component'
import system from '../components/theme'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  
  return (
    <ChakraProvider value={system}>
      <ActionsComponent />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
