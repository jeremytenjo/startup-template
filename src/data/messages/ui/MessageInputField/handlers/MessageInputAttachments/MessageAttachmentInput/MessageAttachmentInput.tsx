import React from 'react'
import IconButton from '@useweb/ui/IconButton'
import useSnackbar from '@useweb/ui/Snackbar'

import type { UseMessageInputAttachmentsProps } from '../useMessageInputAttachments/useMessageInputAttachments.js'
import useMessageInputAttachments, {
  type RawAttachmentProps,
} from '../useMessageInputAttachments/useMessageInputAttachments.js'
import colors from '../../../../../../../theme/tokens/colors.js'
import AttachFileIcon from '../../../../../../../lib/components/icons/AttachFileIcon.js'

export type MessageAttachmentInputProps = {
  attachmentsProps: UseMessageInputAttachmentsProps
}

export default function MessageAttachmentInput(props: MessageAttachmentInputProps) {
  const snackbar = useSnackbar()
  const messageInputAtachments = useMessageInputAttachments(props.attachmentsProps)

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxAttachementMessage = `Only 5 attachments allowed`

    if (props.attachmentsProps.rawAttachments.length > 4) {
      snackbar.show({
        title: maxAttachementMessage,
        severity: 'error',
      })
      return
    }

    let count = 0
    const filesRaw: File[] = Array.from(e.target.files || [])

    const files: RawAttachmentProps = []

    filesRaw.map((rawFile) => {
      count++

      const totalAttachments = props.attachmentsProps.rawAttachments.length + count
      if (totalAttachments > 5) {
        snackbar.show({
          message: maxAttachementMessage,
          severity: 'error',
        })
        return
      }

      if (count > 5) {
        snackbar.show({
          message: maxAttachementMessage,
          severity: 'error',
        })

        return
      }

      // error out if files include not supported file
      const isInvalidFileType =
        !rawFile.type.includes('image/') &&
        !rawFile.type.includes('video/') &&
        !rawFile.type.includes('application/pdf') &&
        !rawFile.type.includes('application/doc') &&
        !rawFile.type.includes('application/docx') &&
        !rawFile.type.includes('application/txt')

      if (isInvalidFileType) {
        snackbar.show({
          message: `${rawFile.name} failed. ${rawFile.type} is not supported`,
          severity: 'error',
        })
        return
      }

      const bytesToMegaBytes = (bytes) => bytes / (1024 * 1024)
      const isTooBig = bytesToMegaBytes(rawFile.size) > 5

      if (isTooBig) {
        snackbar.show({
          message: `${rawFile.name} failed. File too big. 5mb max.`,
          severity: 'error',
        })
        return
      }

      files.push({
        id: (Date.now() + rawFile.type + rawFile.name).toString(),
        file: rawFile,
      })
    })

    // continue
    messageInputAtachments.addAttachments({ files })
  }

  return (
    <IconButton
      data-id='MessageAttachmentInput'
      name='add icon'
      aria-label='upload picture'
      component={'label'}
      onClick={(e: any) => {
        e.target.value = null
      }}
      sx={{
        bgcolor: 'neutral.300',
      }}
    >
      <input
        hidden
        type='file'
        onChange={onFileInput}
        multiple
        accept='image/*,.pdf,video/*,.doc,.docx,.txt'
      />
      <AttachFileIcon
        sx={{
          width: 16,
          height: 16,
          '& path': {
            fill: colors.neutral[200],
          },
        }}
        viewBox='0 0 7 7'
      />
    </IconButton>
  )
}
