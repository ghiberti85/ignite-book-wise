import { HomePageContainer } from "@/components/HomePage/styles"
import { ChartLineUp } from "@phosphor-icons/react"
import { NextPageWithLayout } from './_app'
import { ReactElement } from 'react'
import { DefaultLayout } from '@/layouts/DefaultLayout'

const HomePage: NextPageWithLayout = () => {
  return (
    <HomePageContainer>
      <h1>
        <ChartLineUp size="32" />
        Início
      </h1>

      <div>
        <LatestBookReviews />
        <PopularBooks />
      </div>
    </HomePageContainer>
  )
}

HomePage.getLayout = (page: ReactElement) => {
  return <DefaultLayout title="Início">{page}</DefaultLayout>
}

export default HomePage