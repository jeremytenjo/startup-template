import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import ProfilePageLayout from '../layouts/ProfilePageLayout/ProfilePageLayout.js'
import useAuth from '../../../data/users/utils/useAuth/useAuth.js'

export default function ProfilePage() {
  const auth = useAuth()

  return (
    <ProfilePageLayout>
      <Box data-id='ProfilePage' sx={{}}>
        <Text text={`Hi ${auth.user?.displayName}`} tag='p' sx={{}} />
      </Box>
    </ProfilePageLayout>
  )
}
