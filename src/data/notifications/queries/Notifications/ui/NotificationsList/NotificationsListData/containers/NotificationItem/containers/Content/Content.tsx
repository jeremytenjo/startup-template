import React from 'react'
import Box from '@useweb/ui/Box'
import Skeleton from '@useweb/ui/Skeleton'
import IconButton from '@useweb/ui/IconButton'

import TrashIcon from '../../../../../../../../../../../lib/components/icons/TrashIcon.js'
import colors from '../../../../../../../../../../../theme/tokens/colors.js'

import Header from './containers/Header/Header.js'
import Message from './containers/Message/Message.js'
import CtAs from './containers/CtAs/CtAs.js'

export type ContentProps = {
  onArchive?: () => any
  loading?: boolean
}

export default function Content(props: ContentProps) {
  return (
    <Box
      data-id='Content'
      sx={{
        display: 'grid',
        alignContent: 'start',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        gridAutoFlow: 'row',
        gridGap: '2px',
        position: 'relative',
      }}
    >
      <Skeleton loading={props.loading}>
        <Header />
      </Skeleton>
      <Skeleton loading={props.loading}>
        <Message />
      </Skeleton>
      <Skeleton loading={props.loading}>
        <CtAs />
      </Skeleton>
      {!props.loading && (
        <IconButton
          name='ArchiveButton'
          onClick={props.onArchive}
          sx={{
            position: 'absolute',
            right: '0',
            top: '-11px',
          }}
        >
          <TrashIcon
            sx={{
              width: '12px',
              '& path': {
                fill: colors.neutral[200],
              },
            }}
          />
        </IconButton>
      )}
    </Box>
  )
}
