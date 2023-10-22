import { Analytics } from "@vercel/analytics/react";
import "../output.css";
import "styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "../styles/find.css";
import "../styles/style.css";

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
