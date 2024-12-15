import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import FullLogoLink from '../../../../components/logo/FullLogoLink/FullLogoLink.js'
import useIsAccessPage from '../../../../../data/users/utils/useIsAccessPage/useIsAccessPage.js'
import appConfig from '../../../../../../app.config.js'

import RootFooterLinks from './containers/RootFooterLinks/RootFooterLinks.js'

export default function RootFooter() {
  const isAccessPage = useIsAccessPage()

  if (isAccessPage.isAccessPage) {
    return null
  }

  return (
    <Box
      data-id='RootFooter'
      component='footer'
      sx={{
        backgroundColor: 'neutral.600',
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
            backgroundColor: 'rgba(0, 0, 0, 0)',
            gridAutoFlow: ['row', 'column'],
            alignItems: 'center',
            justifyContent: [, 'space-between'],
            gap: 2,
          }}
        >
          <FullLogoLink
            sx={{
              transform: 'translateY(-2px)',
            }}
            iconSx={{
              width: '120px',
            }}
          />
          <Text
            text={`${appConfig.siteInfo.name} LLC. ${new Date().getFullYear()}`}
            sx={{
              color: 'neutral.100',
              fontWeight: 400,
              fontSize: 12,
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
