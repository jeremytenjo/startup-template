export type FormatValueToPriceProps = { amountCents: number | undefined }

export default function formatValueToPrice(props: FormatValueToPriceProps) {
  const price = !props?.amountCents
    ? 'not set'
    : `US$${props.amountCents.toLocaleString()}`

  return { price }
}

export type FormatValueToPriceReturn = ReturnType<typeof formatValueToPrice>
