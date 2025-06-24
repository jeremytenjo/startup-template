export type GetMetaTagContentProps = {
  html: string
  property: string
}

export default function getMetaTagContent(props: GetMetaTagContentProps) {
  const regex = new RegExp(`<meta property="${props.property}" content="(.*?)"`)
  const content = props.html.match(regex)?.[1] || ''

  return { content }
}

export type GetMetaTagContentReturn = ReturnType<typeof getMetaTagContent>
