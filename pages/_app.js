import { Analytics } from "@vercel/analytics/react";
import "../output.css";
import "styles/globals.css";
import "../separado/storage.css";   
import { ClerkProvider } from "@clerk/nextjs";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
        <Analytics />
      </ClerkProvider>
    </>
  );
}

export default MyApp;
