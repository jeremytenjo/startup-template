import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import LogoIcon from '../../../../lib/components/icons/LogoIcon.js'
import appConfig from '../../../../../app.config.js'
import CenterIsland from '../../../../lib/layouts/CenterIsland/CenterIsland.js'
import { LinkTabsList } from '../../../../lib/components/navigation/LinkTabs/LinkTabs.js'
import { allNavLinks } from '../../../mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'

export type UserAccessCardProps = {
  type: 'sign-in' | 'sign-up' | 'reset-password'
  title?: string
  subTitle?: string
  sx?: BoxProps['sx']
}

export default function UserAccessCard(props: UserAccessCardProps) {
  const title = props.title || `Enter the ${appConfig.siteInfo.name} platform`
  const subTitle = props.subTitle || `Welcome! Please enter your details`

  return (
    <CenterIsland
      data-id='UserAccessCard'
      parentSx={{
        backgroundColor: 'transparent',
        border: 'none',
        mt: 0,
      }}
      sx={{
        backgroundColor: 'transparent',
        border: 'none',
        maxWidth: '400px',
        pt: 0,
        px: [1, 2],
        ...props.sx,
      }}
    >
      <Box data-id='UserAccessCardHeader' sx={{}}>
        <LogoIcon
          sx={{
            width: '50px',
          }}
        />
        <Text text={title} tag='p' sx={{}} />
        <Text text={subTitle} tag='p' sx={{}} />
      </Box>

      <LinkTabsList
        data-id='UserAccessCardTabs'
        urlBase=''
        links={[
          {
            label: 'Sign Up',
            hrefOverride: allNavLinks.access.signUp?.url,
            isActiveFn(p) {
              const isActive = p.pathname === allNavLinks.access.signUp?.url
              return {
                isActive,
              }
            },
          },
          {
            label: 'Sign In',
            hrefOverride: allNavLinks.access.signIn?.url,
            isActiveFn(p) {
              const isActive = p.pathname === allNavLinks.access.signIn?.url
              return {
                isActive,
              }
            },
          },
        ]}
        sx={{
          width: '100%',
          gridTemplateColumns: '1fr 1fr',
          borderRadius: '0',
          border: 'none',
          '& *': {
            borderRadius: '0 !important',
          },

          '& [data-id="LinkTab"]': {
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: 'none',

            '&:hover': {
              backgroundColor: 'transparent',
            },

            '&[data-is-active="true"]': {
              borderBottom: '2px solid',
              borderBottomColor: 'primary.main',
            },
          },
        }}
      />
    </CenterIsland>
  )
}
