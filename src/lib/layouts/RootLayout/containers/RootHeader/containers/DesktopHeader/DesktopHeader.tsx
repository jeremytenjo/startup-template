import React from 'react'
import Box from '@useweb/ui/Box'
import List from '@useweb/ui/List'
import NavLink from '@useweb/ui/NavLink'

import { otherTokens } from '../../../../../../../theme/tokens/otherTokens.js'
import FullLogoLink from '../../../../../../components/logo/FullLogoLink/FullLogoLink.js'
import useMainNavLinks from '../../../../../../../data/mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'
import type NavLinkSchema from '../../../../../../../data/_commonSchemas/NavLinkSchema/NavLinkSchema.js'
import useAuth from '../../../../../../../data/users/utils/useAuth/useAuth.js'
import NotificationsPopover from '../../../../../../../data/notifications/queries/Notifications/ui/NotificationsPopover/NotificationsPopover.js'
import useOnNewNotificationReceived from '../../../../../../../data/notifications/queries/Notifications/useOnNewNotificationReceived/useOnNewNotificationReceived.js'
import SettingProfileAvatarLink from '../../../../../../../data/mainNavLinks/ui/SettingProfileAvatarLink/SettingProfileAvatarLink.js'
import SignUpLink from '../../../../../../../data/mainNavLinks/ui/SignUpLink/SignUpLink.js'

export default function DesktopHeader() {
  const mainNavLinks = useMainNavLinks()
  const auth = useAuth()
  useOnNewNotificationReceived()

  return (
    <>
      <Box
        data-id='DesktopHeaderContent'
        sx={{
          display: 'grid',
          height: '69px',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          gridAutoFlow: 'column',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between',
          paddingTop: '0px',
          paddingBottom: '0px',
          width: '100%',
          margin: '0 auto',
          maxWidth: otherTokens.maxWidth[2],
        }}
      >
        <Box
          data-id='DesktopHeaderContentLeft'
          sx={{
            display: 'grid',
            gap: '50px',
            alignItems: 'center',
            gridAutoFlow: 'column',
          }}
        >
          <FullLogoLink />
          <Box data-id='DesktopRooHeaderNavlinks' sx={{}}>
            <List<NavLinkSchema>
              listItemKeyName='label'
              data={mainNavLinks?.mainNavLinks || []}
              ListItemComponent={({ itemData: navLink }) => {
                return <NavLink label={navLink.label} href={navLink.url} />
              }}
              sx={{
                gridAutoFlow: 'column',
                gridGap: '21px',
                '& p': {
                  fontSize: '16px',
                },
              }}
            />
          </Box>
        </Box>

        <Box
          data-id='DesktopHeaderContentRight'
          sx={{
            display: 'grid',
            gap: '10px',
            alignItems: 'center',
            gridAutoFlow: 'column',
          }}
        >
          {auth.userWasSignedInOrIsSignedIn ? (
            <>
              <NotificationsPopover />
              <SettingProfileAvatarLink
                avatarSx={{
                  width: '40px',
                  height: '40px',
                }}
                disableLink
                onClick={() => {
                  // TODO copy ProfilePhotoMenu from ss
                  console.log('HERE!')
                }}
              />
            </>
          ) : (
            <>
              <NavLink
                href={'/signin'}
                label='Sign In'
                sx={{
                  '& p': {
                    fontSize: '16px',
                  },
                }}
              />

              <SignUpLink
                sx={{
                  ml: '10px',
                }}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  )
}
