import React from 'react'
import Box from '@useweb/ui/Box'

import TermsOfServicePageLayout from '../layouts/TermsOfServicePageLayout/TermsOfServicePageLayout.js'
import { usePrismicStandardPage } from '../../../lib/integrations/Prismic/pageTypes/standard/PrismicStandardPageProvider/PrismicStandardPageProvider.js'
import PrismicSlicesRenderer from '../../../lib/integrations/Prismic/ui/PrismicSlicesRenderer/PrismicSlicesRenderer.js'

export default function TermsOfServicePage() {
  const pageData = usePrismicStandardPage()

  return (
    <TermsOfServicePageLayout>
      <Box data-id='TermsOfServicePage' sx={{}}>
        <PrismicSlicesRenderer slices={pageData.data.slices} />
      </Box>
    </TermsOfServicePageLayout>
  )
}
