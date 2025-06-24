import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'

import { type GetRootDataReturn } from '../../../data/_root/getRootData/getRootData.js'
import { themeTokens } from '../../../theme/tokens/tokens.js'

import type { RootHeaderProps } from './containers/RootHeader/RootHeader.js'
import RootHeader from './containers/RootHeader/RootHeader.js'
import RootFooter from './containers/RootFooter/RootFooter.js'
import { rootLayoutConfig } from './rootLayout.config.js'

export type RootLayoutProps = GetRootDataReturn

type RootLayoutMainProps = {
  children: any
  hideFooter?: boolean
  headerProps?: RootHeaderProps
  sx?: BoxProps['sx']
}

export default function RootLayout(props: RootLayoutMainProps) {
  return (
    <>
      <RootHeader {...(props.headerProps as any)} />
      <Box
        data-id='RootLayout'
        component={'main'}
        sx={{
          p: '15px',
          pt: [`calc(${rootLayoutConfig.mobileHeaderHeight} + 10px)`, , '20px'],
          position: 'relative',
          maxWidth: themeTokens.maxWidth[1],
          mx: 'auto',
          ...props.sx,
        }}
      >
        {props.children}
      </Box>
      {!props.hideFooter && <RootFooter />}
    </>
  )
}
