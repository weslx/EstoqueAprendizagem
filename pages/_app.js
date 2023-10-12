import { Analytics } from "@vercel/analytics/react";
import "../output.css";
import "styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
