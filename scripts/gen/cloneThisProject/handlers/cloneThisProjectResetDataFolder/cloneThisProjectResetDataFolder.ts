import path from 'path'

import assert from '@useweb/assert'

import copyFile from '../../../../../devtools/utils/node/copyFile/copyFile.js'
import type { CloneThisProjectContextSchema } from '../../CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'
import createFile from '../../../../../devtools/utils/node/createFile.js'
import removeFolder from '../../../../../devtools/utils/node/removeFolder.js'

export type CloneThisProjectResetDataFolderProps = {
  cloneThisProjectContext: CloneThisProjectContextSchema
}

export default async function cloneThisProjectResetDataFolder(
  props: CloneThisProjectResetDataFolderProps,
) {
  assert<CloneThisProjectResetDataFolderProps>({
    props,
    requiredProps: ['cloneThisProjectContext'],
  })

  const dataFolderPath = path.join('src', 'data')

  await removeFolder({
    folderPath: path.join(props.cloneThisProjectContext.cloneProjectPath, dataFolderPath),
  })

  // copy data files and folders
  const dataFilesFoldersToCopy: { name: string }[] = [
    { name: 'readme.md' },
    { name: '_root' },
    { name: '_commonSchemas' },
  ]

  await Promise.all(
    dataFilesFoldersToCopy.map(async (fileOrFolder) => {
      const fileOrFolderDir = path.join(process.cwd(), dataFolderPath, fileOrFolder.name)

      const targetDir = path.join(
        props.cloneThisProjectContext.cloneProjectPath,
        dataFolderPath,
        fileOrFolder.name,
      )

      await copyFile({ sourcePath: fileOrFolderDir, targetPath: targetDir })
    }),
  )

  // create data files
  const filesToCreate: { name: string; content: string; nojs?: boolean }[] = [
    {
      name: 'data.index.ts',
      content: `import type { CollectionType } from '../../scripts/dev/handlers/addEmulatorData/handlers/addFirestoreEmulatorDataRaw/addFirestoreEmulatorData.raw.js'

import userStubs from './users/users.stubs.js'


// this files is used to seed emulator firestore data
const dataIndex: CollectionType[] = [
  {
    name: 'users',
    data: userStubs,
  }
]

export default dataIndex

// use when you add a collection stubs but the data is coming from supabase
export const ignoreCollections = []
`,
    },
    // users
    {
      name: 'users/user.schema.ts',
      content: `type UserSchema = {
        id: string
        displayName: string
        email: string
        photoURL: string
        bannerUrl: string | false
        agreedToTOSandPrivacyPolicy: boolean
        lastSignedIn: number
      }
        
      export default UserSchema`,
    },
    {
      name: 'users/users.stubs.ts',
      content: `import { getToday } from '@useweb/date'

import type UserSchema from './user.schema.js'

      const commonProps: UserSchema = {
        id: '1',
        displayName: 'User 1',
        email: 'user1@email.com',
        photoURL: 'https://via.placeholder.com/150',
        bannerUrl: 'https://via.placeholder.com/150',
        agreedToTOSandPrivacyPolicy: true,
        lastSignedIn: getToday(),
      }

      const userStubs: UserSchema[] = [
      {
        ...commonProps
      }
    ]

      export default userStubs
        `,
    },
    {
      name: 'users/users.config.ts',
      content: `export const usersCollectionName = 'users'`,
    },
    {
      name: 'users/ui/readme.md',
      content: `Add your user ui components here`,
      nojs: true,
    },
    {
      name: 'users/utils/useAuth/useAuth.tsx',
      content: `import { signInWithEmailAndPassword } from 'firebase/auth'
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
      props.onSignUp &&
        props.onSignUp({})
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

`,
    },
  ]

  await Promise.all(
    filesToCreate.map(async (file) => {
      const targetDir = path.join(
        props.cloneThisProjectContext.cloneProjectPath,
        dataFolderPath,
        ...file.name.split('/'),
      )

      await createFile({
        filePath: targetDir,
        fileContent: file.content,
        noTimestamp: true,
        nojs: Boolean(file?.nojs),
      })
    }),
  )
}

export type CloneThisProjectResetDataFolderReturn = ReturnType<
  typeof cloneThisProjectResetDataFolder
>
