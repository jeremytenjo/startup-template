import appConfig from '../../../../app.config.js'

/* eslint-disable @typescript-eslint/ban-ts-comment */
export type NextApiProps<PayloadProps> = {
  name: string
  payload?: PayloadProps
  port?: number
  formData?: FormData
  fetchFn?: any
  isExternalCall?: boolean
  forceProduction?: boolean
}

export type NextApiReturn<DataSchema> = { data: DataSchema; error: any }

// can't be in node_modules because it would not have access to procce.env or import.meta
export default async function nextApi<DataSchema = any, PayloadProps = any>(
  props: NextApiProps<PayloadProps>,
): Promise<NextApiReturn<DataSchema>> {
  if (!props.name) throw new Error('Missing name prop')
  const fetchFn = props.fetchFn || fetch

  // Regular call
  const port = props.port || process.env.nextjsPort || process.env.PUBIC_NEXT_PORT || 3001
  const prefix =
    // @ts-ignore
    process.env.NODE_ENV === 'development' && !props.forceProduction
      ? `http://localhost:${port}/`
      : '/'

  const url = props.isExternalCall
    ? `${appConfig.siteInfo?.domain}/api/${props.name}`
    : `${prefix}api/${props.name}`

  // Upload form data, eg file
  if (props.formData) {
    const datas = await (
      await fetchFn(url, {
        method: 'post',
        body: props.formData,
      })
    ).json()

    return datas
  }

  const body = JSON.stringify(props.payload)
  const response: NextApiReturn<DataSchema> = await fetchFn(
    url,
    props.payload && {
      method: 'post',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => res.json())

  return response
}
