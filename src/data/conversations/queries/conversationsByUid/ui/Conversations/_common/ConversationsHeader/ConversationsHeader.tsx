import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

export default function ConversationsHeader() {
  return (
    <Box
      data-id='ConversationsHeader'
      sx={{
        display: 'flex',
        height: ['50px', '50px', '60px'],
        alignItems: 'center',
        px: '15px',
        mt: ['10px', , '0'],
      }}
    >
      <Text
        tag='h2'
        text={`Messages`}
        sx={{
          fontWeight: '600',
          fontSize: ['21px', , '18px'],
          color: 'neutral.100',
        }}
      />
    </Box>
  )
}
