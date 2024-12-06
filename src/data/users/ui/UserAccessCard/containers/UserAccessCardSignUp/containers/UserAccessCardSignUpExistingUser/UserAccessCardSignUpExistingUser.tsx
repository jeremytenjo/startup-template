import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'
import Avatar from '@useweb/ui/Avatar'

import useAuth from '../../../../../../utils/useAuth/useAuth.js'

export default function UserAccessCardSignUpExistingUser() {
  const auth = useAuth()

  return (
    <Box
      data-id='UserAccessCardSignUpExistingUser'
      sx={{
        mb: 3,
        display: 'grid',
        justifyContent: 'center',
        justifyItems: 'center',
        gap: 2,
      }}
    >
      <Text
        text={`Welcome ${auth.user?.displayName}!`}
        tag='p'
        sx={{
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 2,
        }}
      />
      <Avatar
        src={auth.user?.photoURL}
        alt={`${auth.user?.displayName}`}
        sx={{ width: '45px', height: '45px' }}
      />

      <Link href={`/`}>
        <Button name='Go Home' sx={{}}>
          Go Home
        </Button>
      </Link>
    </Box>
  )
}
