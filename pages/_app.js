import { ApolloProvider } from "@apollo/client";
import cliente from "../config/apollo";
import Head from "next/head";


function MyApp({ Component, pageProps }) {
  
  return (
    <ApolloProvider client={cliente}>
      <Head>
        <title>Apprende APP</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="./TW-ELEMENTS-PATH/dist/js/index.min.js"></script>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
    
  ) 
}

export default MyApp;
