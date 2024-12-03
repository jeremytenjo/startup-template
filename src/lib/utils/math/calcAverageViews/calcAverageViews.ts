import assert from '@useweb/assert'

export type CalcAverageViewsProps = { total: number; size: number }

export default function calcAverageViews(props: CalcAverageViewsProps) {
  assert<CalcAverageViewsProps>({ props, requiredProps: ['total', 'size'] })
  const total = props.total || 0
  const size = props.size || 0

  const averageViews = Math.ceil(total / size)

  return { averageViews }
}

export type CalcAverageViewsReturn = ReturnType<typeof calcAverageViews>
