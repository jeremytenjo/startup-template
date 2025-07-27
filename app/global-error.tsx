'use client'
import React from 'react'
import Box from '@useweb/ui/Box'
import Button from '@useweb/ui/Button'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import FullLogoLink from '../lib/components/logo/FullLogoLink/FullLogoLink.js'
import logError from '../lib/utils/loggers/logError/logError.js'

export type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError(props: GlobalErrorProps) {
  React.useEffect(() => {
    if (props.error) {
      logError({
        error: props.error.message,
        fnName: 'GlobalErrorLogger',
        fatal: true,
        metadata: {
          cause: {
            ...props.error,
          },
        },
      })
    }
  }, [props.error])

  return (
    // global-error must include html and body tags
    <html>
      <body>
        <Box
          sx={{
            p: 2,
          }}
        >
          <FullLogoLink
            sx={{
              mb: 2,
            }}
          />

          <ErrorMessage
            error={props.error}
            message='Oops, something went wrong. We&rsquo;re sorry for the inconvenience. Please
        try again later or contact support if the problem persists.'
          />

          <Button
            name='Go back home'
            onClick={() => {
              return props.reset()
            }}
            sx={{ mt: 2, width: 'fit-content' }}
          >
            Go back Home
          </Button>
        </Box>
      </body>
    </html>
  )
}
