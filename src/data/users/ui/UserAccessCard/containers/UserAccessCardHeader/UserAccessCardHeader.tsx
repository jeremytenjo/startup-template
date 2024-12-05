import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import LogoIcon from '../../../../../../lib/components/icons/LogoIcon.js'
import appConfig from '../../../../../../../app.config.js'
import { LinkTabsList } from '../../../../../../lib/components/navigation/LinkTabs/LinkTabs.js'
import { allNavLinks } from '../../../../../mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'

export type UserAccessCardHeaderProps = {
  title?: string
  subTitle?: string
}

export default function UserAccessCardHeader(props: UserAccessCardHeaderProps) {
  const title = props.title || `Enter the ${appConfig.siteInfo.name} platform`
  const subTitle = props.subTitle || `Welcome! Please enter your details`

  return (
    <Box data-id='UserAccessCardHeader' sx={{}}>
      <Box data-id='UserAccessCardTop' sx={{}}>
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
    </Box>
  )
}
