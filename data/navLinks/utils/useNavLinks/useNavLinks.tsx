import { useMemo } from 'react'
import useMediaQuery from '@useweb/ui/useMediaQuery'

import type NavLinkSchema from '../../NavLink.schema.js'
import { navLinks } from '../../navLinks.js'

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
