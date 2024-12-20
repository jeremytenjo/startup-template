import { useRouter } from 'next/router'

import useAuth from '../../../../data/users/utils/useAuth/useAuth.js'

export default function useIsSignedInUserPage() {
  const auth = useAuth()
  const router = useRouter()

  const isSignedIn = auth.user?.displayName === router.query?.displayName

  return { isSignedIn }
}

export type UseIsSignedInUserPageReturn = ReturnType<typeof useIsSignedInUserPage>
