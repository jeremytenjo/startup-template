import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Form, { useFormContext } from '@useweb/ui/Form'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'
import Avatar from '@useweb/ui/Avatar'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import TextField from '@useweb/ui/TextField'

import type { SignUpFetcherProps } from '../../../../utils/useAuth/useAuth.js'
import useAuth from '../../../../utils/useAuth/useAuth.js'
import { validatePassword } from '../../../../utils/signUp/signUpFormUtils/signUpFormUtils.js'
import AccountAccessCta from '../../../AccountAccessCTA/AccountAccessCta.js'
import postHogEventClick from '../../../../../../lib/integrations/PostHog/events/browser/postHogEventClick/postHogEventClick.js'
import ContinueWithGoogleButton from '../../../../utils/signIn/ContinueWithGoogle/ui/ContinueWithGoogleButton/ContinueWithGoogleButton.js'
import useOnSignUpActions from '../../../../utils/signUp/useOnSignUpActions/useOnSignUpActions.js'

export type UserAccessCardSignUpProps = any

type UserAccessCardSignUpFormSchema = {
  email: string
  password: string
  username: string
  photoUrl: string
  bannerUrl: string
}

export default function UserAccessCardSignUp() {
  const [showEmailSignUpoptions, setShowEmailSignUpoptions] = React.useState(false)
  const onSignUpAction = useOnSignUpActions()
  const auth = useAuth({
    onSignUp: () => {
      onSignUpAction.onSignUp()
    },
  })

  return (
    <Form<UserAccessCardSignUpFormSchema>
      data-id='UserAccessCardSignUpForm'
      sx={{
        display: 'grid',
        gap: 2,
        width: '100%',
      }}
      onSubmit={({ formValues: formProps }) => {
        auth.signUp.exec({
          emailPasswordData: {
            ...formProps,
          },
        })
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
        <Box
          data-id='UserAccessCardSignUpNewAccount'
          sx={{
            display: 'grid',
            gap: 2,
          }}
        >
          <UserAccessCardSignUpFormContinueWithGoogle />

          <Text
            text={`Or sign up via email`}
            sx={{
              textAlign: 'center',
            }}
          />

          {showEmailSignUpoptions ? (
            <UserAccessCardSignUpWithEmailFormFields />
          ) : (
            <AccountAccessCta
              loading={auth.signUp.loading}
              text='Continue with Email'
              buttonProps={{
                type: 'button',
                onClick: () => setShowEmailSignUpoptions(true),
              }}
            />
          )}

          <ErrorMessage error={auth.signUp?.error} message={'Error creating account'} />
        </Box>
      )}
    </Form>
  )
}

const UserAccessCardSignUpFormContinueWithGoogle = () => {
  const auth = useAuth()
  const formContext = useFormContext<UserAccessCardSignUpFormSchema>()

  const signUpWithGoogleProps: SignUpFetcherProps['signUpWithGoogle'] = {
    username: formContext.watch('username'),
    photoUrl: formContext.watch('photoUrl'),
    bannerUrl: formContext.watch('bannerUrl'),
  }

  const onContinueWithGoogleClick = () => {
    postHogEventClick({
      action: 'user sign up: Continue with Google',
    })

    auth.signUp.exec({ signUpWithGoogle: signUpWithGoogleProps })
  }

  return <ContinueWithGoogleButton onClick={onContinueWithGoogleClick} />
}

const UserAccessCardSignUpWithEmailFormFields = () => {
  const auth = useAuth()

  return (
    <>
      <TextField<UserAccessCardSignUpFormSchema>
        name='email'
        type='email'
        placeholder='Email'
        label='E-mail'
        required='Missing email'
        inputProps={{
          autoCapitalize: 'off',
          autoCorrect: 'off',
        }}
        sx={{
          width: '100%',
        }}
        validate={(value) => {
          if (value.includes('socialseed') && value !== 'cole@socialseed.com') {
            return 'Invalid email'
          }
        }}
      />

      <TextField<UserAccessCardSignUpFormSchema>
        id='new-password'
        type='password'
        name='password'
        label={'Password'}
        placeholder='Password'
        required='Missing password'
        inputProps={{
          autoComplete: 'new-password',
          autoCapitalize: 'off',
        }}
        registerProps={{
          validate: (value) => {
            const res = validatePassword(value)
            return res.isValid ? true : res.message
          },
        }}
        sx={{
          width: '100%',
        }}
      />

      <AccountAccessCta
        loading={auth.signUp.loading}
        text='Continue with Email'
        buttonProps={{
          variant: 'text',
          onClick: () => {
            postHogEventClick({
              action: 'user sign up: Continue with Email',
            })
          },
        }}
      />
    </>
  )
}
