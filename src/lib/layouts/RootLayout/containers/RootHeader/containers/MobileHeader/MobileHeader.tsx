import React from 'react'
import Box from '@useweb/ui/Box'
import { useAppHeaderStore } from '@useweb/ui/AppHeader'
import IconButton from '@useweb/ui/IconButton'
import Link from '@useweb/ui/Link'
import NavLink from '@useweb/ui/NavLink'

import MenuIcon from '../../../../../../components/icons/MenuIcon.js'
import LogoIcon from '../../../../../../components/icons/LogoIcon.js'
import { navLinks } from '../../../../../../../data/navLinks/utils/useNavLinks/useNavLinks.js'

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
          </Box>
        </Box>
      </Box>
    </>
  )
}
