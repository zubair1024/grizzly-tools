import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} />
          <ToastContainer />
        </AnimatePresence>
      </div>
    </>
  );
}
