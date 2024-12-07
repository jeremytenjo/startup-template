import React from 'react'
import Box from '@useweb/ui/Box'

import SettingsEditProfilePageLayout from '../layouts/SettingsEditProfilePageLayout/SettingsEditProfilePageLayout.js'
import SettingsPagesLayout from '../../_common/SettingsPagesLayout/SettingsPagesLayout.js'

export default function SettingsEditProfilePage() {
  return (
    <SettingsPagesLayout>
      <SettingsEditProfilePageLayout>
        <Box data-id='SettingsEditProfilePage' sx={{}}>
          SettingsEditProfilePage
        </Box>
      </SettingsEditProfilePageLayout>
    </SettingsPagesLayout>
  )
}
