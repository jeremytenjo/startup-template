import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import UserPageLayout from '../layouts/UserPageLayout/UserPageLayout.js'
import useAuth from '../../../data/users/utils/useAuth/useAuth.js'

export default function UserPage() {
  const auth = useAuth()

  return (
    <UserPageLayout>
      <Box data-id='UserPage' sx={{}}>
        <Text text={`Hi ${auth.user?.displayName}`} tag='p' sx={{}} />
      </Box>
    </UserPageLayout>
  )
}
