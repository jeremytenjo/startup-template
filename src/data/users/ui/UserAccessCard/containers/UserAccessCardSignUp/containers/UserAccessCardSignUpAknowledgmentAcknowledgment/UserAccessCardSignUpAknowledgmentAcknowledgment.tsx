import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Link from '@useweb/ui/Link'

import { allNavLinks } from '../../../../../../../mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'

export type UserAccessCardSignUpAknowledgmentAcknowledgmentProps = { sx?: BoxProps['sx'] }

export default function UserAccessCardSignUpAknowledgmentAcknowledgment(
  props: UserAccessCardSignUpAknowledgmentAcknowledgmentProps,
) {
  return (
    <Box
      data-id='UserAccessCardSignUpAknowledgmentAcknowledgment'
      sx={{
        textAlign: 'center',
        mt: 2,
        ...props.sx,
      }}
    >
      <Text text={`By signing up, you acknowledge our `} tag='span' sx={{}} />

      <Link href={allNavLinks.privacyPolicy.url} newTab>
        <Text
          text={`Privacy Policy `}
          tag='span'
          sx={{
            color: 'primary.light',
          }}
        />
      </Link>

      <Text text={`and agree to your `} tag='span' sx={{}} />

      <Link href={allNavLinks.tos.url} newTab>
        <Text
          text={`Terms of Service.`}
          tag='span'
          sx={{
            color: 'primary.light',
          }}
        />
      </Link>
    </Box>
  )
}
