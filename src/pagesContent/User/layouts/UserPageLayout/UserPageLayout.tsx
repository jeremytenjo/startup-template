import React from 'react'
import Box from '@useweb/ui/Box'

import RootLayout from '../../../../lib/layouts/RootLayout/RootLayout.js'

export type UserPageLayoutProps = { children: any }

export default function UserPageLayout(props: UserPageLayoutProps) {
  return (
    <RootLayout
      title={undefined}
      disableTitle
      sx={{
        maxWidth: 'none',
      }}
    >
      <Box data-id='UserPageLayout' sx={{}}>
        {props.children}
      </Box>
    </RootLayout>
  )
}
