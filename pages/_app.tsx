import Header from '@/components/custom/header'
import Layout from '@/components/custom/layout'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (<><Head>
    <title>Eden</title>
    <meta name="Description" content="SEO" />
    <link rel="icon" href="/assets/logo.png" />
  </Head>
  <SessionProvider session={session} refetchOnWindowFocus={true}>
			
						
							 <Component {...pageProps} />
			
			</SessionProvider>
  
  
  </>)
}
