import React from 'react'
import Box from '@useweb/ui/Box'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import PhoneInput from '@useweb/ui/PhoneInput'
import Form, { ResetForm } from '@useweb/ui/Form'
import Button from '@useweb/ui/Button'
import { useRouter } from 'next/router'
import useSnackbar from '@useweb/ui/Snackbar'
import VerificationCodeInput from '@useweb/ui/VerificationCodeInput'
import useAsync from '@useweb/use-async'
import type { MultiFactorResolver } from 'firebase/auth'
import {
  getAuth,
  RecaptchaVerifier,
  PhoneAuthProvider,
  multiFactor,
  PhoneMultiFactorGenerator,
} from 'firebase/auth'
import Alert from '@useweb/ui/Alert'
import LinearProgress from '@useweb/ui/LinearProgress'
import TextField from '@useweb/ui/TextField'

import PageTitleHeading from '../../../layouts/PageTitleHeading/PageTitleHeading.js'
import useAuth from '../../../../data/users/utils/useAuth/useAuth.js'
import logError from '../../../utils/loggers/logError/logError.js'

export type VerifyPhoneCodeProps = {
  signIn?: {
    mfaResolver: MultiFactorResolver
  }
  onMfaEnrolled?: () => void
  onCodeSent?: () => void
}

type SendCodeFormSchema = {
  phoneNumber: string
}

export default function VerifyPhoneCode(props: VerifyPhoneCodeProps) {
  const mfaData = props.signIn?.mfaResolver?.hints?.[0] as
    | {
        displayName: string
        enrollmentTime: string
        factorId: string
        phoneNumber: string
        uid: string
      }
    | undefined

  const router = useRouter()
  const snackbar = useSnackbar()
  const auth = useAuth({
    onSignOut: () => {
      router.push('/access/sign-in?redirectAfterSignin=/settings/security')
    },
  })
  const [recaptchaVerifier, setRecaptchaVerifier] = React.useState<
    undefined | RecaptchaVerifier
  >()
  const [verificationId, setVerificationId] = React.useState<undefined | string>()
  const recaptchaId = 'SendCode_recaptcha'

  React.useEffect(() => {
    if (!recaptchaVerifier) {
      // https://firebase.google.com/docs/auth/web/phone-auth
      const recaptchaVerifierRes = new RecaptchaVerifier(getAuth(), recaptchaId, {
        size: 'invisible',
        'expired-callback': function () {
          logError({
            error: 'expired-callback',
            fnName: 'RecaptchaVerifier',
            metadata: {},
          })
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      })

      setRecaptchaVerifier(recaptchaVerifierRes)
    }
  }, [])

  const sendCodeFn = useAsync<SendCodeFormSchema, SendCodeFormSchema>({
    fn: async (p) => {
      setVerificationId(undefined)

      if (!recaptchaVerifier) {
        throw new Error(`recaptchaVerifier is undefined`)
      }

      const phoneAuthProvider = new PhoneAuthProvider(getAuth())

      if (props.signIn) {
        const verificationId = await phoneAuthProvider.verifyPhoneNumber(
          {
            multiFactorHint: props.signIn?.mfaResolver.hints[0],
            session: props.signIn?.mfaResolver.session,
          },
          recaptchaVerifier,
        )

        setVerificationId(verificationId)
      } else {
        if (!auth.auth.currentUser) {
          throw new Error(`auth.auth.currentUser is undefined`)
        }
        const multiFactorSession = await multiFactor(auth.auth.currentUser).getSession()
        const verificationId = await phoneAuthProvider.verifyPhoneNumber(
          {
            session: multiFactorSession,
            phoneNumber: p.phoneNumber,
          },
          recaptchaVerifier,
        )

        setVerificationId(verificationId)
      }

      return p
    },
    onResult() {
      props.onCodeSent && props.onCodeSent()
    },
    onError({ error, fnProps }) {
      if (recaptchaVerifier) {
        recaptchaVerifier.clear()
      }

      logError({
        error,
        fnName: 'sendCodeFn',
        metadata: { fnProps },
        ignoreErrorIf({ e }) {
          const ignore = e?.toString()?.includes('(auth/requires-recent-login)')
          return {
            ignore,
          }
        },
      })
    },
  })

  const submitVerificationCode = useAsync<
    {
      verificationCode: string
    },
    any
  >({
    fn: async (p) => {
      if (!verificationId) {
        throw new Error(`verificationId is undefined`)
      }
      const cred = PhoneAuthProvider.credential(verificationId, p.verificationCode)
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred)

      // Complete sign-in.
      if (props.signIn) {
        await props.signIn.mfaResolver.resolveSignIn(multiFactorAssertion)
      } else {
        // Complete enrollment.
        if (!auth.auth.currentUser) {
          throw new Error(`auth.auth.currentUser is undefined`)
        }
        await multiFactor(auth.auth.currentUser).enroll(
          multiFactorAssertion,
          'Text message code verification',
        )
      }
    },
    onResult: () => {
      snackbar.show({
        message: 'Two factor authentication enabled',
        severity: 'success',
      })
      props.onMfaEnrolled && props.onMfaEnrolled()
    },
    onError({ error, fnProps }) {
      logError({
        error,
        fnName: 'submitVerificationCode',
        metadata: { fnProps },
      })
    },
  })

  // Enter Verification Code
  if (verificationId) {
    return (
      <Box
        data-id='Enter Code'
        sx={{
          display: 'grid',
          gap: 2,
        }}
      >
        <PageTitleHeading
          title='Enter Code'
          size={3}
          subTitle='Please enter the verification code sent to your phone number'
          sx={{
            mb: 0,
            textAlign: 'center',
            justifyContent: 'center',
          }}
        />

        <Alert
          severity='success'
          sx={{
            display: 'flex',
            justifyItems: 'center',
            justifyContent: 'center',
            width: 'fit-content',
            margin: 'auto',
            '& .MuiAlert-icon': {
              display: 'none',
            },
          }}
        >
          Code sent to {sendCodeFn.result?.phoneNumber}
        </Alert>

        <VerificationCodeInput
          onComplete={(p) => {
            submitVerificationCode.exec({
              verificationCode: p,
            })
          }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        />

        {submitVerificationCode.loading && <LinearProgress />}

        <ErrorMessage
          error={submitVerificationCode.error}
          message='Error verifying code'
          sx={{
            display: 'flex',
            justifyItems: 'center',
            justifyContent: 'center',
            '& .MuiAlert-icon': {
              display: 'none',
            },
          }}
        />
      </Box>
    )
  }

  const requiresRecentLogin = sendCodeFn.error
    ?.toString()
    ?.includes('(auth/requires-recent-login)')

  // Enter Phone Number
  return (
    <Form<SendCodeFormSchema>
      onSubmit={(p) => {
        sendCodeFn.exec(p.formValues)
      }}
      defaultValues={{
        phoneNumber: mfaData?.phoneNumber || '',
      }}
      data-id='SendCode'
      sx={{
        display: 'grid',
        gap: 2,
      }}
    >
      <div id={recaptchaId} />

      <ResetForm<SendCodeFormSchema>
        resetIfTrue={Boolean(mfaData?.phoneNumber)}
        formValues={{
          phoneNumber: mfaData?.phoneNumber as string,
        }}
      />

      <PageTitleHeading
        title={mfaData?.phoneNumber ? 'Get Verification Code' : 'Enter Phone Number'}
        size={3}
        subTitle='We will send a code to this number. Standard text message rates apply.'
        sx={{
          mb: 0,
          textAlign: 'center',
          justifyContent: 'center',
        }}
      />

      {mfaData?.phoneNumber ? (
        <TextField<SendCodeFormSchema>
          name='phoneNumber'
          placeholder='Phone Number'
          disabled
          required='Required'
          sx={{
            '& *': {
              textAlign: 'center',
            },
          }}
        />
      ) : (
        <PhoneInput<SendCodeFormSchema>
          name='phoneNumber'
          placeholder='Enter phone number'
          required='Required'
          validate={(p) => {
            if (p.length < 9) {
              return 'Please enter a valid phone number'
            }
          }}
        />
      )}

      <ErrorMessage
        error={sendCodeFn.error}
        message={
          requiresRecentLogin
            ? 'Please sign out and sign back in to continue.'
            : 'Error sending code'
        }
      />

      {requiresRecentLogin ? (
        <div>
          <Button name='Sign Out' onClick={auth.signOut} sx={{}}>
            Sign Out
          </Button>
        </div>
      ) : (
        <div>
          <Button name='Send Code' type='submit' sx={{}} loading={sendCodeFn.loading}>
            Send Code
          </Button>
        </div>
      )}
    </Form>
  )
}
