import React from 'react'
import Box from '@useweb/ui/Box'

import useMainNavLinks, {
  allNavLinks,
} from '../../../../../../../data/mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'
import colors from '../../../../../../../theme/tokens/colors.js'

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

      <RootFooterLinksList
        title='Connect'
        links={mainNavLinks.socialLinks.map((link) => {
          return {
            url: link.url,
            label: link.label,
            newTab: true,
            component: (
              <link.icon
                sx={{
                  width: '21px',
                  '& path': { fill: colors.neutral[200] },
                }}
              />
            ),
          }
        })}
      />
    </Box>
  )
}
