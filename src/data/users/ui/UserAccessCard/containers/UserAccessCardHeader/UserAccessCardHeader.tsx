import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Image from '@useweb/ui/Image'

import appConfig from '../../../../../../../app.config.js'

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
        mb: '30px',
        width: '100%',
      }}
    >
      <Box
        data-id='UserAccessCardTop'
        sx={{
          display: 'grid',
          justifyItems: 'center',
          gap: 2,
          mb: 2,
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
    </Box>
  )
}
