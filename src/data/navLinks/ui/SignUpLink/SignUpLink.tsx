import React from 'react'
import Button from '@useweb/ui/Button'
import NavLink from '@useweb/ui/NavLink'
import type { BoxProps } from '@useweb/ui/Box'

import { navLinks } from '../../utils/useNavLinks/useNavLinks.js'

export type SignUpLinkProps = { sx?: BoxProps['sx'] }

export default function SignUpLink(props: SignUpLinkProps) {
  return (
    <NavLink
      href={navLinks.access.signUp.url}
      data-id='SignUpLink'
      label={
        <Button name='SignUpLink' variant='green' sx={{}}>
          Join Startup
        </Button>
      }
      sx={{
        ...props.sx,
      }}
    />
  )
}
