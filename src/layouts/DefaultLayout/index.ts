import { ReactNode } from "react"

interface DefaultLayoutProps {
    title: string
    children: ReactNode
}

export function DefaultLayout({ title, children }: DefaultLayoutProps) {
    return (
        <Layout>
            <Head>
                <title>{`${title} | Bookwise`}</title>
            </Head>

            <Sidebar />

            <main>{children}</main>
        </Layout>
    )
}