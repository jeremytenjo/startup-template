import React from 'react'
import Box from '@useweb/ui/Box'

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
        paddingLeft: '16px',
        paddingRight: '16px',

        '& a': {
          color: 'neutral.200',
          fontWeight: 'bold',
        },
      }}
    >
      <RootFooterLinksList
        title='About'
        links={[{ url: 'privacy policy' }, { url: 'terms of service' }]}
      />
      <RootFooterLinksList
        title='Support'
        links={[
          {
            url: 'FAQ',
            sx: {
              textTransform: 'uppercase',
            },
          },
        ]}
      />
      <RootFooterLinksList
        title='Community'
        links={[
          { url: 'creators', overrideLabel: 'Influencers' },
          { url: 'game-listings' },
        ]}
      />
    </Box>
  )
}
