import React from 'react'
import Link from '@useweb/ui/Link'
import type { ButtonProps } from '@useweb/ui/Button'
import Button from '@useweb/ui/Button'

export type RobloxGameLinkProps = {
  placeId: number | undefined
  label?: string
  sx?: ButtonProps['sx']
}

export default function RobloxGameLink(props: RobloxGameLinkProps) {
  return (
    <Link
      ata-id='RobloxGameLink'
      href={`https://www.roblox.com/games/${props.placeId}`}
      newTab
      sx={{
        ...props.sx,
      }}
    >
      <Button name={props.label || 'Play'} sx={{}} variant='outlined'>
        {props.label || 'Play'}
      </Button>
    </Link>
  )
}
