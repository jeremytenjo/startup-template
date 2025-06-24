import React from 'react'
import formatToUnits from '@useweb/format-to-units'

import StatWithIcon from '../../StatWithIcon/StatWithIcon.js'
import EyeIcon from '../../../icons/EyeIcon.js'

export type ViewsStatProps = {
  views: number
  loading: boolean
  label?: string
  affix?: string
}

export default function ViewsStat(props: ViewsStatProps) {
  return (
    <StatWithIcon
      icon={
        <EyeIcon
          sx={{
            width: '23px',
          }}
        />
      }
      title={props?.label || 'Avg Views'}
      value={`${
        formatToUnits({
          number: props?.views || 0,
        }).number
      }${props.affix || ''}`}
      loading={props.loading}
    />
  )
}
