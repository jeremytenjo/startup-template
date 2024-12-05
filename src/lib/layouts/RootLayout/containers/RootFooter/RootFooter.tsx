import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Link from '@useweb/ui/Link'

import FullLogoLink from '../../../../components/logo/FullLogoLink/FullLogoLink.js'
import useMainNavLinks from '../../../../../data/mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'
import useIsAccessPage from '../../../../../data/users/utils/useIsAccessPage/useIsAccessPage.js'

import RootFooterLinks from './containers/RootFooterLinks/RootFooterLinks.js'

export default function RootFooter() {
  const mainNavLinks = useMainNavLinks()
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
          <Box
            data-id='RootFooterBottomLeft'
            sx={{
              display: 'grid',
              justifyContent: 'space-between',
              gridColumn: [, '1'],
              alignContent: 'center',
              gridAutoFlow: 'column',
              alignItems: 'center',
              width: '100%',
              gap: 2,
            }}
          >
            <FullLogoLink
              sx={{
                transform: 'translateY(-2px)',
              }}
            />
            <Text
              text={`Startup LLC. ${new Date().getFullYear()}`}
              sx={{
                color: 'neutral.100',
                fontWeight: 400,
                fontSize: 12,
              }}
            />
          </Box>

          <Box
            data-id='RootFooterBottomRight'
            sx={{
              order: ['-1', 'initial'],
            }}
          >
            <Box
              data-id='RootFooterSocialLinks'
              sx={{
                display: 'flex',
                gap: 2,
              }}
            >
              {mainNavLinks.socialLinks.map((link) => (
                <Link key={link.url} href={link.url} sx={{}}>
                  <link.icon
                    sx={{
                      width: '21px',
                    }}
                  />
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
