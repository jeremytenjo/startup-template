import React from 'react'
import Box from '@useweb/ui/Box'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import type NotificationSchema from '../../../../../notification.schema.js'

export type NotificationsListErrorProps =
  UseDataUiComponentProps<NotificationSchema>['error']

export default function NotificationsListError(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props: NotificationsListErrorProps,
) {
  return (
    <Wrapper>
      <ErrorMessage error={props.error} message='Error loading notifications.' />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='NotificationsListError'
      sx={{
        height: '100%',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      {children}
    </Box>
  )
}
