import React from 'react'
import Box from '@useweb/ui/Box'

import SettingsSecurityPageLayout from '../layouts/SettingsSecurityPageLayout/SettingsSecurityPageLayout.js'
import SettingsPagesLayout from '../../_common/SettingsPagesLayout/SettingsPagesLayout.js'

import ChangePasswordForm from './containers/ChangePasswordForm/ChangePasswordForm/ChangePasswordForm.js'

export default function SettingsSecurityPage() {
  return (
    <SettingsPagesLayout>
      <SettingsSecurityPageLayout>
        <Box data-id='SettingsSecurityPage' sx={{}}>
          <ChangePasswordForm />
        </Box>
      </SettingsSecurityPageLayout>
    </SettingsPagesLayout>
  )
}
