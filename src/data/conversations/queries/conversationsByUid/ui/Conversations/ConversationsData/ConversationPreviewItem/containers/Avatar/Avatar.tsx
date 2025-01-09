import React from 'react'
import Box from '@useweb/ui/Box'

export type AvatarProps = any

export default function Avatar() {
  return (
    <Wrapper>
      <Box
        data-id='Status'
        sx={{
          width: '12px',
          height: '12px',
          backgroundColor: 'rgba(44, 192, 105, 1)',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'rgba(255, 255, 255, 1)',
        }}
      ></Box>
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='Avatar' sx={{ display: 'grid', backgroundColor: 'rgba(0, 0, 0, 0)' }}>
      {children}
    </Box>
  )
}
