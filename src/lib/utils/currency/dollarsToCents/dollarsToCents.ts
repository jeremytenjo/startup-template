import assert from '@useweb/assert'

export type ConvertDollarsToCentsProps = { dollars: number; debug?: boolean }

export default function dollarsToCents(props: ConvertDollarsToCentsProps) {
  assert<ConvertDollarsToCentsProps>({ props, requiredProps: ['dollars'] })

  if (props.dollars < 0) {
    console.error('dollars cannot be a negative number, received', props.dollars)
  }

  const cents = Math.round((Math.abs(props.dollars) / 100) * 10000)

  if (props.debug) {
    console.log('dollars', props.dollars)
    console.log('cents', cents)
  }

  return { cents }
}

export type ConvertDollarsToCentsReturn = ReturnType<typeof dollarsToCents>
