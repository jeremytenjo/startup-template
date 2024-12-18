import React from 'react'
import Button from '@useweb/ui/Button'
import Link from '@useweb/ui/Link'
import EmptyMessage from '@useweb/ui/EmptyMessage'
import Box from '@useweb/ui/Box'

import RootLayout from '../lib/layouts/RootLayout/RootLayout.js'
import useAuth from '../data/users/utils/useAuth/useAuth.js'
import PageNotFoundIcon from '../lib/components/icons/PageNotFoundIcon.js'

export default function PageNotFound() {
  const auth = useAuth()

  return (
    <RootLayout title='Page Not Found'>
      <Box
        sx={{
          '& img': {
            width: '100%',
            height: '100%',
            maxWidth: '470px',
          },
        }}
      >
        <EmptyMessage
          title='Page not found'
          subTitle='Sorry, the page you’re looking for can’t be found'
          icon={
            <PageNotFoundIcon
              sx={{
                fontSize: '200px',
              }}
            />
          }
          sx={{
            display: 'block',
            m: '0 auto',
            my: '40px',
            maxWidth: '100%',
          }}
          content={
            <Link
              href={!auth.user?.id ? '/' : '/sponsorships'}
              sx={{
                mt: 2,
                display: 'block',
              }}
            >
              <Button
                name='go back home'
                sx={{
                  width: 'fit-content',
                  display: 'block',
                  m: '0 auto',
                }}
              >
                Go back home
              </Button>
            </Link>
          }
        />
      </Box>
    </RootLayout>
  )
}
