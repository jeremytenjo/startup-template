import React from 'react'
import Box from '@useweb/ui/Box'

import StripeBalance from './containers/StripeBalanceCard/StripeBalanceCard.js'
import DeleteStripeAccountCard from './containers/DeleteStripeAccountCard/DeleteStripeAccountCard.js'

export default function StripeAccountActiveCard() {
  return (
    <Wrapper>
      <StripeBalance />
      <DeleteStripeAccountCard />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='StripeAccountActiveCard'
      sx={{
        display: 'grid',
        gap: 2,
      }}
    >
      {children}
    </Box>
  )
}
