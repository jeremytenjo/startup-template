import React from 'react'
import Box from '@useweb/ui/Box'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
import List from '@useweb/ui/List'

import type NotificationSchema from '../../../../../notification.schema.js'
import NotificationItem from '../NotificationsListData/containers/NotificationItem/NotificationItem.js'

export type NotificationsListLoadingProps =
  UseDataUiComponentProps<NotificationSchema>['loading']

export default function NotificationsListLoading(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props: NotificationsListLoadingProps,
) {
  const array = Array.from({ length: 4 }).map((_, id) => ({
    id: id.toString(),
  }))

  return (
    <Wrapper>
      <List<any>
        data={array || []}
        ListItemComponent={() => {
          return <NotificationItem loading />
        }}
      />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='NotificationsListLoading' sx={{}}>
      {children}
    </Box>
  )
}
