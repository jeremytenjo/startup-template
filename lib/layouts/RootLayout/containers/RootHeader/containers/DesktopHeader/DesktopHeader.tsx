import React from 'react'
import Box from '@useweb/ui/Box'
import List from '@useweb/ui/List'
import NavLink from '@useweb/ui/NavLink'

import FullLogoLink from '../../../../../../components/logo/FullLogoLink/FullLogoLink.js'
import useNavLinks from '../../../../../../../data/navLinks/utils/useNavLinks/useNavLinks.js'
import type NavLinkSchema from '../../../../../../../data/_commonSchemas/NavLinkSchema/NavLinkSchema.js'
import { themeTokens } from '../../../../../../integrations/Useweb/theme/tokens/tokens.js'

export default function DesktopHeader() {
  const navLinks = useNavLinks()

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
          maxWidth: themeTokens.maxWidth[2],
        }}
      >
        <Box
          data-id='DesktopHeaderContentLeft'
          sx={{
            display: 'grid',
            gap: '50px',
            alignItems: 'center',
            gridAutoFlow: 'column',
          }}
        >
          <FullLogoLink
            sx={{
              transform: 'translateY(-2px)',
            }}
          />
          <Box data-id='DesktopRooHeaderNavlinks' sx={{}}>
            <List<NavLinkSchema>
              listItemKeyName='label'
              data={navLinks?.mainNavLinks || []}
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

        <Box
          data-id='DesktopHeaderContentRight'
          sx={{
            display: 'grid',
            gap: '10px',
            alignItems: 'center',
            gridAutoFlow: 'column',
          }}
        >
          <NavLink
            href={navLinks.navLinks.access.signIn?.url}
            label={navLinks.navLinks.access.signIn?.label}
            sx={{
              '& p': {
                fontSize: '16px',
              },
            }}
          />
        </Box>
      </Box>
    </>
  )
}
