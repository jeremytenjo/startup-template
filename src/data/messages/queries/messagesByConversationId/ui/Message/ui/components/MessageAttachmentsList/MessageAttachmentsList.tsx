import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Image from '@useweb/ui/Image'
import Dialog from '@useweb/ui/Dialog'

import FileAttachment from '../../../../_common/FileAttachment/FileAttachment.js'
import ImageAttachment from '../../../../_common/ImageAttachment/ImageAttachment.js'
import colors from '../../../../../../../../../theme/tokens/colors.js'
import type MessageSchema from '../../../../../../../message.schema.js'
import { scrollbarStyles } from '../../../../../../../ui/MessageInputField/MessageInputField.js'

export type MessageAttachmentsListProps = {
  attachments: MessageSchema['attachments']
  sx?: BoxProps['sx']
}

export default function MessageAttachmentsList(props: MessageAttachmentsListProps) {
  const [openModal, setOpenModal] = React.useState(false)
  const [modalImage, setModalImage] = React.useState('')
  const modalImageIsSvg = modalImage.includes('.svg')

  if (!props.attachments?.length) {
    return null
  }

  return (
    <>
      <Box
        data-id='MessageAttachmentsList'
        component={'ul'}
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gap: 2,
          borderRadius: '6px',
          justifyContent: 'start',
          overflowX: 'auto',
          overflowY: 'hidden',

          ...scrollbarStyles,
          '&::-webkit-scrollbar-thumb': {
            background: colors.neutral[300],
            borderRadius: '100px',
          },

          ...(props.sx || {}),
        }}
      >
        {props.attachments.map((attachment) => {
          const isImage = attachment.type?.includes('image/')

          return (
            <Box
              component={'li'}
              key={attachment.downloadUrl + Math.random().toString()}
              onClick={(e) => {
                e.stopPropagation()
                if (isImage) {
                  setOpenModal(true)
                  setModalImage(attachment.downloadUrl)
                } else {
                  window.open(attachment.downloadUrl, '_blank')
                }
              }}
              sx={{
                userSelect: 'none',
                cursor: 'pointer',
                mb: '0 !important',
              }}
            >
              {isImage ? (
                <ImageAttachment
                  key={attachment.downloadUrl}
                  src={attachment.downloadUrl}
                  alt={`alt`}
                />
              ) : (
                <FileAttachment fileName={attachment.name} fileType={attachment.type} />
              )}
            </Box>
          )
        })}
      </Box>

      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false)
        }}
        muiDialogProps={{
          sx: {
            '& .MuiPaper-root': {
              backgroundColor: 'transparent',
              width: '100%',
            },
          },
        }}
        wrapperSx={{
          bgcolor: 'transparent',
          p: 0,
          border: 'none',
          '& img': {
            borderRadius: '20px',
            objectFit: 'contain',
            width: '100%',
            maxWidth: '100%',
            backgroundColor: 'neutral.600',
          },
        }}
      >
        <Image
          src={modalImage}
          alt={modalImage}
          width={300}
          height={300}
          unoptimized={modalImageIsSvg}
        />
      </Dialog>
    </>
  )
}
