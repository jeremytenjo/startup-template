import React, { createContext, useContext } from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import { type GetRootDataReturn } from '../../../data/_root/getRootData/getRootData.js'
import DefaultHeadTags from '../../components/head/DefaultHeadTags/DefaultHeadTags.js'
import useAuth from '../../../data/users/utils/useAuth/useAuth.js'
import { themeTokens } from '../../../theme/tokens/tokens.js'

import type { RootHeaderProps } from './containers/RootHeader/RootHeader.js'
import RootHeader from './containers/RootHeader/RootHeader.js'
import RootFooter from './containers/RootFooter/RootFooter.js'
import { rootLayoutConfig } from './rootLayout.config.js'

export type RootLayoutProps = GetRootDataReturn

export const RootLayoutContext = createContext<any>(null as any)

export const useRootLayoutData = () => useContext(RootLayoutContext)

type RootLayoutMainProps = {
  title: string | undefined
  description?: string
  useDefaultTitle?: boolean
  disableTitle?: boolean
  children: any
  hideFooter?: boolean
  headerProps?: RootHeaderProps
  sx?: BoxProps['sx']
  authRequiredMessage?: string
}

export default function RootLayout(props: RootLayoutMainProps) {
  const auth = useAuth()

  return (
    <>
      {!props.disableTitle && (
        <DefaultHeadTags
          title={props.useDefaultTitle ? undefined : props.title}
          description={props.description}
        />
      )}
      <RootLayoutContext.Provider value={props}>
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
          {props.authRequiredMessage && auth.isUserSignedOutAfterInitialAuthAttempt ? (
            <ErrorMessage error message={props.authRequiredMessage} />
          ) : (
            props.children
          )}
        </Box>
        {!props.hideFooter && <RootFooter />}
      </RootLayoutContext.Provider>
    </>
  )
}
