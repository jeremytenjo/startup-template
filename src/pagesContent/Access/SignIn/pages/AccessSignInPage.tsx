import React from 'react'
import Box from '@useweb/ui/Box'

import AccessSignInPageLayout from '../layouts/AccessSignInPageLayout/AccessSignInPageLayout.js'
import UserAccessCard from '../../../../data/users/ui/UserAccessCard/UserAccessCard.js'

export default function AccessSignInPage() {
  return (
    <AccessSignInPageLayout>
      <Box data-id='AccessSignInPage' sx={{}}>
        <UserAccessCard type='sign-in' />
      </Box>
    </AccessSignInPageLayout>
  )
}
