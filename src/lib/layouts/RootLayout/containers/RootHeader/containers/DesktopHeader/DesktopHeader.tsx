import React from 'react'
import Box from '@useweb/ui/Box'
import List from '@useweb/ui/List'
import NavLink from '@useweb/ui/NavLink'
import Link from '@useweb/ui/Link'
import Avatar from '@useweb/ui/Avatar'

import { otherTokens } from '../../../../../../../theme/tokens/otherTokens.js'
import FullLogoLink from '../../../../../../components/logo/FullLogoLink/FullLogoLink.js'
import useMainNavLinks from '../../../../../../../data/mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'
import type NavLinkSchema from '../../../../../../../data/_commonSchemas/NavLinkSchema/NavLinkSchema.js'
import useAuth from '../../../../../../../data/users/utils/useAuth/useAuth.js'

export default function DesktopHeader() {
  const mainNavLinks = useMainNavLinks()
  const auth = useAuth()

  return (
    <>
      <Box
        data-id='DesktopHeaderContent'
        sx={{
          display: 'grid',
          height: '69px',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          gridAutoFlow: 'column',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between',
          paddingTop: '0px',
          paddingBottom: '0px',
          width: '100%',
          margin: '0 auto',
          maxWidth: otherTokens.maxWidth[2],
        }}
      >
        <Box data-id='DesktopHeaderContentLeft' sx={{}}>
          <FullLogoLink />
          <Box data-id='DesktopRooHeaderNavlinks' sx={{}}>
            <List<NavLinkSchema>
              listItemKeyName='label'
              data={mainNavLinks?.mainNavLinks || []}
              ListItemComponent={({ itemData: navLink }) => {
                return <NavLink label={navLink.label} href={navLink.url} />
              }}
              sx={{
                gridAutoFlow: 'column',
                gridGap: '21px',
                '& p': {
                  fontSize: '16px',
                },
              }}
            />
          </Box>
        </Box>

        <Box data-id='DesktopHeaderContentRIght' sx={{}}>
          <Link
            href={`/settings/profile`}
            sx={{
              ml: '8px',
            }}
          >
            <Avatar
              src={auth.user?.photoURL}
              alt={auth.user?.displayName}
              sx={{
                justifySelf: 'start',
                width: '35px',
                height: '35px',
                mr: '8px',
                borderRadius: '12px',
              }}
            />
          </Link>
        </Box>
      </Box>
    </>
  )
}
