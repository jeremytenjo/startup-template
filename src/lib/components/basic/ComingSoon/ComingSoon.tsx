import React from 'react'
import Box from '@useweb/ui/Box'
import UsewebText from '@useweb/ui/Text'

import SocialSeedLogoBannerIcon from '../../icons/SocialSeedLogoBanner/SocialSeedLogoBanner.js'

export default function ComingSoon() {
  return (
    <Wrapper>
      <Box
        data-id='ComingSoonInner'
        sx={{
          display: 'grid',
          px: '20px',
          width: { xs: '100%', md: '800px' },
          '& svg': {
            width: '100%',
            height: 'fit-content',
          },
        }}
      >
        <SocialSeedLogoBannerIcon
          sx={{ color: 'neutral.100' }}
          viewBox='0 0 961.5107421875 188.01953125'
        />
        <ComingSoon1Text />
      </Box>
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='ComingSoon'
      sx={{
        display: 'grid',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        color: 'rgba(37, 191, 99, 1)',
        backgroundColor: 'rgba(37, 191, 99, 1)',
        gridAutoFlow: 'row',
        gridGap: '10px',
        placeItems: 'center',
      }}
    >
      {children}
    </Box>
  )
}

const ComingSoon1Text = () => {
  return (
    <UsewebText
      text={`Coming Soon`}
      sx={{
        color: 'neutral.100',
        fontWeight: 400,
        fontSize: {
          xs: '21px',
          md: '38px',
        },
        lineHeight: '38.400001525878906px',
        textAlign: 'center',
      }}
    />
  )
}
