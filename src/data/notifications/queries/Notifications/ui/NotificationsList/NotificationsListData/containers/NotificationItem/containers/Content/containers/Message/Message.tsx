import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import useNotificationItemData from '../../../../useNotificationItemData/useNotificationItemData.js'

export type MessageProps = any

export default function Message() {
  const notificationItemData = useNotificationItemData()

  return notificationItemData?.notificationData?.message ? (
    <Wrapper>
      <Text
        text={notificationItemData?.notificationData?.message}
        sx={{
          color: 'neutral.100',
          fontWeight: 400,
          fontSize: [12, 13],
          lineHeight: '19.94318199157715px',
          textAlign: 'left',
          whiteSpace: notificationItemData.notificationData?.multilineBody
            ? 'normal'
            : 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      />
    </Wrapper>
  ) : null
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='Message'
      sx={{
        display: 'grid',
        width: '100%',
        height: 'fit-content',
        borderRadius: '14px',
        gridAutoFlow: 'column',
        gridGap: '10px',
      }}
    >
      {children}
    </Box>
  )
}
