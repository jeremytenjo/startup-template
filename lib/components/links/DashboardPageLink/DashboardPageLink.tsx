import React from 'react'
import NavLink from '@useweb/ui/NavLink'
import type { BoxProps } from '@useweb/ui/Box'

export type DashboardPageLinkProps = { sx?: BoxProps['sx']; icon?: React.ReactNode }

export default function DashboardPageLink(props: DashboardPageLinkProps) {
  return (
    <NavLink
      href={'/dashboard'}
      label={'Dashboard'}
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
