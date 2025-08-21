import React from 'react'
import Box from '@useweb/ui/Box'
import { useAppHeaderStore } from '@useweb/ui/AppHeader'
import IconButton from '@useweb/ui/IconButton'
import FullLogoLink from '@useweb/ui/FullLogoLink'

import MenuIcon from '../../../../../../components/icons/MenuIcon.js'

export default function MobileHeader() {
  const appHeaderStore = useAppHeaderStore()

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
          <FullLogoLink width='20px' />
        </Box>
      </Box>
    </>
  )
}
