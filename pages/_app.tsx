import { BeerProvider } from "@/context/beer.context";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <BeerProvider>
        <Component {...pageProps} />
      </BeerProvider>
    </ChakraProvider>
  );
}

export default MyApp;
