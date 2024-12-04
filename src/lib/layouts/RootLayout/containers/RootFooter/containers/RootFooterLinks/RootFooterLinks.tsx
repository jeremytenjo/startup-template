import React from 'react'
import Box from '@useweb/ui/Box'

import { allNavLinks } from '../../../../../../../data/mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'

import RootFooterLinksList from './containers/RootFooterLinksList/RootFooterLinksList.js'

export default function RootFooterLinks() {
  return (
    <Box
      data-id='RootFooterLinks'
      sx={{
        display: 'grid',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        gridAutoFlow: ['row', 'column'],
        gridGap: ['10px', '90px'],
        '& a': {
          color: 'neutral.200',
          fontWeight: 'bold',
        },
      }}
    >
      <RootFooterLinksList
        title='About'
        links={[allNavLinks.privacyPolicy, allNavLinks.tos]}
      />
      <RootFooterLinksList
        title='Support'
        links={[
          {
            ...allNavLinks.faq,
            sx: {
              textTransform: 'uppercase',
            },
          },
        ]}
      />
    </Box>
  )
}
