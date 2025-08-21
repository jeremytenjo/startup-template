import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import { siteInfo } from '../../../../../data/_siteInfo/siteInfo.js'

import RootFooterLinks from './containers/RootFooterLinks/RootFooterLinks.js'

export default function RootFooter() {
  return (
    <Box
      data-id='RootFooter'
      component='footer'
      sx={{
        mt: '50px',
        display: 'grid',
        gap: 2,
        p: '16px',
      }}
    >
      <Box
        data-id='RootFooterInner'
        sx={{
          margin: '0 auto',
          width: ['100%', 'fit-content'],
          display: 'grid',
          gap: 4,
        }}
      >
        <RootFooterLinks />

        <Box
          data-id='RootFooterBottom'
          sx={{
            display: 'grid',
            width: '100%',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          <Text
            text={`© ${new Date().getFullYear()} ${siteInfo.name}. All Rights Reserved.`}
            sx={{
              color: 'neutral.200',
              fontWeight: 400,
              fontSize: 12,
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
