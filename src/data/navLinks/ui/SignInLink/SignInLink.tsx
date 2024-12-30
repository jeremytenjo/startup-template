import React from 'react'
import Button from '@useweb/ui/Button'
import NavLink from '@useweb/ui/NavLink'
import type { BoxProps } from '@useweb/ui/Box'

import { navLinks } from '../../utils/useNavLinks/useNavLinks.js'

export type SignInLinkProps = { sx?: BoxProps['sx'] }

export default function SignInLink(props: SignInLinkProps) {
  return (
    <NavLink
      href={navLinks.access.signIn.url}
      data-id='SignInLink'
      label={
        <Button name='SignInLink' variant='white' sx={{}}>
          Sign In
        </Button>
      }
      sx={{
        ...props.sx,
      }}
    />
  )
}
