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
        <link rel="apple-touch-icon" href={apple} />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="ESV Bible" />

        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        {/* <link rel="apple-touch-icon" sizes="152x152" href="apple-touch-icon-ipad.png" type="image/png" />
        <link rel="apple-touch-icon" sizes="167x167" href="apple-touch-icon-ipad-retina.png" type="image/png" />
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon-iphone-retina.png" type="image/png" />

        <link rel="mask-icon" href="assets/images/icons/safari-pinned-tab.svg" color="#5bbad5" /> */}
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
