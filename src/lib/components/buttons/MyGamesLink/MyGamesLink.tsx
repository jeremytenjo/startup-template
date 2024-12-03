import React from 'react'
import type { LinkProps } from '@useweb/ui/Link'
import Link from '@useweb/ui/Link'
import type { ButtonProps } from '@useweb/ui/Button'
import Button from '@useweb/ui/Button'

export type MyGamesLinkProps = {
  linkProps?: Partial<LinkProps>
  buttonProps?: Partial<ButtonProps>
}

export const myGamesLink = '/my-games'

export default function MyGamesLink(props: MyGamesLinkProps) {
  return (
    <Link {...(props.linkProps || {})} href={myGamesLink}>
      <Button name='My Games' variant='white' sx={{}} {...(props.buttonProps || {})}>
        My Games
      </Button>
    </Link>
  )
}
