import { Analytics } from "@vercel/analytics/react";
import "../output.css";
import "styles/globals.css";
import "../styles/start.css"
import "../styles/style.css";
import "../styles/find.css";
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
