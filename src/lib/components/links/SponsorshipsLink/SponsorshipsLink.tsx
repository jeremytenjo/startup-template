import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import NavLink from '@useweb/ui/NavLink'

export type SponsorshipsLinkProps = { sx?: BoxProps['sx']; icon?: React.ReactNode }

export default function SponsorshipsLink(props: SponsorshipsLinkProps) {
  return (
    <NavLink
      href={'/sponsorships'}
      label={'Sponsorships'}
      icon={props.icon || null}
      sx={{
        ...(props.sx || {
          '& p': {
            fontSize: ['14px', '16px'],
          },
        }),
      }}
    />
  )
}
