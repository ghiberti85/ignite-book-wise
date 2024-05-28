import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Nunito_Sans } from 'next/font/google'
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "@/styles/global";
import { defaultTheme } from "@/styles/themes/default";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const nunito = Nunito_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
})


export default function App({ 
  Component, 
  pageProps: { session, ...pageProps },
 }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <style jsx global>{`
          html {
            font-family: ${nunito.style.fontFamily};
          }
        `}</style>
        <ThemeProvider theme={defaultTheme}>
          {getLayout(<Component {...pageProps} />)}
          <GlobalStyles />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
