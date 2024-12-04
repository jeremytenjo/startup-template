// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useMemo } from 'react'
import useMediaQuery from '@useweb/ui/useMediaQuery'

import type NavLinkSchema from '../../../_commonSchemas/NavLinkSchema/NavLinkSchema.js'
import useAuth from '../../../users/utils/useAuth/useAuth.js'
import DiscordIcon from '../../../../lib/components/icons/DiscordIcon.js'
import appConfig from '../../../../../app.config.js'

const rawLinks = {
  home: {
    label: 'Home',
    url: `/`,
  } satisfies NavLinkSchema,

  faq: {
    label: 'FAQ',
    url: `/faq`,
  } satisfies NavLinkSchema,

  tos: {
    label: 'Terms of Service',
    url: `/terms-of-service`,
  } satisfies NavLinkSchema,

  privacyPolicy: {
    label: 'Privacy Policy',
    url: `/privacy-policy`,
  } satisfies NavLinkSchema,

  settings: {
    settings: {
      label: 'Settings',
      url: `/settings/edit-profile`,
    } satisfies NavLinkSchema,
    account: {
      label: 'Account',
      url: `/settings/account`,
    } satisfies NavLinkSchema,
  },

  socialLinks: {
    discord: {
      label: 'Discord',
      url: appConfig.socialLinks.discord.link,
      icon: DiscordIcon,
    } satisfies NavLinkSchema,
  },
}

export default function useMainNavLinks() {
  const auth = useAuth()
  const mobileMq = useMediaQuery({
    size: 'lg',
    type: 'down',
  })
  const profileLink: NavLinkSchema = {
    label: 'Profile',
    url: `/profile/${auth.user?.id}`,
  }

  // Main navigation links
  const mainNavLinks = useMemo(() => {
    const links: NavLinkSchema[] = []
    const isMobile = mobileMq.matches
    const isDesktop = !isMobile

    if (isMobile) {
      if (auth.user?.id) {
        links.push(profileLink)
        links.push(rawLinks.settings.settings)
      }

      links.push(rawLinks.faq)
    }

    if (isDesktop) {
      links.push(rawLinks.home)
    }

    return links
  }, [auth.user?.id, mobileMq.matches])

  // Profile photo menu links
  const profilePhotoMenuLinks = useMemo(() => {
    const links: NavLinkSchema[] = []

    links.push(profileLink)

    return links
  }, [])

  // Social links
  const socialLinks = useMemo(() => {
    const links: NavLinkSchema[] = [rawLinks.socialLinks.discord]

    return links
  }, [])

  return { mainNavLinks, profilePhotoMenuLinks, socialLinks }
}

export type UseMainNavLinksReturn = ReturnType<typeof useMainNavLinks>
