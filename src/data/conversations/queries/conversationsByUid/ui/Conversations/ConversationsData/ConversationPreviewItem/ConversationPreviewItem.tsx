import React from 'react'
import Avatar from '@useweb/ui/Avatar'
import Link from '@useweb/ui/Link'
import Skeleton from '@useweb/ui/Skeleton'

import { type ConversationPreviewProps } from '../../../../useConversations/useGetConversations/useGetConversations.js'

import DataContainer from './containers/DataContainer/DataContainer.js'

export type ConversationPreviewItemUIProps = {
  conversation?: ConversationPreviewProps
  loading?: boolean
  isActive?: boolean
}

export default function ConversationPreviewItem(props: ConversationPreviewItemUIProps) {
  return <ConversationPreviewItemUI {...props} />
}

function ConversationPreviewItemUI(props: ConversationPreviewItemUIProps) {
  return (
    <Link
      href={`/messages/${props?.conversation?.id}`}
      data-id='ConversationPreviewItem'
      sx={{
        display: 'grid',
        backgroundColor: props.isActive ? 'neutral.600' : 'transparent',
        gridTemplateColumns: 'auto  1fr',
        gridGap: '12px',
        px: '15px',
        py: '10px',
        cursor: 'pointer',
        userSelect: 'none',
        transition: '0.3s',
        alignItems: 'center',
        pointerEvents: props.loading ? 'none' : 'auto',
        '&:hover': {
          backgroundColor: 'neutral.300',
        },
      }}
    >
      <Skeleton
        loading={props.loading}
        circle
        sx={{
          width: '40px',
          height: '40px',
        }}
      >
        <Avatar
          src={props?.conversation?.latestMessage?.otherMember?.profilePhoto?.src}
          alt='avatar'
          sx={{ width: '40px', height: '40px' }}
        />
      </Skeleton>
      <DataContainer {...props} />
    </Link>
  )
}
