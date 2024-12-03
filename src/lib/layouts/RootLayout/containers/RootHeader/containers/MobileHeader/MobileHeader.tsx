import React from 'react'
import Box from '@useweb/ui/Box'
import { useAppHeaderStore } from '@useweb/ui/AppHeader'
import IconButton from '@useweb/ui/IconButton'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'
import NavLink from '@useweb/ui/NavLink'
import Avatar from '@useweb/ui/Avatar'

import useAuth from '../../../../../../../data/users/utils/useAuth/useAuth.js'
import MenuIcon from '../../../../../../components/icons/MenuIcon.js'
import LogoIcon from '../../../../../../components/icons/LogoIcon.js'
import NotificationsPopover from '../../../../../../../data/notifications/queries/Notifications/ui/NotificationsPopover/NotificationsPopover.js'

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
            <LogoIcon />
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

              <Link
                href={`/settings/profile`}
                sx={{
                  ml: '8px',
                }}
              >
                <Avatar
                  src={auth.user?.photoURL}
                  alt={auth.user?.displayName}
                  sx={{
                    justifySelf: 'start',
                    width: '35px',
                    height: '35px',
                    mr: '8px',
                    borderRadius: '12px',
                  }}
                />
              </Link>
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
                href={'/account/sign-in'}
                label='Sign in'
                sx={{
                  mr: '10px',
                }}
              />

              <NavLink
                href={'/account/sign-up'}
                label={
                  <Button name='JoinButton' variant='green' sx={{}}>
                    Join BidBlox
                  </Button>
                }
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
