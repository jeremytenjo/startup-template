import React from 'react'
import Box from '@useweb/ui/Box'
import Image from '@useweb/ui/Image'

import ChatImagePreviewIcon from '../../../../../../../lib/components/icons/ChatImagePreviewIcon.js'

export type ImageAttachmentProps = { src: string; alt: string; onRemove?: () => any }

export default function ImageAttachment(props: ImageAttachmentProps) {
  const isSvg = props.src.includes('.svg')

  return (
    <Box
      data-id='ImageAttachment'
      sx={{
        width: 100,
        height: 100,
        position: 'relative',
        borderRadius: '6px',
        userSelect: 'none',
      }}
    >
      <Image
        src={props.src}
        alt={props.alt}
        width={300}
        height={300}
        unoptimized={isSvg}
        sx={{
          objectFit: 'cover',
          borderRadius: '6px',
          width: 100,
          height: 100,
        }}
      />

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
