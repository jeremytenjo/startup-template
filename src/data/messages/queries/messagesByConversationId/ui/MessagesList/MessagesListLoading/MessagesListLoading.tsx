import React from 'react'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
import Skeleton from '@useweb/ui/Skeleton'

import type MessageSchema from '../../../../../message.schema.js'

export type MessagesListLoadingProps = UseDataUiComponentProps<MessageSchema>['loading']

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MessagesListLoading(props: MessagesListLoadingProps) {
  return (
    <Skeleton data-id='MessagesListLoading' loading>
      loading
    </Skeleton>
  )
}
