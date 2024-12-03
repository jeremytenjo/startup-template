import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import type { ChartConfiguration } from 'chart.js/auto'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns'
import CircularProgress from '@useweb/ui/CircularProgress'
import Text from '@useweb/ui/Text'

import colors from '../../../../../theme/tokens/colors.js'

export type ChartBaseProps = {
  config: ChartConfiguration
  loading: boolean
  sx?: BoxProps['sx']
}

export default function ChartBase(props: ChartBaseProps) {
  const chartRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    if (!chartRef.current) return

    const newChart = new Chart(chartRef.current, {
      ...props.config,
      options: {
        ...props.config.options,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ...props.config.options?.scales?.y,
            ticks: {
              ...props.config.options?.scales?.y?.ticks,
              font: {
                weight: 'bold',
                size: 14,
              },
            },
          },
          x: {
            ...props.config.options?.scales?.x,
            ticks: {
              ...props.config.options?.scales?.x?.ticks,
              font: {
                weight: 'bold',
                size: 14,
              },
            },
          },
        },
        plugins: {
          ...props.config.options?.plugins,
          legend: {
            display: false,
            ...props.config.options?.plugins?.legend,
          },
          tooltip: {
            enabled: true,
            backgroundColor: colors.neutral['600'],
            borderColor: colors.neutral['300'],
            borderWidth: 2,
            cornerRadius: 10,
            titleFont: { size: 20 },
            bodyFont: { size: 14 },
            footerFont: { size: 10 },
            ...props.config.options?.plugins?.tooltip,
          },
        },
      },
    })

    return () => {
      newChart.destroy()
    }
  }, [props.config])

  return (
    <Box
      data-id='ChartBase'
      sx={{
        position: 'relative',
        aspectRatio: '2 / 1',
        minHeight: '400px',
        overflow: 'hidden',
        width: [, , '100%'],

        ...(props.sx || {}),

        '& > canvas': {
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,

          ...(props.sx?.['& > canvas'] || {}),
        },
      }}
    >
      {props.loading && (
        <Box
          data-id='ChartBase_Loading'
          className='blurBackground'
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(18, 27, 36, 0)',
            zIndex: 1,
          }}
        >
          <Box
            data-id='Inner'
            sx={{
              display: 'grid',
              justifyContent: 'center',
              justifyItems: 'center',
              gap: 1,
            }}
          >
            <CircularProgress />
            <Text
              text={`Loading`}
              tag='p'
              sx={{
                textAlign: 'center',
              }}
            />
          </Box>
        </Box>
      )}
      <canvas ref={chartRef} />
    </Box>
  )
}
