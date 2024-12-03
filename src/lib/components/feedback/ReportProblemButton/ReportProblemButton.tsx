import React from 'react'
import Text from '@useweb/ui/Text'
import type { ButtonProps } from '@useweb/ui/Button'
import Button from '@useweb/ui/Button'
import type { BoxProps } from '@useweb/ui/Box'
import Link from '@useweb/ui/Link'

import { discordConfig } from '../../../integrations/Discord/discord.config.js'

export type ReportProblemButtonProps = {
  sx?: BoxProps['sx']
  buttonProps?: Partial<ButtonProps>
  label?: string
}

export default function ReportProblemButton(props: ReportProblemButtonProps) {
  return (
    <Link
      href={discordConfig.ticketSystemUrl}
      newTab
      sx={{
        width: 'fit-content',
        ...props.sx,
      }}
    >
      <Button name='ReportProblemButton' variant='outlined' {...props.buttonProps}>
        <Text text={props.label || 'Report a Problem'} tag='p' sx={{}} />
      </Button>
    </Link>
  )
}
