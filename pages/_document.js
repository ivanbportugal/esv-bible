import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";
import { prefix } from '../lib/prefix.js';
import theme from '../components/theme';

function MyDocument() {
  const favicon = `${prefix}/favicon.ico`;
  const manifest = `${prefix}/manifest.json`;
  const apple = `${prefix}/icon.png`;
  return (
    <Html>
      <Head>
        <link rel="icon" href={favicon} />
        <link rel="manifest" href={manifest} />
        <link rel="apple-touch-icon" href={apple}></link>
        {/* <meta name="theme-color" content="#fff" /> */}
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
