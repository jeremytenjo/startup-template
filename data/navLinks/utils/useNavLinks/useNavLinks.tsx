// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useMemo } from 'react'
import useMediaQuery from '@useweb/ui/useMediaQuery'

import type NavLinkSchema from '../../../_commonSchemas/NavLinkSchema/NavLinkSchema.js'
import DiscordIcon from '../../../../lib/components/icons/DiscordIcon.js'

export const navLinks = {
  home: {
    label: 'Home',
    url: `/`,
  } satisfies NavLinkSchema,

  access: {
    signIn: {
      label: 'Sign In',
      url: `/access/sign-in`,
    } satisfies NavLinkSchema,
    signUp: {
      label: 'Sign Up',
      url: `/access/sign-up`,
    } satisfies NavLinkSchema,
    resetPassword: {
      label: 'Reset Password',
      url: `/access/reset-password`,
    } satisfies NavLinkSchema,
  },

  profile: {
    label: 'Profile',
    url: `/user/:displayName`,
  } satisfies NavLinkSchema,

  user: {
    label: 'User',
    url: (p: { displayName: string }) => {return `/user/${p.displayName}`},
  },

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
    billing: {
      label: 'Billing',
      url: `/settings/billing`,
    } satisfies NavLinkSchema,
    security: {
      label: 'Security',
      url: `/settings/security`,
    } satisfies NavLinkSchema,
  },

  socialLinks: {
    discord: {
      label: 'Discord',
      url: 'https://discord.gg/startup-template-one',
      icon: DiscordIcon,
    } satisfies NavLinkSchema,
    mailto: {
      label: 'Mail',
      url: 'mailto:info@startup-template-one.com',
      icon: DiscordIcon,
    } satisfies NavLinkSchema,
  },
}

export default function useNavLinks() {
  const mobileMq = useMediaQuery({
    size: 'lg',
    type: 'down',
  })

  const _navLinks = useMemo(() => {
    return navLinks
  }, [])

  // Main navigation links
  const mainNavLinks = useMemo(() => {
    const links: NavLinkSchema[] = []
    const isMobile = mobileMq.matches
    const isDesktop = !isMobile

    if (isDesktop) {
      links.push(navLinks.home)
    }

    return links
  }, [mobileMq.matches])

  // Profile photo menu links
  const profilePhotoMenuLinks = useMemo(() => {
    const links: NavLinkSchema[] = []
    links.push(navLinks.profile)
    links.push(navLinks.settings.settings)
    return links
  }, [])

  // Social links
  const socialLinks = useMemo(() => {
    const links: NavLinkSchema[] = [navLinks.socialLinks.discord]
    return links
  }, [])

  return { navLinks: _navLinks, mainNavLinks, profilePhotoMenuLinks, socialLinks }
}

export type useNavLinksReturn = ReturnType<typeof useNavLinks>
