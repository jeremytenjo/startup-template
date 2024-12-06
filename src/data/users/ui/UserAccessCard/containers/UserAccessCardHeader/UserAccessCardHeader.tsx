import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Image from '@useweb/ui/Image'

import appConfig from '../../../../../../../app.config.js'
import { LinkTabsList } from '../../../../../../lib/components/navigation/LinkTabs/LinkTabs.js'
import { allNavLinks } from '../../../../../mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'

export type UserAccessCardHeaderProps = {
  title?: string
  subTitle?: string
  message?: string
}

export default function UserAccessCardHeader(props: UserAccessCardHeaderProps) {
  const title = props.title || `Enter the ${appConfig.siteInfo.name} platform`
  const subTitle = props.subTitle || `Welcome! Please enter your details`

  return (
    <Box
      data-id='UserAccessCardHeader'
      sx={{
        mb: '50px',
        width: '100%',
      }}
    >
      <Box
        data-id='UserAccessCardTop'
        sx={{
          display: 'grid',
          justifyItems: 'center',
          gap: 2,
          mb: '50px',
        }}
      >
        <Image
          src={`/images/logo/logo.svg`}
          alt={`alt`}
          width={300}
          height={300}
          sx={{
            width: ['40px', '50px'],
            height: ['40px', '50px'],
            mb: [1, 2],
          }}
        />

        <Text
          text={title}
          tag='p'
          sx={{
            color: 'neutral.100',
            fontWeight: 600,
            fontSize: 23,
            lineHeight: '32px',
            textAlign: 'center',
            justifySelf: 'center',
          }}
        />

        <Text
          text={subTitle}
          tag='p'
          sx={{
            color: 'neutral.200',
            fontWeight: 500,
            fontSize: '14px',
            textAlign: 'center',
            mt: '-5px',
          }}
        />

        {props.message && (
          <Text
            text={props.message}
            sx={{
              color: 'neutral.100',
              fontWeight: 400,
              fontSize: 14,
              textAlign: 'left',
              mt: 2,
            }}
          />
        )}
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
          borderRadius: '8px',
          borderColor: 'neutral.300',
          color: 'neutral.200',

          '& [data-id="LinkTab"]': {
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: 'none',

            '&:hover': {
              backgroundColor: 'transparent',
            },

            '&[data-is-active="true"]': {
              border: '2px solid',
              borderColor: 'neutral.300',
              borderRadius: '8px',
              backgroundColor: 'neutral.350',
              color: 'neutral.100',
            },
          },
        }}
      />
    </Box>
  )
}
