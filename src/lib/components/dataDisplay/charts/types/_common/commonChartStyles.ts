import type { ChartDataset } from 'chart.js'

export const chartColors = {
  border: '#00AA6D',
}

export type CommonChartStylesOptionsProps = {
  color?: string
}

export function commonChartStyles({
  color = chartColors.border,
}: CommonChartStylesOptionsProps = {}) {
  return {
    fill: true,
    borderColor: color,
    borderWidth: 2,
    backgroundColor: function (context) {
      const chart = context.chart
      const { ctx, chartArea } = chart

      // This case happens on initial chart load
      if (!chartArea) return

      const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
      gradient.addColorStop(0.9, color)
      gradient.addColorStop(0, 'transparent')
      return gradient
    },
  } satisfies Partial<ChartDataset>
}
