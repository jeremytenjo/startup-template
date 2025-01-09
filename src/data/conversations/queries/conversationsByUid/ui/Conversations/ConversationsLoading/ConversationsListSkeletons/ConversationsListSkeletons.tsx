import React from 'react'
import Box from '@useweb/ui/Box'
import List from '@useweb/ui/List'

import ConversationPreviewItem from '../../ConversationsData/ConversationPreviewItem/ConversationPreviewItem.js'

export default function ConversationsListSkeletons() {
  const arrayfrom = Array.from({ length: 10 }).map((_, id) => ({
    id: id.toString(),
  }))

  return (
    <Box
      data-id='ConversationsListSkeletons'
      sx={{
        width: '100%',
      }}
    >
      <List<any>
        sx={{
          width: '100%',
        }}
        data={arrayfrom || []}
        ListItemComponent={() => {
          return <ConversationPreviewItem loading />
        }}
      />
    </Box>
  )
}
