import Auth from "../components/auth"

import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from "next-auth/client"

function MyApp({ Component, pageProps, session }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <Auth {...pageProps} session={session} Component={Component} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
