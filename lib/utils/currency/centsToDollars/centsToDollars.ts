import assert from '@useweb/assert'

export type ConvertCentsToDollarsProps = {
  cents: number
  debug?: boolean
  toFixed?: number
}

export default function centsToDollars(props: ConvertCentsToDollarsProps) {
  assert<ConvertCentsToDollarsProps>({ props, requiredProps: ['cents'] })

  if (props.cents < 0) {
    console.error('cents cannot be a negative number, received', props.cents)
  }

  const dollars = parseFloat(String(props.cents)) / 100
  const human = dollars
    .toFixed(props.toFixed === 0 ? 0 : props.toFixed || 2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  if (props.debug) {
    console.log('cents', props.cents)
    console.log('dollars', dollars)
  }

  return { dollars, human }
}

export type ConvertCentsToDollarsReturn = ReturnType<typeof centsToDollars>
