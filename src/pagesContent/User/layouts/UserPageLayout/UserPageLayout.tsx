import React from 'react'
import Box from '@useweb/ui/Box'
import Avatar from '@useweb/ui/Avatar'
import Text from '@useweb/ui/Text'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'
import Skeleton from '@useweb/ui/Skeleton'

import RootLayout from '../../../../lib/layouts/RootLayout/RootLayout.js'
import SidebarLayout from '../../../../lib/layouts/SidebarLayout/SidebarLayout.js'
import { navLinks } from '../../../../data/navLinks/utils/useNavLinks/useNavLinks.js'
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
              <Skeleton
                loading={!userPage.pageUser?.displayName}
                circle
                sx={{
                  width: '70px',
                  height: '70px',
                }}
              >
                <Avatar
                  src={userPage.pageUser?.profilePhoto?.src}
                  alt={userPage.pageUser?.displayName}
                  size='70px'
                />
              </Skeleton>

              <Skeleton loading={!userPage.pageUser?.displayName}>
                <Text
                  text={userPage.pageUser?.displayName}
                  tag='p'
                  sx={{
                    fontSize: [, , '18px'],
                    fontWeight: '600',
                  }}
                />
              </Skeleton>
            </Box>

            {userPage.isSignedIn && (
              <Link href={navLinks.settings.settings.url}>
                <Button name='EditProfile' variant='outlined' sx={{}}>
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
