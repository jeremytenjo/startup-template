import React from 'react'
import Box from '@useweb/ui/Box'

import RootFooterLinksListHeader from './containers/RootFooterLinksListHeader/RootFooterLinksListHeader.js'
import type { RootFooterLinksListContentProps } from './containers/RootFooterLinksListContent/RootFooterLinksListContent.js'
import RootFooterLinksListContent from './containers/RootFooterLinksListContent/RootFooterLinksListContent.js'

type RootFooterLinksListProps = {
  title: string
} & RootFooterLinksListContentProps

export default function RootFooterLinksList(props: RootFooterLinksListProps) {
  return (
    <Box
      data-id='RootFooterLinksList'
      sx={{
        display: 'grid',
        alignContent: 'start',
        gridAutoFlow: 'row',
        gridGap: '15px',
        paddingBottom: '40px',
      }}
    >
      <RootFooterLinksListHeader title={props.title} />
      <RootFooterLinksListContent links={props.links} linkPrefix={props.linkPrefix} />
    </Box>
  )
}
