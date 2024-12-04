import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Link from '@useweb/ui/Link'

import FullLogoLink from '../../../../components/logo/FullLogoLink/FullLogoLink.js'
import useMainNavLinks from '../../../../../data/mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'

export default function RootFooter() {
  const mainNavLinks = useMainNavLinks()

  return (
    <Box
      data-id='RootFooter'
      component='footer'
      sx={{
        backgroundColor: 'neutral.600',
        mt: '50px',
      }}
    >
      <Box data-id='RootFooterInner' sx={{}}>
        <Box data-id='RootFooterLinks' sx={{}}>
          RootFooterLinks
        </Box>

        <Box
          data-id='RootFooterBottom'
          sx={{
            display: 'grid',
          }}
        >
          <FullLogoLink sx={{}} />
          <Text
            text={`Startup LLC. ${new Date().getFullYear()}`}
            sx={{
              color: 'neutral.100',
              fontWeight: 400,
              fontSize: 12,
            }}
          />
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
                    width: '18px',
                  }}
                />
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
