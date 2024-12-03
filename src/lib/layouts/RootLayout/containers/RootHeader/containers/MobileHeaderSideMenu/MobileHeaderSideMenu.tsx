import React from 'react'
import Box from '@useweb/ui/Box'
import { useAppHeaderStore } from '@useweb/ui/AppHeader'
import Divider from '@useweb/ui/Divider'
import Text from '@useweb/ui/Text'
import { useRouter } from 'next/router'
import NavLink from '@useweb/ui/NavLink'

import FullLogoLink from '../../../../../../components/logo/FullLogoLink/FullLogoLink.js'
import useAuth from '../../../../../../../data/users/utils/useAuth/useAuth.js'
import useMainNavLinks from '../../../../../../../data/mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'

export default function MobileHeaderSideMenu() {
  const mainLinks = useMainNavLinks()
  const router = useRouter()
  const appHeaderStore = useAppHeaderStore()
  const auth = useAuth({
    onSignOut() {
      appHeaderStore.setOpenDrawer({ value: false })
      router.push('/')
    },
  })

  return (
    <Box
      data-id='MobileHeaderSideMenu'
      sx={{
        display: 'grid',
        alignContent: 'start',
        width: 'fit-content',
        gridAutoFlow: 'row',
        gridGap: '15px',
        paddingLeft: '15px',
        paddingRight: '15px',
        minWidth: '215px',
      }}
    >
      <FullLogoLink
        sx={{
          mt: 2,
        }}
        onClick={() => {
          appHeaderStore.setOpenDrawer({ value: false })
        }}
      />

      <Box
        data-id='MobileHeaderNavList'
        sx={{
          width: '100%',
        }}
      >
        {mainLinks.mainNavLinks.map((link) => {
          return (
            <NavLink
              key={link.label}
              data-id='MobileHeaderNavLink'
              sx={{
                display: 'grid',
                alignItems: 'center',
                height: '36px',
                paddingTop: '6px',
                paddingBottom: '6px',
              }}
              textSx={{
                fontWeight: '500',
              }}
              href={link.url}
              onClick={() => appHeaderStore.setOpenDrawer({ value: false })}
              label={link.label}
            />
          )
        })}

        {auth.user && (
          <>
            <Divider sx={{ mt: '20px' }} />
            <Text
              onClick={() => {
                auth.signOut()
              }}
              text={'Sign out'}
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
                color: 'neutral.200',
                fontSize: 14,
                textAlign: 'left',
                py: '6px',
              }}
            />
          </>
        )}
      </Box>
    </Box>
  )
}
