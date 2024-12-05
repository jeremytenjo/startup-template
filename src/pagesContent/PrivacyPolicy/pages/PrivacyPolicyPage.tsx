import React from 'react'
import Box from '@useweb/ui/Box'

import PrivacyPolicyPageLayout from '../layouts/PrivacyPolicyPageLayout/PrivacyPolicyPageLayout.js'
import { usePrismicStandardPage } from '../../../lib/integrations/Prismic/pageTypes/standard/PrismicStandardPageProvider/PrismicStandardPageProvider.js'
import PrismicSlicesRenderer from '../../../lib/integrations/Prismic/ui/PrismicSlicesRenderer/PrismicSlicesRenderer.js'

export default function PrivacyPolicyPage() {
  const pageData = usePrismicStandardPage()

  return (
    <PrivacyPolicyPageLayout>
      <Box data-id='PrivacyPolicyPage' sx={{}}>
        <PrismicSlicesRenderer slices={pageData.data.slices} />
      </Box>
    </PrivacyPolicyPageLayout>
  )
}
