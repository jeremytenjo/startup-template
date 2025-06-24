import React from 'react'
import AppHeader from '@useweb/ui/AppHeader'
import type { BoxProps } from '@useweb/ui/Box'

import { rootLayoutConfig } from '../../rootLayout.config.js'

import MobileHeader from './containers/MobileHeader/MobileHeader.js'
import MobileHeaderSideMenu from './containers/MobileHeaderSideMenu/MobileHeaderSideMenu.js'
import DesktopHeader from './containers/DesktopHeader/DesktopHeader.js'
import commonHeaderSx from './containers/_common/commonHeaderSx.js'

export default function RootHeader() {
  return (
    <AppHeader
      mobileHeaderProps={{
        content: <MobileHeader />,
        drawerContent: <MobileHeaderSideMenu />,
      }}
      desktopHeaderProps={{
        content: <DesktopHeader />,
      }}
      sx={
        {
          '& [data-id="AppHeaderMobile"]': {
            height: rootLayoutConfig.mobileHeaderHeight,
            ...commonHeaderSx,
          },

          '& [data-id="AppHeaderDesktop"]': {
            height: rootLayoutConfig.desktopHeaderHeight,
            ...commonHeaderSx,
          },
        } as BoxProps['sx']
      }
    />
  )
}
