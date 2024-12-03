import React from 'react'

import StatWithIcon from '../../StatWithIcon/StatWithIcon.js'
import centsToDollars from '../../../../utils/currency/centsToDollars/centsToDollars.js'
import BillIcon from '../../../icons/BillIcon.js'

export type BillStatProps = {
  amountCents: number
  loading: boolean
  label: string
  showTBDIfZero?: boolean
  rateRange?: string
}

export default function BillStat(props: BillStatProps) {
  return (
    <StatWithIcon
      icon={
        <BillIcon
          sx={{
            width: '23px',
          }}
        />
      }
      title={props.label}
      value={
        props.rateRange
          ? props.rateRange
          : props.showTBDIfZero && props.amountCents === 0
          ? 'TBD'
          : `$ ${
              centsToDollars({
                cents: props?.amountCents || 0,
                toFixed: 0,
              }).human
            }`
      }
      loading={props.loading}
      sx={{
        '& .StatWithIcon_value': {
          color: 'primary.light',
        },
      }}
    />
  )
}
