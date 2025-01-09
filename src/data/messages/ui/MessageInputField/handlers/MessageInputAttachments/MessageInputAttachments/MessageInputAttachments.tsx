import React from 'react'
import Box from '@useweb/ui/Box'

import type { UseMessageInputAttachmentsProps } from '../useMessageInputAttachments/useMessageInputAttachments.js'
import useMessageInputAttachments from '../useMessageInputAttachments/useMessageInputAttachments.js'
import FileAttachment from '../../../../../../../data/messages/queries/messagesByConversationId/ui/_common/FileAttachment/FileAttachment.js'
import ImageAttachment from '../../../../../../../data/messages/queries/messagesByConversationId/ui/_common/ImageAttachment/ImageAttachment.js'
import { scrollbarStyles } from '../../../MessageInputField.js'

export default function MessageInputAttachments(props: {
  attachmentsProps: UseMessageInputAttachmentsProps
}) {
  const messageInputAtachments = useMessageInputAttachments(props.attachmentsProps)

  return props.attachmentsProps.rawAttachments.length ? (
    <Box
      component={'ul'}
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        gap: 2,
        justifyContent: 'start',
        overflowY: 'hidden',
        overflowX: 'scroll',
        // add height to prevent shrining bug
        height: '134px',
        pt: 2,
        pb: '7px',
        ...scrollbarStyles,
      }}
    >
      {props.attachmentsProps.rawAttachments.map((itemData) => {
        const isImage = itemData.file.type?.includes('image/')

        if (isImage)
          return (
            <li key={itemData.id}>
              <ImageAttachment
                onRemove={() =>
                  messageInputAtachments.removeAttachment({ id: itemData.id })
                }
                src={URL.createObjectURL(itemData.file)}
                alt={itemData.file.name}
              />
            </li>
          )

        return (
          <li key={itemData.id}>
            <FileAttachment
              fileType={itemData.file.type}
              fileName={itemData.file.name}
              onRemove={() =>
                messageInputAtachments.removeAttachment({ id: itemData.id })
              }
            />
          </li>
        )
      })}
    </Box>
  ) : null
}
