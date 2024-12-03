import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Skeleton from '@useweb/ui/Skeleton'
import { capitalCase } from 'change-case'

import { buttonVariantSmallStyles } from '../../useweb/Button/Button.defaults.js'
import AgoText from '../../data/AgoText/AgoText.js'
import type DateSchema from '../../../../data/_commonSchemas/DateSchema/date.schema.js'

export type StatusColumnProps<NotificationSchema> = {
  itemStatus: string | undefined
  itemStatuses: object | undefined
  itemStatusArray: any[]
  itemId: string | undefined
  loading: boolean | undefined
  notifications: NotificationSchema[]
}

export default function StatusColumn<
  NotificationSchema extends {
    sentDate: DateSchema
  },
>(props: StatusColumnProps<NotificationSchema>) {
  const dataStatus = props.itemStatus || ''

  const label = props.itemStatusArray.find((s) => s.status === dataStatus)?.status || ''

  const dataData = props.itemStatuses?.[dataStatus]
  const newMessages = props.notifications || []

  return (
    <Skeleton loading={!props.itemId && props.loading}>
      <Box
        data-id='StatusColumn'
        sx={{
          display: 'grid',
          gap: '13px',
        }}
      >
        <Box
          sx={{
            ...buttonVariantSmallStyles,
            borderRadius: '100px',
            backgroundColor: dataData?.sx?.backgroundColor,
            border: '1px solid transparent',
            borderColor: dataData?.sx?.borderColor,
            fontWeight: '600',
            textAlign: 'center',
            '&:hover, &:active, &:focus': {
              transform: 'none !important',
              backgroundColor: dataData?.sx?.backgroundColor,
            },
          }}
        >
          {capitalCase(label)}
        </Box>

        {Boolean(newMessages?.length) && (
          <Box data-id='New Message' sx={{}}>
            <Box
              data-id='Top'
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: 'semantic.warning.100',
                  marginRight: '5px',
                }}
              />
              <Text
                text={`${newMessages.length} New Message${
                  newMessages.length > 1 ? 's' : ''
                }`}
                tag='p'
                sx={{
                  fontWeight: 'bold',
                }}
              />
            </Box>

            <AgoText date={newMessages?.[0]?.sentDate} />
          </Box>
        )}
      </Box>
    </Skeleton>
  )
}
