import { signInWithEmailAndPassword } from 'firebase/auth'
import useFirebaseAuth, {
  type UseFirebaseAuthProps,
} from '@useweb/firebase/useFirebaseAuth'
import assert from '@useweb/assert'
import { getToday } from '@useweb/date'

import type UserSchema from '../../user.schema.js'
import { setRecentlyLoggedInSessionStorage } from '../../../../lib/utils/misc/recentlyLoggedInSessionStorage/recentlyLoggedInSessionStorage.js'
import logError from '../../../../lib/utils/loggers/logError/logError.js'
import updateFirestoreUserLastSignedIn from '../../../../lib/integrations/Google/Firebase/auth/utils/updateFirestoreUserLastSignedIn/updateFirestoreUserLastSignedIn.js'
import { auth as firebaseAuth } from '../../../../lib/integrations/Google/Firebase/firebase.js'

// Sign in
type SignInFetcherProps = {
  emailSignIn?: {
    email: string
    password: string
  }
  signInWithGoogle?: boolean
}

export type OnSignUpProps = any

type UseAuthProps<UserSchema> = {
  onSignOut?: UseFirebaseAuthProps<
    UserSchema,
    SignInFetcherProps,
    SignUpFetcherProps
  >['onSignOut']
  onSignIn?: UseFirebaseAuthProps<
    UserSchema,
    SignInFetcherProps,
    SignUpFetcherProps
  >['onSignIn']
  onSignInError?: UseFirebaseAuthProps<
    UserSchema,
    SignInFetcherProps,
    SignUpFetcherProps
  >['onSignInError']
  onSignUp?: UseFirebaseAuthProps<
    UserSchema,
    SignInFetcherProps,
    SignUpFetcherProps,
    OnSignUpProps
  >['onSignUp']
  onUserNotInFirestore?: UseFirebaseAuthProps<
    UserSchema,
    SignInFetcherProps,
    SignUpFetcherProps,
    OnSignUpProps
  >['onUserNotInFirestore']
}

const signInFetcher = async (props: SignInFetcherProps) => {
  // auth
  const auth = firebaseAuth

  if (props.emailSignIn) {
    await signInWithEmailAndPassword(
      auth,
      props.emailSignIn.email,
      props.emailSignIn.password,
    )
  }

  if (props.signInWithGoogle) {
    // await continueWithGoogle({})
  }

  // @useweb/firebase/useFirebaseAuth handlers return user, it fetrches the user from firestore
}

export type RobloxDataSchema = {
  robloxUserId: string | false
}

export type SignUpFormEmailPasswordDataSchema = {
  email: string
  password: string
  username: string
  photoUrl: string | false
  bannerUrl: UserSchema['bannerUrl']
  agreedToTOSandPrivacyPolicy: UserSchema['agreedToTOSandPrivacyPolicy']
} & RobloxDataSchema

export type SignUpFormGoogleDataSchema = RobloxDataSchema & {
  username: string
  photoUrl: string | false
  bannerUrl: UserSchema['bannerUrl']
  agreedToTOSandPrivacyPolicy: UserSchema['agreedToTOSandPrivacyPolicy']
}

// Sign up
export type SignUpFetcherProps = {
  emailPasswordData?: SignUpFormEmailPasswordDataSchema
  signUpWithGoogle?: SignUpFormGoogleDataSchema
}

const signUpFetcher = async (props: SignUpFetcherProps) => {
  assert({
    props: props.emailPasswordData || props.signUpWithGoogle,
    requiredProps: ['robloxUserId', 'username'],
  })

  const robloxUserId =
    props.emailPasswordData?.robloxUserId || props.signUpWithGoogle?.robloxUserId

  if (!robloxUserId) {
    throw new Error('missing robloxUserId')
  }

  if (props.emailPasswordData) {
    // await signUpWithEmailPassword({
    //   email: props.emailPasswordData.email,
    //   password: props.emailPasswordData.password,
    //   username: props.emailPasswordData.username,
    //   photoUrl: props.emailPasswordData.photoUrl,
    //   robloxUserId: props.emailPasswordData.robloxUserId,
    //   bannerUrl: props.emailPasswordData.bannerUrl,
    //   agreedToTOSandPrivacyPolicy: props.emailPasswordData.agreedToTOSandPrivacyPolicy,
    // })
  }

  if (props.signUpWithGoogle) {
    // await continueWithGoogle({
    //   signUp: {
    //     username: props.signUpWithGoogle?.username,
    //     photoUrl: props.signUpWithGoogle?.photoUrl,
    //     robloxUserId: props.signUpWithGoogle?.robloxUserId,
    //     bannerUrl: props.signUpWithGoogle?.bannerUrl,
    //     agreedToTOSandPrivacyPolicy: props.signUpWithGoogle?.agreedToTOSandPrivacyPolicy,
    //   },
    // })
  }
}

export default function useAuth(
  props: UseAuthProps<UserSchema> = {
    onSignIn: undefined,
    onSignInError: undefined,
    onSignOut: undefined,
    onSignUp: undefined,
    onUserNotInFirestore: undefined,
  },
) {
  const onUserNotInFirestore = ({ authUser }) => {
    return props.onUserNotInFirestore && props.onUserNotInFirestore({ authUser })
  }

  const auth = useFirebaseAuth<
    UserSchema,
    SignInFetcherProps,
    SignUpFetcherProps,
    OnSignUpProps
  >({
    onUserNotInFirestore,
    auth: firebaseAuth,
    // sign in
    signInFetcher,
    onSignIn: async ({ result }) => {
      if (result) {
        props.onSignIn && props.onSignIn({ result })
      }
    },
    onSignInFirstTime: (p) => {
      if (p.result?.id) {
        const currentLastSignInIsFalse = !p.result?.lastSignedIn
        const lastSignInWasMoreThanFourMinutesAgo =
          getToday() - p.result?.lastSignedIn > 240000

        if (currentLastSignInIsFalse || lastSignInWasMoreThanFourMinutesAgo) {
          updateFirestoreUserLastSignedIn({
            uid: p.result?.id,
          })
        }
      }
    },
    onSignInError: ({ error }) => {
      if (!error.toString().includes('auth/popup-closed-by-user')) {
        props.onSignInError &&
          props.onSignInError({
            error,
            fnProps: {},
            cause: {},
          })

        logError({
          error: String(error),
          fnName: 'useAuth - onSignInError',
          metadata: { props, error },
          ignoreErrorIf: ({ e }) => {
            const ignore = e.includes('(auth/multi-factor-auth-required)')
            return {
              ignore,
            }
          },
        })
      }
    },
    // sign up
    signUpFetcher,
    onSignUp: () => {
      props.onSignUp && props.onSignUp({})
    },
    onSignUpError({ error, cause }) {
      logError({
        error: error,
        fnName: 'useAuth - onSignUpError',
        metadata: { props, error, cause },
      })
      auth.signOut()
    },
    onSignOut: () => {
      setRecentlyLoggedInSessionStorage()
      props.onSignOut && props.onSignOut()
    },
  })

  return auth
}

export type UseAuthReturn = ReturnType<typeof useAuth>
