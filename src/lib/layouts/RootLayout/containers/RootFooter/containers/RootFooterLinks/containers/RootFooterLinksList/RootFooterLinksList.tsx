import React from 'react'
import Box from '@useweb/ui/Box'

import Header from './containers/Header/Header.js'
import type { ContentProps } from './containers/Content/Content.js'
import Content from './containers/Content/Content.js'

type RootFooterLinksListProps = {
  title: string
} & ContentProps

export default function RootFooterLinksList(props: RootFooterLinksListProps) {
  return (
    <Box
      data-id='RootFooterLinksList'
      sx={{
        display: 'grid',
        alignContent: 'start',
        gridAutoFlow: 'row',
        gridGap: '19.390625px',
        paddingBottom: '40px',
      }}
    >
      <Header title={props.title} />
      <Content links={props.links} linkPrefix={props.linkPrefix} />
    </Box>
  )
}
