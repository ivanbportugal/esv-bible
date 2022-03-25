import { ChakraProvider } from '@chakra-ui/react'
import ActionsComponent from '../components/actions.component'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  
  return (
    <ChakraProvider>
      <ActionsComponent />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
