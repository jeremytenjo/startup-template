import React from 'react'
import type { GetStaticProps } from 'next'

import TermsOfServicePage from '../../pagesContent/TermsOfService/pages/TermsOfServicePage.js'
import getStandardPageByUid from '../../lib/integrations/Prismic/pageTypes/standard/getStandardPageByUid/getStandardPageByUid.js'

import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export const getStaticProps = (async ({ previewData }) => {
  const res = await getStandardPageByUid({
    previewData,
    uid: 'terms-of-service',
  })

  return {
    props: {
      faqPPage: res,
    },
  }
}) satisfies GetStaticProps<any>

export default function TermsOfServicePageRoot() {
  return (
    <>
      <RootLayout title='Terms of Service'>
        <TermsOfServicePage />
      </RootLayout>
    </>
  )
}
