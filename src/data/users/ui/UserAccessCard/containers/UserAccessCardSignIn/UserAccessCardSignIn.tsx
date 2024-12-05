import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

export type UserAccessCardSignInProps = { name?: string }

export default function UserAccessCardSignIn(props: UserAccessCardSignInProps) {
  return (
    <Box data-id='UserAccessCardSignIn' sx={{}}>
      <Text text={'UserAccessCardSignIn'} tag='p' sx={{}} />
    </Box>
  )
}
