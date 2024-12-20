import React from 'react'
import Box from '@useweb/ui/Box'
import Avatar from '@useweb/ui/Avatar'
import Text from '@useweb/ui/Text'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'

import RootLayout from '../../../../lib/layouts/RootLayout/RootLayout.js'
import SidebarLayout from '../../../../lib/layouts/SidebarLayout/SidebarLayout.js'
import { allNavLinks } from '../../../../data/mainNavLinks/utils/useMainNavLinks/useMainNavLinks.js'
import useUserPage from '../../utils/useUserPage/useUserPage.js'

export type UserPageLayoutProps = { children: any }

export default function UserPageLayout(props: UserPageLayoutProps) {
  const userPage = useUserPage()

  return (
    <RootLayout title={undefined} disableTitle>
      <SidebarLayout
        data-id='ProfilePageLayout'
        sidebarComponent={
          <Box
            data-id='ProfileSidebar'
            sx={{
              display: 'grid',
              gap: 2,
            }}
          >
            <Box
              data-id='Header'
              sx={{
                display: 'grid',
                gap: 1,
                justifyItems: 'center',
                textAlign: 'center',
              }}
            >
              <Avatar
                src={userPage.pageUser?.profilePhoto?.src}
                alt={userPage.pageUser?.displayName}
                size='70px'
              />

              <Text
                text={userPage.pageUser?.displayName}
                tag='p'
                sx={{
                  fontSize: [, , '18px'],
                  fontWeight: '600',
                }}
              />
            </Box>

            {userPage.isSignedIn && (
              <Link href={allNavLinks.settings.settings.url}>
                <Button name='EditProfile' sx={{}}>
                  Edit Profile
                </Button>
              </Link>
            )}
          </Box>
        }
      >
        {props.children}
      </SidebarLayout>
    </RootLayout>
  )
}
