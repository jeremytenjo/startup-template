import React from 'react'
import type { ChartConfiguration, ChartDataset } from 'chart.js'
import type { BoxProps } from '@useweb/ui/Box'

import ChartBase from '../../ChartBase/ChartBase.js'
import type { CommonChartStylesOptionsProps } from '../_common/commonChartStyles.js'
import { commonChartStyles } from '../_common/commonChartStyles.js'

export type BarChartProps = {
  options?: Partial<ChartConfiguration['options']>
  data: {
    config?: Partial<ChartDataset>
    dataset: {
      x: any
      y: any
    }[]
  }[]
  loading: boolean
  sx?: BoxProps['sx']
  commonChartStyles?: CommonChartStylesOptionsProps
}

export default function BarChart(props: BarChartProps) {
  return (
    <ChartBase
      config={{
        type: 'bar',

        data: {
          datasets: props.data?.map((item) => {
            return {
              data: item.dataset?.map((row) => {
                return row
              }),
              ...(commonChartStyles(props.commonChartStyles) as any),
              ...(item.config || {}),
            }
          }),
        },

        options: {
          ...(props.options || {}),
          plugins: {
            ...(props.options?.plugins || {}),
          },
        },
      }}
      loading={props.loading}
      sx={props.sx}
    />
  )
}
