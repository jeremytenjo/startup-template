import React from 'react'
import Box from '@useweb/ui/Box'

import UserPageLayout from '../layouts/UserPageLayout/UserPageLayout.js'

export default function UserPage() {
  return (
    <UserPageLayout>
      <Box data-id='UserPage' sx={{}}>
        User
      </Box>
    </UserPageLayout>
  )
}
