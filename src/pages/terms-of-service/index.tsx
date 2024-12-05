import React from 'react'
import type { InferGetStaticPropsType } from 'next'

import TermsOfServicePage from '../../pagesContent/TermsOfService/pages/TermsOfServicePage.js'
import getStandardPageByUid from '../../lib/integrations/Prismic/pageTypes/standard/getStandardPageByUid/getStandardPageByUid.js'
import PrismicStandardPageProvider from '../../lib/integrations/Prismic/pageTypes/standard/PrismicStandardPageProvider/PrismicStandardPageProvider.js'

import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export const getStaticProps = async ({ previewData }) => {
  const res = await getStandardPageByUid({
    previewData,
    uid: 'terms-of-service',
  })

  return {
    props: {
      tosData: res,
    },
  }
}

export default function TermsOfServicePageRoot(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  console.log(props.tosData.data)

  return (
    <PrismicStandardPageProvider getStandardPageByUidReturn={props.tosData}>
      <RootLayout title='Terms of Service'>
        <TermsOfServicePage />
      </RootLayout>
    </PrismicStandardPageProvider>
  )
}
