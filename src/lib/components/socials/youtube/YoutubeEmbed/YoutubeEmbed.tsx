import React, { useMemo } from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import ReactPlayer from 'react-player'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import validateYoutubeUrl, {
  invalidErrorMessage,
  youtubeShortErrorMessage,
} from './utils/validateYoutubeUrl/validateYoutubeUrl.js'

export type YoutubeEmbedProps = {
  url: string
  sx?: BoxProps['sx']
  isYoutubeShort: boolean
}

export default function YoutubeEmbed(props: YoutubeEmbedProps) {
  const errorMessage = !props.isYoutubeShort
    ? invalidErrorMessage
    : youtubeShortErrorMessage

  const validUrl = useMemo(() => {
    const { isValid } = validateYoutubeUrl({
      url: props.url,
      isYoutubeShort: props.isYoutubeShort,
    })

    return {
      isValid,
    }
  }, [props.url])

  if (!validUrl.isValid) {
    return <ErrorMessage error={errorMessage} message={errorMessage} />
  }

  return (
    <Box
      data-id='YoutubeEmbed'
      sx={{
        position: 'relative',
        aspectRatio: '2/1',
        maxWidth: '600px',
        '*': {
          borderRadius: '10px',
        },
        ...(props.sx || {}),
      }}
    >
      <ReactPlayer url={props.url} width='100%' height='100%' />
    </Box>
  )
}
