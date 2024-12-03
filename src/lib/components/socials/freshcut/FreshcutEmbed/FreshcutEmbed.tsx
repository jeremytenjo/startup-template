import React, { useMemo } from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import ErrorMessage from '@useweb/ui/ErrorMessage'

export type FreshcutEmbedProps = { url: string; sx?: BoxProps['sx'] }

const invalidErrorMessage = 'Invalid URL. Example https://freshcut.gg/post/videoid'

export default function FreshcutEmbed(props: FreshcutEmbedProps) {
  const validUrl = useMemo(() => {
    const { isValid } = validateFreshcutUrl({
      url: props.url,
    })

    return {
      isValid,
    }
  }, [props.url])

  if (!validUrl.isValid) {
    return <ErrorMessage error={invalidErrorMessage} message={invalidErrorMessage} />
  }

  return (
    <Box
      data-id='FreshcutEmbed'
      sx={{
        '*': {
          borderRadius: '10px',
        },
        iframe: {
          height: '400px',
        },
      }}
    >
      <iframe src={props.url} loading='lazy' />
    </Box>
  )
}

export function validateFreshcutUrl(props: { url: string }) {
  const regex = /^https:\/\/freshcut.gg\/post\/[a-zA-Z0-9_-]+$/

  const isValid = regex.test(props.url)

  return {
    isValid,
    invalidErrorMessage,
  }
}
