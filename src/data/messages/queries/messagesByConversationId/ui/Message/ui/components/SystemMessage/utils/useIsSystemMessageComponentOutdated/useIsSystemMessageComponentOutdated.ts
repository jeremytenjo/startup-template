import { useMemo } from 'react'

import type { MessageUiProps } from '../../../../MessageUi.js'
import type MessageSchema from '../../../../../../../../../message.schema.js'

export type UseIsSystemMessageComponentOutdatedProps = {
  componentName: keyof Required<
    Required<MessageSchema>['systemMessageProps']
  >['components']
  allConversationMessages: MessageUiProps['allConversationMessages']
  messageIndex: MessageUiProps['messageIndex']
}

export default function useIsSystemMessageComponentOutdated(
  props: UseIsSystemMessageComponentOutdatedProps,
) {
  const isOutdated = useMemo(() => {
    const newerMessages = props.allConversationMessages?.slice(props.messageIndex + 1)

    const isOutdated = newerMessages.some((m) =>
      Boolean(m.systemMessageProps?.components?.[props.componentName]),
    )

    return isOutdated
  }, [props.allConversationMessages, props.messageIndex])

  return { isOutdated }
}

export type UseIsSystemMessageComponentOutdatedReturn = ReturnType<
  typeof useIsSystemMessageComponentOutdated
>
