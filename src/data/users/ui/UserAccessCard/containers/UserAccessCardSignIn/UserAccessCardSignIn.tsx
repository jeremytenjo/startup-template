import React from 'react'
import { useRouter } from 'next/router'
import type { MultiFactorResolver } from 'firebase/auth'
import { getAuth, getMultiFactorResolver } from 'firebase/auth'
import useSnackbar from '@useweb/ui/Snackbar'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Form from '@useweb/ui/Form'
import TextField from '@useweb/ui/TextField'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import useAuth from '../../../../utils/useAuth/useAuth.js'
import type UserSchema from '../../../../user.schema.js'
import VerifyPhoneCode from '../../../../../../lib/components/dataDisplay/VerifyPhoneCode/VerifyPhoneCode.js'
import ContinueWithGoogleButton from '../../../../utils/signIn/ContinueWithGoogle/ui/ContinueWithGoogleButton/ContinueWithGoogleButton.js'
import { noAccountErrorMessage } from '../../../../utils/signIn/ContinueWithGoogle/continueWithGoogle.js'
import AccountAccessCta from '../../../AccountAccessCTA/AccountAccessCta.js'
import appConfig from '../../../../../../../app.config.js'
import { allNavLinks } from '../../../../../mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'
import { Island } from '../../../../../../theme/UiTheme/commonStyles/islandStyles.js'

export type UserAccessCardSignInProps = {
  redirectOnSignIn?: boolean
  onSignIn?: (result: { result: UserSchema }) => void
}

type FormSchema = {
  email: string
  password: string
}

export default function UserAccessCardSignIn(props: UserAccessCardSignInProps) {
  const snackbar = useSnackbar()
  const router = useRouter()

  const { redirectOnSignIn = true } = props
  const [mfaResolver, setMfaResolver] = React.useState<MultiFactorResolver | undefined>()

  const auth = useAuth({
    onSignIn({ result }) {
      if (router.query?.redirectAfterSignin) {
        router.push(router.query.redirectAfterSignin as string)
        return
      }

      if (props.onSignIn) {
        props.onSignIn({ result })
      }

      if (redirectOnSignIn) {
        router.push('/')
        snackbar.show({
          severity: 'success',
          message: `Welcome ${result.displayName}`,
        })
      }
    },
    onSignInError({ error }) {
      if (String(error).includes('(auth/multi-factor-auth-required)')) {
        const resolver = getMultiFactorResolver(getAuth(), error as any)
        setMfaResolver(resolver)
      }
    },
  })

  if (mfaResolver) {
    return (
      <Box data-id='Sign in with MFA' sx={{}}>
        <VerifyPhoneCode
          signIn={{
            mfaResolver,
          }}
        />
      </Box>
    )
  }

  const isNoAccountErrorMessage = auth.signingInError
    .toString()
    .includes(noAccountErrorMessage)

  return (
    <>
      <Form<FormSchema>
        data-id='SignInUserForm'
        sx={{
          display: 'grid',
          alignContent: 'start',
          width: '100%',
          gridAutoFlow: 'row',
          gridGap: '20px',
          justifyItems: 'center',
        }}
        onSubmit={({ formValues }) => {
          auth.signIn({ emailSignIn: formValues })
        }}
      >
        <ContinueWithGoogleButton
          onClick={() => {
            auth.signIn({ signInWithGoogle: true })
          }}
        />
        <Text
          text={`Or sign in via email`}
          sx={{
            textAlign: 'center',
          }}
        />
        <TextField<FormSchema>
          name='email'
          type='email'
          label='E-mail'
          placeholder='Email'
          required='Email is required.'
          inputProps={{
            autoCapitalize: 'off',
            autoCorrect: 'off',
          }}
          sx={{
            width: '100%',
          }}
        />
        <TextField<FormSchema>
          id='current-password'
          type='password'
          name='password'
          label='Password'
          placeholder='Password'
          required='Password is required.'
          inputProps={{
            autoComplete: 'current-password',
            autoCapitalize: 'off',
          }}
          labelWrapperSx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          labelRightIcon={
            <Link href={allNavLinks.access.resetPassword.url}>
              <Text
                text={`Password Recovery`}
                sx={{
                  color: 'neutral.150',
                  fontSize: '12px',
                  fontWeight: 500,
                  textDecoration: 'underline',
                }}
              />
            </Link>
          }
          sx={{
            width: '100%',
          }}
        />
        <AccountAccessCta loading={auth.isSigningIn} text='Continue with Email' />

        {auth.signingInError &&
          !auth.signingInError
            ?.toString()
            ?.includes('(auth/multi-factor-auth-required)') && (
            <ErrorMessage
              error={auth.signingInError}
              message={
                isNoAccountErrorMessage
                  ? `You do not have a ${appConfig.siteInfo.name} account, please create one in the ${allNavLinks.access.signUp.label} page.`
                  : 'You have entered an invalid username/email or password'
              }
            />
          )}

        {isNoAccountErrorMessage && (
          <Link href={allNavLinks.access.signUp.url}>
            <Button name={`Go to ${allNavLinks.access.signUp.label} page`} sx={{}}>
              Go to {allNavLinks.access.signUp.label} page
            </Button>
          </Link>
        )}
      </Form>

      <Island
        sx={{
          mt: '50px',
          textAlign: 'center',
          backgroundColor: 'neutral.400',
        }}
      >
        <Text text={`Don't have an account? `} tag='span' sx={{}} />
        <Link href={allNavLinks.access.signUp.url}>
          <Text
            text={`Sign up`}
            tag='span'
            sx={{
              color: 'primary.main',
              fontWeight: 500,
            }}
          />
        </Link>
      </Island>
    </>
  )
}
