import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import ChatImagePreviewIcon from '../../../../../../../lib/components/icons/ChatImagePreviewIcon.js'

export type FileAttachmentProps = {
  fileType: File['type']
  fileName: string
  onRemove?: () => any
}

export default function FileAttachment(props: FileAttachmentProps) {
  const ext = props.fileType.split('/').pop()

  return (
    <Box
      data-id='FileAttachment'
      sx={{
        width: 100,
        height: 100,
        position: 'relative',
        borderRadius: '6px',
        userSelect: 'none',
        backgroundColor: 'primary.light',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 50,
          height: 50,
          backgroundColor: 'primary.light',
          color: 'primary.main',
          borderWidth: '2px',
          borderStyle: 'solid',
          fontSize: '12px',
          borderColor: 'primary.main',
          borderRadius: '100px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
        }}
      >
        {ext}
      </Box>

      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Text
          text={props.fileName}
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            px: 1,
            color: 'neutral.600',
            fontSize: '13px',
            textAlign: 'center',
          }}
        />
      </Box>

      {props.onRemove && (
        <ChatImagePreviewIcon
          onClick={props.onRemove}
          sx={{
            cursor: 'pointer',
            position: 'absolute',
            top: '-10px',
            right: '-10px',
          }}
        />
      )}
    </Box>
  )
}
