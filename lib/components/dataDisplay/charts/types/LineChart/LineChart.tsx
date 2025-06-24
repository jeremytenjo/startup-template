import React from 'react'
import type {
  ChartConfiguration,
  ChartDataset,
  PointStyle,
  TooltipLabelStyle,
} from 'chart.js'
import type { BoxProps } from '@useweb/ui/Box'

import ChartBase from '../../ChartBase/ChartBase.js'
import type { CommonChartStylesOptionsProps } from '../_common/commonChartStyles.js'
import { commonChartStyles } from '../_common/commonChartStyles.js'
import colors from '../../../../../../theme/tokens/colors.js'

export type LineChartProps = {
  options?: Partial<ChartConfiguration['options']>
  data: {
    config?: Partial<ChartDataset>
    dataset: {
      x: any
      y: any
      point?: PointStyle
      otherData?: any
    }[]
  }[]
  loading: boolean
  sx?: BoxProps['sx']
  commonChartStyles?: CommonChartStylesOptionsProps
  tooltip?: {
    pointStyle?: Partial<TooltipLabelStyle>
  }
}

export default function LineChart(props: LineChartProps) {
  return (
    <ChartBase
      config={{
        type: 'line',

        data: {
          datasets: props.data?.map((item) => {
            return {
              data: item.dataset?.map((row) => {
                return row
              }),
              pointStyle: item.dataset?.map((row) => row.point || 'none'),
              ...(commonChartStyles(props.commonChartStyles) as any),
              ...(item.config || {}),
            }
          }),
        },

        options: {
          ...(props.options || {}),
          plugins: {
            ...(props.options?.plugins || {}),
            tooltip: {
              ...(props.options?.plugins?.tooltip || {}),
              usePointStyle: true,
              callbacks: {
                labelColor: function () {
                  return {
                    borderColor: '#121B24',
                    borderWidth: 3,
                    backgroundColor: colors.primary.main,
                    ...props?.tooltip?.pointStyle,
                  }
                },
              },
            },
          },
        },
      }}
      loading={props.loading}
      sx={props.sx}
    />
  )
}
