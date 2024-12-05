import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Form from '@useweb/ui/Form'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'
import Avatar from '@useweb/ui/Avatar'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import useAuth from '../../../../utils/useAuth/useAuth.js'
import { getFirebaseErrorMessage } from '../../../../utils/signUp/signUpFormUtils/signUpFormUtils.js'

export type UserAccessCardSignUpProps = { name?: string }

type FormSchema = {
  email: string
  password: string
}

export default function UserAccessCardSignUp(props: UserAccessCardSignUpProps) {
  const auth = useAuth()

  return (
    <Form<FormSchema>
      data-id='UserAccessCardSignUp'
      sx={{}}
      onSubmit={(p) => {
        console.log(p)
      }}
    >
      {auth.user?.id ? (
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

          <Link href={`/dashboard`}>
            <Button name='Go to Dashboard' sx={{}}>
              Go to Dashboard
            </Button>
          </Link>
        </Box>
      ) : (
        <Box data-id='UserAccessCardSignUpNewAccount' sx={{}}>
          formmmmm
          {auth.signUp.error && (
            <ErrorMessage
              error={auth.signUp.error}
              message={getFirebaseErrorMessage({ error: auth.signUp.error })}
              sx={{
                mt: 2,
                width: '100%',
              }}
            />
          )}
        </Box>
      )}
    </Form>
  )
}
