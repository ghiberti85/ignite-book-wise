import { ReactNode } from "react"
import { Layout } from './styles'
import Head from "next/head"
import { Sidebar } from "@/components/Sidebar"

interface DefaultLayoutProps {
    title: string
    children: ReactNode
}

export function DefaultLayout({ title, children }: DefaultLayoutProps) {
    return (
      <Layout>
        <Head>
          <title>{`${title} | BookWise`}</title>
        </Head>
  
        <Sidebar />
  
        <main>{children}</main>
      </Layout>
    )
  }