import React from 'react'
import Box from '@useweb/ui/Box'

import AccessSignUpPageLayout from '../layouts/AccessSignUpPageLayout/AccessSignUpPageLayout.js'
import UserAccessCard from '../../../../data/users/ui/UserAccessCard/UserAccessCard.js'

export default function AccessSignUpPage() {
  return (
    <AccessSignUpPageLayout>
      <Box data-id='AccessSignUpPage' sx={{}}>
        <UserAccessCard type='sign-up' />
      </Box>
    </AccessSignUpPageLayout>
  )
}
