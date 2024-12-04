import React from 'react'
import Box from '@useweb/ui/Box'

import useMainNavLinks from '../../../../../../../data/mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'

import RootFooterLinksList from './containers/RootFooterLinksList/RootFooterLinksList.js'

export default function RootFooterLinks() {
  const mainNavLinks = useMainNavLinks()

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
    </Box>
  )
}
