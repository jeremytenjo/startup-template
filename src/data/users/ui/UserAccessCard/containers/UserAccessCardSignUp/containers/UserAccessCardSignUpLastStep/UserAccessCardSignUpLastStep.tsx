import React from 'react'
import Box from '@useweb/ui/Box'
import { useFormContext } from '@useweb/ui/Form'
import TextField from '@useweb/ui/TextField'

import type {
  SignUpFetcherProps,
  UseAuthReturn,
} from '../../../../../../utils/useAuth/useAuth.js'
import type { UserAccessCardSignUpFormSchema } from '../../UserAccessCardSignUp.js'
import ContinueWithGoogleButton from '../../../../../../utils/signIn/ContinueWithGoogle/ui/ContinueWithGoogleButton/ContinueWithGoogleButton.js'
import AccountAccessCta from '../../../../../AccountAccessCTA/AccountAccessCta.js'
import { validatePassword } from '../../../../../../utils/signUp/signUpFormUtils/signUpFormUtils.js'

export type UserAccessCardSignUpLastStepProps = { auth: UseAuthReturn }

export default function UserAccessCardSignUpLastStep(
  props: UserAccessCardSignUpLastStepProps,
) {
  const [showEmailSignUpoptions, setShowEmailSignUpoptions] = React.useState(false)
  const formContext = useFormContext<UserAccessCardSignUpFormSchema>()

  const signUpWithGoogleProps: SignUpFetcherProps['signUpWithGoogle'] = {
    profilePhoto: formContext.watch('profilePhoto'),
    customUsername: formContext.watch('customUsername'),
  }

  return (
    <Box
      data-id='UserAccessCardSignUpLastStep'
      sx={{
        display: 'grid',
        gap: 2,
      }}
    >
      <ContinueWithGoogleButton
        onClick={() => {
          props.auth.signUp.exec({ signUpWithGoogle: signUpWithGoogleProps })
        }}
      />

      {showEmailSignUpoptions ? (
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
            loading={props.auth.signUp.loading}
            text='Continue with Email'
            buttonProps={{
              variant: 'text',
            }}
          />
        </>
      ) : (
        <AccountAccessCta
          loading={props.auth.signUp.loading}
          text='Continue with Email'
          buttonProps={{
            type: 'button',
            onClick: () => setShowEmailSignUpoptions(true),
          }}
        />
      )}
    </Box>
  )
}
