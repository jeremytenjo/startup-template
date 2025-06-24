import React from 'react'
import Box from '@useweb/ui/Box'
import { useAppHeaderStore } from '@useweb/ui/AppHeader'
import NavLink from '@useweb/ui/NavLink'

import FullLogoLink from '../../../../../../components/logo/FullLogoLink/FullLogoLink.js'
import useNavLinks from '../../../../../../../data/navLinks/utils/useNavLinks/useNavLinks.js'

export default function MobileHeaderSideMenu() {
  const navLinks = useNavLinks()
  const appHeaderStore = useAppHeaderStore()

  return (
    <Box
      data-id='MobileHeaderSideMenu'
      sx={{
        display: 'grid',
        alignContent: 'start',
        width: 'fit-content',
        gridAutoFlow: 'row',
        gridGap: '15px',
        paddingLeft: '15px',
        paddingRight: '15px',
        minWidth: '215px',
      }}
    >
      <FullLogoLink
        sx={{
          mt: 2,
        }}
        onClick={() => {
          appHeaderStore.setOpenDrawer({ value: false })
        }}
      />

      <Box
        data-id='MobileHeaderNavList'
        sx={{
          width: '100%',
        }}
      >
        {navLinks.mainNavLinks.map((link) => {
          return (
            <NavLink
              key={link.label}
              data-id='MobileHeaderNavLink'
              sx={{
                display: 'grid',
                alignItems: 'center',
                height: '36px',
                paddingTop: '6px',
                paddingBottom: '6px',
              }}
              textSx={{
                fontWeight: '500',
              }}
              href={link.url}
              onClick={() => appHeaderStore.setOpenDrawer({ value: false })}
              label={link.label}
            />
          )
        })}
      </Box>
    </Box>
  )
}
