import "../styles/globals.css";
import { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "next-themes";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
