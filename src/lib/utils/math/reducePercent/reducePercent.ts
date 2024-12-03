import assert from '@useweb/assert'

export type ReducePercentProps = {
  amount: number
  percent: number
}

export default function reducePercent(props: ReducePercentProps) {
  assert<ReducePercentProps>({ props, requiredProps: ['amount', 'percent'] })

  const reductionAmount = (props.percent / 100) * props.amount
  const newAmount = props.amount - reductionAmount

  return { newAmount, reductionAmount }
}

export type ReducePercentReturn = ReturnType<typeof reducePercent>
