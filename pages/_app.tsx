import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/eczar/400.css";
import "@fontsource/eczar/500.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

import theme from "../styles/chakra/theme";
import Layout from "../components/layout/Layout";
import { AuthUserProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { CheckoutProvider } from "../context/CheckoutContext";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <CheckoutProvider>
        <AuthUserProvider>
          <CartProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
        </AuthUserProvider>
      </CheckoutProvider>
      <Script src="https://sdk.mercadopago.com/js/v2" />
    </ChakraProvider>
  );
}

export default MyApp;
