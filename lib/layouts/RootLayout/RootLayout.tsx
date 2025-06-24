'use client'
import React from 'react'
import Box from '@useweb/ui/Box'

import { themeTokens } from '../../integrations/Useweb/theme/tokens/tokens.js'

import RootHeader from './containers/RootHeader/RootHeader.js'
import RootFooter from './containers/RootFooter/RootFooter.js'
import { rootLayoutConfig } from './rootLayout.config.js'

type RootLayoutMainProps = {
  children: any
}

export default function RootLayout(props: RootLayoutMainProps) {
  return (
    <>
      <RootHeader />
      <Box
        data-id='RootLayout'
        component={'main'}
        sx={{
          p: '15px',
          pt: [`calc(${rootLayoutConfig.mobileHeaderHeight} + 10px)`, , '20px'],
          position: 'relative',
          maxWidth: themeTokens.maxWidth[1],
          mx: 'auto',
        }}
      >
        {props.children}
      </Box>
      <RootFooter />
    </>
  )
}
