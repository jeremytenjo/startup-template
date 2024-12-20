import React from 'react'
import Box from '@useweb/ui/Box'
import { useAppHeaderStore } from '@useweb/ui/AppHeader'
import IconButton from '@useweb/ui/IconButton'
import Link from '@useweb/ui/Link'
import NavLink from '@useweb/ui/NavLink'

import useAuth from '../../../../../../../data/users/utils/useAuth/useAuth.js'
import MenuIcon from '../../../../../../components/icons/MenuIcon.js'
import LogoIcon from '../../../../../../components/icons/LogoIcon.js'
import NotificationsPopover from '../../../../../../../data/notifications/queries/Notifications/ui/NotificationsPopover/NotificationsPopover.js'
import SettingProfileAvatarLink from '../../../../../../../data/navLinks/ui/SettingProfileAvatarLink/SettingProfileAvatarLink.js'
import SignUpLink from '../../../../../../../data/navLinks/ui/SignUpLink/SignUpLink.js'
import { navLinks } from '../../../../../../../data/navLinks/utils/useNavLinks/useNavLinks.js'

export default function MobileHeader() {
  const appHeaderStore = useAppHeaderStore()
  const auth = useAuth()

  return (
    <>
      <Box
        className='blurBackground'
        sx={{
          display: ['flex', 'grid'],
          gridAutoFlow: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gridTemplateColumns: 'fit-content(100%) fit-content(100%)',
          gap: '12px',
          justifyItems: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        <Box
          data-id='LeftSide'
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            name='menu'
            onClick={() => {
              appHeaderStore.setOpenDrawer({ value: true })
            }}
          >
            <MenuIcon fontSize='small' />
          </IconButton>
          <Link
            href={`/`}
            sx={{
              display: 'contents',
            }}
          >
            <LogoIcon
              sx={{
                width: '20px',
              }}
            />
          </Link>
        </Box>

        <Box
          sx={{
            display: 'flex',
            width: 'fit-content',
            gap: 1,
            alignItems: 'center',
          }}
        >
          {auth.userWasSignedInOrIsSignedIn ? (
            <Box
              sx={{
                display: 'grid',
                gridAutoFlow: 'column',
                alignItems: 'center',
              }}
            >
              <NotificationsPopover />

              <SettingProfileAvatarLink
                sx={{
                  ml: '8px',
                }}
                avatarSx={{
                  width: '40px',
                  height: '40px',
                  mr: '8px',
                }}
              />
            </Box>
          ) : (
            <Box
              data-id='SignedOutButtons'
              sx={{
                display: 'grid',
                gap: 2,
                gridAutoFlow: 'column',
              }}
            >
              <NavLink
                href={navLinks.access.signIn?.url}
                label={navLinks.access.signIn?.label}
                sx={{
                  mr: '10px',
                }}
              />

              <SignUpLink
                sx={{
                  mr: '10px',
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}
