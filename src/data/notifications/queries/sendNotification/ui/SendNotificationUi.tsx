import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import useSendNotification from '../useSendNotification/useSendNotification.js'

export type SendNotificationUiProps = { name?: string }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SendNotificationUi(props: SendNotificationUiProps) {
  const sendNotification = useSendNotification()

  return (
    <Wrapper>
      <Text text={'SendNotificationUi'} tag='p' sx={{}} />
      <ErrorMessage error={sendNotification.error} message='Error' />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='SendNotificationUi' sx={{}}>
      {children}
    </Box>
  )
}
