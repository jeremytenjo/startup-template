import React from 'react'
import Box from '@useweb/ui/Box'
import LinkTabs from '@useweb/ui/LinkTabs'

import SettingsPagesLayout from '../../../_common/SettingsPagesLayout/SettingsPagesLayout.js'

export type SettingsBillingPageLayoutProps = { children: any }

export default function SettingsBillingPageLayout(props: SettingsBillingPageLayoutProps) {
  return (
    <SettingsPagesLayout>
      <Box data-id='SettingsBillingPageLayout' sx={{}}>
        <LinkTabs
          links={[
            {
              label: 'Transactions',
              hrefOverride: '/',
              isActiveFn(p) {
                return {
                  isActive: p.pathname === '/settings/billing',
                }
              },
            },
            {
              label: 'Stripe Account',
            },
          ]}
          urlBase='settings/billing'
          sx={{
            mb: 2,
            mt: [-4, , -3],
          }}
        />
        {props.children}
      </Box>
    </SettingsPagesLayout>
  )
}
