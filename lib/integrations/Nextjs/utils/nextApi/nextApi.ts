import crossFetch from 'cross-fetch'

import { nextjsConfig } from '../../nextjs.config.js'

/* eslint-disable @typescript-eslint/ban-ts-comment */
export type NextApiProps<PayloadProps> = {
  name: string
  payload?: PayloadProps
  port?: number
  formData?: FormData
  isExternalCall?: boolean
  forceProduction?: boolean
}

export type NextApiReturn<ReturnProps> = { data: ReturnProps; error: any }

// can't be in node_modules because it would not have access to procce.env or import.meta
export default async function nextApi<ReturnProps = any, PayloadProps = any>(
  props: NextApiProps<PayloadProps>,
): Promise<NextApiReturn<ReturnProps>> {
  if (!props.name) throw new Error('Missing name prop')

  // Regular call
  const port = props.port || process.env.PUBIC_NEXT_PORT || nextjsConfig.port
  const prefix =
    // @ts-ignore
    process.env.NODE_ENV === 'development' && !props.forceProduction
      ? `http://localhost:${port}/`
      : '/'

  const url = props.isExternalCall
    ? `${nextjsConfig?.domain}/api/${props.name}`
    : `${prefix}api/${props.name}`

  // Upload form data, eg file
  if (props.formData) {
    const datas = await (
      await crossFetch(url, {
        method: 'post',
        body: props.formData,
      })
    ).json()

    return datas
  }

  const body = JSON.stringify(props.payload)
  const response: NextApiReturn<ReturnProps> = await crossFetch(
    url,
    props.payload && {
      method: 'post',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => {
    return res.json()
  })

  return response
}
