import React from 'react'
import Box from '@useweb/ui/Box'
import { SliceZone } from '@prismicio/react'

import TermsOfServicePageLayout from '../layouts/TermsOfServicePageLayout/TermsOfServicePageLayout.js'
import { usePrismicStandardPage } from '../../../lib/integrations/Prismic/pageTypes/standard/PrismicStandardPageProvider/PrismicStandardPageProvider.js'

export default function TermsOfServicePage() {
  const pageData = usePrismicStandardPage()

  console.log(pageData)

  return (
    <TermsOfServicePageLayout>
      <Box data-id='TermsOfServicePage' sx={{}}>
        <SliceZone slices={pageData.data.slices} components={{}} />
      </Box>
    </TermsOfServicePageLayout>
  )
}
