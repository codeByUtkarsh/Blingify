

import { StoreProvider } from "@/redux/StoreProvider";
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: "Blingify",
  description: "Your one-stop shop for all your needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <body>
        <StoreProvider>
          {children}
          <ToastContainer position="top-right" autoClose={5000} />
        </StoreProvider>
      </body>
    </html>
  );
}


