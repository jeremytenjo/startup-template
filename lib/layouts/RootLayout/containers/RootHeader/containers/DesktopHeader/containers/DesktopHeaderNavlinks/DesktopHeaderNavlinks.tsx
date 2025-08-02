import React from 'react'
import Box from '@useweb/ui/Box'
import NavLink from '@useweb/ui/NavLink'

import useNavLinks from '../../../../../../../../../data/navLinks/utils/useNavLinks/useNavLinks.js'

export default function DesktopHeaderNavlinks() {
  const navLinks = useNavLinks()

  return (
    <Box
      data-id='DesktopHeaderNavlinks'
      sx={{
        display: 'grid',
        height: '17px',
        alignItems: 'center',
        alignContent: 'center',
        whiteSpace: 'nowrap',
      }}
    >
      {navLinks.mainNavLinks.map((link) => {
        return (
          <NavLink
            key={link.label}
            data-id='DesktopRooHeaderNavlink'
            sx={{
              gridAutoFlow: 'column',
              gridGap: '21px',
              '& p': {
                fontSize: '16px',
              },
            }}
            textSx={{
              fontWeight: '500',
            }}
            href={link.url}
            label={link.label}
          />
        )
      })}
    </Box>
  )
}
