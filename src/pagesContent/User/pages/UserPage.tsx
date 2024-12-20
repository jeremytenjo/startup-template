import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import UserPageLayout from '../layouts/UserPageLayout/UserPageLayout.js'
import useUserPage from '../utils/useUserPage/useUserPage.js'

export default function UserPage() {
  const pageData = useUserPage()

  return (
    <UserPageLayout>
      <Box data-id='UserPage' sx={{}}>
        <Text text={`Hi ${pageData.pageUser?.displayName}`} tag='p' sx={{}} />
      </Box>
    </UserPageLayout>
  )
}
