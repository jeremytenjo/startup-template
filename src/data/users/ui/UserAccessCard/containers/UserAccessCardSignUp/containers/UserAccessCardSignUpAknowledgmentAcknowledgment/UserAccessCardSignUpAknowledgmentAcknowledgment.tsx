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
      <Text
        text={`By continuing with an account, you agree to our `}
        tag='span'
        sx={{
          color: 'neutral.150',
        }}
      />

      <Link href={allNavLinks.tos.url} newTab>
        <Text
          text={`Terms of Service `}
          tag='span'
          sx={{
            fontWeight: '700',
          }}
        />
      </Link>

      <Text
        text={`and acknowledge that you have read our `}
        tag='span'
        sx={{
          color: 'neutral.150',
        }}
      />

      <Link href={allNavLinks.privacyPolicy.url} newTab>
        <Text
          text={`Privacy Policy.`}
          tag='span'
          sx={{
            fontWeight: '700',
          }}
        />
      </Link>
    </Box>
  )
}
