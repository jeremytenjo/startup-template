import React, { useState } from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import CopyButton from '@useweb/ui/CopyButton'
import IconButton from '@useweb/ui/IconButton'

import CopyIcon from '../../icons/CopyIcon.js'

export type VerificationCodeCopyProps = {
  code: string
  copied: boolean
  sx?: BoxProps['sx']
  onCopy: () => any
}

export default function VerificationCodeCopy(props: VerificationCodeCopyProps) {
  const [copied, setCopied] = useState(false)

  return (
    <Box
      data-id='VerificationCodeCopy'
      sx={{
        py: '5px',
        pl: '15px',
        pr: '5px',
        backgroundColor: 'neutral.400',
        borderRadius: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '42px',
        border: '1px solid',
        borderColor: 'neutral.300',
        ...props.sx,
      }}
    >
      <Text
        text={props.code}
        tag='p'
        sx={{
          fontWeight: '500',
          fontSize: ['12px', '14px'],
        }}
      />

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {copied && (
          <Text
            text={`copied!`}
            tag='p'
            sx={{
              fontSize: ['12px', '14px'],
              color: 'neutral.150',
              fontWeight: '500',
            }}
          />
        )}

        <CopyButton text={props.code} onCopy={() => setCopied(true)}>
          <IconButton name='copy'>
            <CopyIcon
              sx={{
                fontSize: '18px',
              }}
            />
          </IconButton>
        </CopyButton>
      </Box>
    </Box>
  )
}
