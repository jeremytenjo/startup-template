import type SendSystemMessageSchema from '../../SendSystemMessageSchema.js'

export type GetSendSystemMessageTitleAndBodyProps = SendSystemMessageSchema

export default function getSendSystemMessageTitleAndBody(
  props: GetSendSystemMessageTitleAndBodyProps,
) {
  const bodyIsTitle = !props.notificationTitle && props.message.body
  const title = bodyIsTitle ? props.message.body || '' : props.notificationTitle || ''
  const body = bodyIsTitle ? props.message?.moreText || '' : props.message.body || ''

  return { title, body }
}

export type GetSendSystemMessageTitleAndBodyReturn = ReturnType<
  typeof getSendSystemMessageTitleAndBody
>
