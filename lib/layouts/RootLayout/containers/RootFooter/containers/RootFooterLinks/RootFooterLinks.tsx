import React from 'react'
import Box from '@useweb/ui/Box'

import useNavLinks from '../../../../../../../data/navLinks/utils/useNavLinks/useNavLinks.js'

import RootFooterLinksList from './containers/RootFooterLinksList/RootFooterLinksList.js'

export default function RootFooterLinks() {
  const navLinks = useNavLinks()

  return (
    <Box
      data-id='RootFooterLinks'
      sx={{
        display: 'grid',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        gridAutoFlow: ['row', 'column'],
        gridGap: ['10px', '90px'],
        '& a': {
          fontWeight: 'bold',
        },
      }}
    >
      <RootFooterLinksList
        title='About'
        links={[navLinks.navLinks.privacyPolicy, navLinks.navLinks.tos]}
      />

      <RootFooterLinksList
        title='Support'
        links={[
          {
            ...navLinks.navLinks.faq,
            sx: {
              textTransform: 'uppercase',
            },
          },
        ]}
      />

      <RootFooterLinksList
        title='Connect'
        links={navLinks.socialLinks.map((link) => {
          return {
            url: link.url,
            label: link.label,
            newTab: true,
          }
        })}
      />
    </Box>
  )
}
