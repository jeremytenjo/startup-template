import assert from '@useweb/assert'

import { type RawAttachments } from '../../../../../../../data/messages/message.schema.js'

export type MessageInputAttachmentsProps = any

export type RawAttachmentProps = RawAttachments

type AddAttachmentsProps = {
  files: RawAttachmentProps
}

export type RemoveAttachmentProps = (props: { id: string }) => any

export type MessageInputAttachmentsReturn = {
  addAttachments: (props: AddAttachmentsProps) => any
  removeAttachment: RemoveAttachmentProps
  resetAttachments: () => any
}

export type UseMessageInputAttachmentsProps = {
  rawAttachments: RawAttachmentProps
  setRawAttachments: (props: RawAttachmentProps) => any
}

export default function useMessageInputAttachments(p: UseMessageInputAttachmentsProps) {
  const addAttachments = (props: AddAttachmentsProps) => {
    assert({ props })

    let cAttachments = p.rawAttachments?.slice()

    cAttachments = [...cAttachments, ...props.files]
    p.setRawAttachments(cAttachments)
  }

  const removeAttachment = (props: { id: string }) => {
    assert({ props })

    let cAttachments = p.rawAttachments?.slice()

    cAttachments = cAttachments?.filter((f) => f.id !== props.id)
    p.setRawAttachments(cAttachments)
  }

  const resetAttachments = () => {
    p.setRawAttachments([])
  }

  const returnData: MessageInputAttachmentsReturn = {
    addAttachments,
    removeAttachment,
    resetAttachments,
  }

  return returnData
}
