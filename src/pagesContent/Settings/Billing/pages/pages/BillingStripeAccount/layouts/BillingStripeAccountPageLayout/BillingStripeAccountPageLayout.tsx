import React from 'react'
import Box from '@useweb/ui/Box'

import SettingsBillingPageLayout from '../../../../../layouts/SettingsBillingPageLayout/SettingsBillingPageLayout.js'

export type BillingStripeAccountPageLayoutProps = { children: any }

export default function BillingStripeAccountPageLayout(
  props: BillingStripeAccountPageLayoutProps,
) {
  return (
    <SettingsBillingPageLayout>
      <Box data-id='BillingStripeAccountPageLayout' sx={{}}>
        {props.children}
      </Box>
    </SettingsBillingPageLayout>
  )
}
