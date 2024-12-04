import React, { useMemo } from 'react'
import useMediaQuery from '@useweb/ui/useMediaQuery'

import type NavLinkSchema from '../../../_commonSchemas/NavLinkSchema/NavLinkSchema.js'
import useAuth from '../../../users/utils/useAuth/useAuth.js'
import DiscordIcon from '../../../../lib/components/icons/DiscordIcon.js'

export default function useMainNavLinks() {
  const auth = useAuth()
  const mobileMq = useMediaQuery({
    size: 'lg',
    type: 'down',
  })

  // Main navigation links
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

  // Profile photo menu links
  const profilePhotoMenuLinks = useMemo(() => {
    const links: NavLinkSchema[] = []

    links.push({
      label: 'Profile',
      url: `/settings/profile`,
    })

    return links
  }, [])

  // Social links
  const socialLinks = useMemo(() => {
    const links: NavLinkSchema[] = [
      {
        label: 'Discord',
        url: 'https://discord.gg/discord',
        icon: DiscordIcon,
      },
    ]

    return links
  }, [])

  return { mainNavLinks, profilePhotoMenuLinks, socialLinks }
}

export type UseMainNavLinksReturn = ReturnType<typeof useMainNavLinks>
