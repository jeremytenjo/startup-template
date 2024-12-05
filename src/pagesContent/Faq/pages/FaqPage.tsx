import React from 'react'
import Box from '@useweb/ui/Box'

import FaqPageLayout from '../layouts/FaqPageLayout/FaqPageLayout.js'
import { usePrismicStandardPage } from '../../../lib/integrations/Prismic/pageTypes/standard/PrismicStandardPageProvider/PrismicStandardPageProvider.js'
import PrismicSlicesRenderer from '../../../lib/integrations/Prismic/ui/PrismicSlicesRenderer/PrismicSlicesRenderer.js'

export default function FaqPage() {
  const pageData = usePrismicStandardPage()

  return (
    <FaqPageLayout>
      <Box data-id='FaqPage' sx={{}}>
        <PrismicSlicesRenderer slices={pageData.data.slices} />
      </Box>
    </FaqPageLayout>
  )
}
