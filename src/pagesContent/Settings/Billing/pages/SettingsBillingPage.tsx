import React from 'react'
import Box from '@useweb/ui/Box'

import SettingsBillingPageLayout from '../layouts/SettingsBillingPageLayout/SettingsBillingPageLayout.js'
import SettingsPagesLayout from '../../_common/SettingsPagesLayout/SettingsPagesLayout.js'

export default function SettingsBillingPage() {
  return (
    <SettingsPagesLayout>
      <SettingsBillingPageLayout>
        <Box data-id='SettingsBillingPage' sx={{}}>
          SettingsBilling
        </Box>
      </SettingsBillingPageLayout>
    </SettingsPagesLayout>
  )
}
