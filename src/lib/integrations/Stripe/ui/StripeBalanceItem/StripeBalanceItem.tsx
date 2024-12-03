import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import InfoDisclaimer from '../../../../components/dataDisplay/InfoDisclaimer/InfoDisclaimer.js'
import centsToDollars from '../../../../utils/currency/centsToDollars/centsToDollars.js'

export type StripeBalanceItemProps = {
  title: string
  icon: any
  amountCents: number
  currency: string
  disclaimer: string
}

export default function StripeBalanceItem(props: StripeBalanceItemProps) {
  return (
    <Wrapper>
      {props.icon}
      <Box data-id='Right' sx={{}}>
        <Box
          data-id='Title'
          sx={{
            display: 'flex',
            gap: 1,
          }}
        >
          <Text
            text={props.title}
            tag='p'
            sx={{
              fontWeight: '500',
              color: 'neutral.150',
              fontSize: '13px',
            }}
          />
          <InfoDisclaimer
            disclaimer={props.disclaimer}
            id={`StripeBalanceItem_${props.title}`}
          />
        </Box>
        <Text
          text={
            '$' +
            centsToDollars({
              cents: props.amountCents,
            }).human
          }
          tag='span'
          sx={{
            fontWeight: '600',
          }}
        />
        <Text
          text={' ' + props.currency}
          tag='span'
          sx={{
            color: 'neutral.150',
            textTransform: 'uppercase',
            fontSize: '11px',
            fontWeight: '500',
          }}
        />
      </Box>
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='StripeBalanceItem'
      sx={{
        display: 'grid',
        gap: 2,
        alignItems: 'center',
        gridAutoFlow: 'column',
        width: 'fit-content',
        p: '10px 16px',
        backgroundColor: 'neutral.500',
        borderRadius: '14px',
      }}
    >
      {children}
    </Box>
  )
}
