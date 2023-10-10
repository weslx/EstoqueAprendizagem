import { Analytics } from '@vercel/analytics/react';
import '../output.css'
 
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
 
export default MyApp;