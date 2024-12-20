import { useRouter } from 'next/router'
import { useUsers } from '@useweb/firebase/useFirebaseAuth'

import useAuth from '../../../../data/users/utils/useAuth/useAuth.js'
import type UserSchema from '../../../../data/users/user.schema.js'

export default function useUserPage() {
  const auth = useAuth()
  const router = useRouter()

  const isSignedIn = auth.user?.displayName === router.query?.displayName

  const userRes = useUsers<UserSchema>({
    id: isSignedIn ? undefined : (router.query?.displayName as string | undefined),
    idIsDisplayName: true,
  })

  const pageUser = isSignedIn ? auth.user : userRes.user

  return { isSignedIn, pageUser }
}

export type UseUserPageReturn = ReturnType<typeof useUserPage>
