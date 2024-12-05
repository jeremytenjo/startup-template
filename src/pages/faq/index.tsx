import React from 'react'
import type { InferGetStaticPropsType } from 'next'

import FaqPage from '../../pagesContent/Faq/pages/FaqPage.js'
import getStandardPageByUid from '../../lib/integrations/Prismic/pageTypes/standard/getStandardPageByUid/getStandardPageByUid.js'
import PrismicStandardPageProvider from '../../lib/integrations/Prismic/pageTypes/standard/PrismicStandardPageProvider/PrismicStandardPageProvider.js'

import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export const getStaticProps = async ({ previewData }) => {
  const res = await getStandardPageByUid({
    previewData,
    uid: 'faq',
  })

  return {
    props: {
      tosData: res,
    },
  }
}

export default function FaqPageRoot(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <PrismicStandardPageProvider getStandardPageByUidReturn={props.tosData}>
      <RootLayout title='Frequently Asked Questions'>
        <FaqPage />
      </RootLayout>
    </PrismicStandardPageProvider>
  )
}
