import React from 'react'
import Button from '@useweb/ui/Button'
import Link from '@useweb/ui/Link'
import Box from '@useweb/ui/Box'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import { useDiscordUserAuthStatusFromUrl } from '../../utils/useDiscordUserAuthStatus/useDiscordUserAuthStatus.js'
import { discordConfig } from '../../discord.config.js'

export type DiscordAuthButtonProps = {
  onSuccess: (props: {
    discordUser: ReturnType<
      typeof useDiscordUserAuthStatusFromUrl
    >['result']['discordUser']
  }) => void

  disabled: boolean
  error: any
  errorMessage: string
}

export default function DiscordAuthButton(props: DiscordAuthButtonProps) {
  const disabled = props.disabled

  const getDiscordAuthStatus = useDiscordUserAuthStatusFromUrl({
    disabled,
    onSuccess: ({ discordUser }) => {
      props.onSuccess({ discordUser })
    },
  })

  return (
    <Box
      data-id='DiscordAuthButton'
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        width: '100%',
      }}
    >
      <ErrorMessage error={getDiscordAuthStatus.error} message='Error' />

      <ErrorMessage error={props.error} message={props.errorMessage} />

      <Link
        href={
          process.env.NODE_ENV === 'production'
            ? `https://discord.com/oauth2/authorize?client_id=${discordConfig.clientId}&response_type=token&redirect_uri=https%3A%2F%2Fwww.socialseed.com%2Fsettings%2Fnotifications&scope=identify`
            : `https://discord.com/oauth2/authorize?client_id=${discordConfig.clientId}&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fsettings%2Fnotifications&scope=identify`
        }
        sx={{
          width: '100%',

          ...(disabled && {
            pointerEvents: 'none',
          }),
        }}
      >
        <Button
          name='Connect Discord'
          sx={{
            width: '100%',
          }}
          disabled={disabled}
        >
          Connect Discord Account
        </Button>
      </Link>
    </Box>
  )
}
