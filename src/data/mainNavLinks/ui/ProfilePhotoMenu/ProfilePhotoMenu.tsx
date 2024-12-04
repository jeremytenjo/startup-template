import React from 'react'
import Box from '@useweb/ui/Box'
import Menu from '@useweb/ui/Menu'
import MenuItem from '@useweb/ui/MenuItem'
import Divider from '@useweb/ui/Divider'
import IconButton from '@useweb/ui/IconButton'
import Link from '@useweb/ui/Link'
import { useRouter } from 'next/router'

import useMainNavLinks from '../../utils/useMainNavLinks/useMainNavLinks.js'
import useAuth from '../../../users/utils/useAuth/useAuth.js'
import SettingProfileAvatarLink from '../SettingProfileAvatarLink/SettingProfileAvatarLink.js'

export default function ProfilePhotoMenu() {
  const mainLinks = useMainNavLinks()
  const router = useRouter()
  const auth = useAuth({
    onSignOut() {
      router.push('/')
    },
  })

  return (
    <React.Fragment>
      <Menu
        triggerComponent={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <IconButton
              name='account'
              sx={{
                backgroundColor: 'neutral.300',
              }}
            >
              <SettingProfileAvatarLink
                avatarSx={{
                  width: '40px',
                  height: '40px',
                }}
                disableLink
                imgProps={{
                  quality: 5,
                }}
              />
            </IconButton>
          </Box>
        }
        id='account-menu'
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            minWidth: '215px',

            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        items={[
          ...mainLinks.profilePhotoMenuLinks.map((link) => {
            return (
              <Link key={link.label} href={link.url}>
                <MenuItem>{link.label}</MenuItem>
              </Link>
            )
          }),
          <Divider key='divider' />,
          <MenuItem
            key='sign-out'
            onClick={() => {
              auth.signOut()
            }}
          >
            Sign out
          </MenuItem>,
        ]}
      />
    </React.Fragment>
  )
}
