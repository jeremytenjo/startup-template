import React from 'react'
import Box from '@useweb/ui/Box'

import SettingsAccountPageLayout from '../layouts/SettingsAccountPageLayout/SettingsAccountPageLayout.js'
import SettingsPagesLayout from '../../_common/SettingsPagesLayout/SettingsPagesLayout.js'

import SettingsAccountPageDeactivateAccount from './containers/SettingsAccountPageDeactivateAccount/SettingsAccountPageDeactivateAccount.js'

export default function SettingsAccountPage() {
  return (
    <SettingsPagesLayout>
      <SettingsAccountPageLayout>
        <Box data-id='SettingsAccountPage' sx={{}}>
          <SettingsAccountPageDeactivateAccount />
        </Box>
      </SettingsAccountPageLayout>
    </SettingsPagesLayout>
  )
}
