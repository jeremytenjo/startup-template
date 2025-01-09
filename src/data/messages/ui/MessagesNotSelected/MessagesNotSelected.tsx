import React from 'react'
import Box from '@useweb/ui/Box'
import Image from '@useweb/ui/Image'
import Button from '@useweb/ui/Button'
import EmptyMessage from '@useweb/ui/EmptyMessage'

export type MessagesNotSelectedProps = {
  onClick?: (() => any) | undefined
  noConversations?: boolean
}

export default function MessagesNotSelected(props: MessagesNotSelectedProps) {
  return (
    <Box
      data-id='MessagesNotSelected'
      sx={{
        display: 'grid',
        width: 'fit-content',
        alignContent: 'start',
        justifySelf: 'center',
        gridAutoFlow: 'row',
        gridGap: '13px',
        justifyItems: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
    >
      <EmptyMessage
        title={
          props.noConversations ? 'No conversations started' : `Resume where you left off`
        }
        subTitle={`Select a conversation and chat away`}
        icon={
          <Image
            src={`/images/largeIcons/big-messages.svg`}
            alt={`alt`}
            width={200}
            height={200}
          />
        }
        content={
          <>
            {props.noConversations ? null : (
              <Button
                name='open chats'
                onClick={props.onClick || (() => null)}
                sx={{
                  display: ['block', , 'none'],
                  width: 'fit-content',
                  mt: 1,
                }}
              >
                Select conversation
              </Button>
            )}
          </>
        }
      />
    </Box>
  )
}
