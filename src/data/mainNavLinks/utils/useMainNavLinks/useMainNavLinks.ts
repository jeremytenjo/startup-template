import { useMemo } from 'react'
import useMediaQuery from '@useweb/ui/useMediaQuery'

import type NavLinkSchema from '../../../_commonSchemas/NavLinkSchema/NavLinkSchema.js'
import useAuth from '../../../users/utils/useAuth/useAuth.js'

export default function useMainNavLinks() {
  const auth = useAuth()
  const mobileMq = useMediaQuery({
    size: 'lg',
    type: 'down',
  })

  const mainNavLinks = useMemo(() => {
    const links: NavLinkSchema[] = []
    const isMobile = mobileMq.matches
    const isDesktop = !isMobile

    if (isMobile) {
      if (auth.user?.id) {
        links.push({
          label: 'Profile',
          url: `/settings/profile`,
        })

        links.push({
          label: 'Settings',
          url: `/settings/edit-profile`,
        })
      }

      links.push({
        label: 'FAQ',
        url: `/faq`,
      })
    }

    if (isDesktop) {
      links.push({
        label: 'Home',
        url: `/`,
      })
    }

    return links
  }, [auth.user?.id, mobileMq.matches])

  const profilePhotoMenuLinks = useMemo(() => {
    const links: NavLinkSchema[] = []

    links.push({
      label: 'Profile',
      url: `/settings/profile`,
    })

    return links
  }, [])

  return { mainNavLinks, profilePhotoMenuLinks }
}

export type UseMainNavLinksReturn = ReturnType<typeof useMainNavLinks>
