import "../styles/globals.css";
import NextNprogress from "nextjs-progressbar";
import { DarkModeProvider } from "../contexts/DarkMode";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DarkModeProvider>
        <NextNprogress />
        <Component {...pageProps} />
      </DarkModeProvider>
    </>
  );
}

export default MyApp;
