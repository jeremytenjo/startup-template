import { useRouter } from 'next/router'
import { useMemo } from 'react'

export default function useIsAccessPage() {
  const router = useRouter()

  const isAccessPage = useMemo(() => {
    return router.pathname.includes('/access/')
  }, [router.pathname])

  return { isAccessPage }
}

export type UseIsAccessPageReturn = ReturnType<typeof useIsAccessPage>
