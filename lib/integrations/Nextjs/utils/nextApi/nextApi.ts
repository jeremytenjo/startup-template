import crossFetch from 'cross-fetch'

import { nextjsConfig } from '../../nextjs.config.js'

/* eslint-disable @typescript-eslint/ban-ts-comment */
export type NextApiProps<PayloadProps> = {
  name: string
  payload?: PayloadProps
  port?: number
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

  const isFormData = props.payload instanceof FormData

  // Upload form data, eg file
  if (isFormData && props.payload) {
    const datas = await crossFetch(url, {
      method: 'post',
      body: props.payload as any,
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.statusText}`, {
          cause: {
            status: res.status,
            statusText: res.statusText,
            res,
          },
        })
      }

      return res.json()
    })

    return datas
  }

  const body = JSON.stringify(props.payload)
  const response: NextApiReturn<ReturnProps> = await crossFetch(
    url,
    props.payload && {
      method: 'post',
      body,
    },
  ).then((res) => {
    if (!res.ok) {
      if (res.statusText === 'Method Not Allowed') {
        console.error(
          `Method Not Allowed for ${props.name}/route.ts API. Please check the method used. If payload is not needed, use GET instead of POST.`,
        )
      }
      throw new Error(`${res.statusText}`, {
        cause: {
          status: res.status,
          statusText: res.statusText,
          res,
        },
      })
    }

    return res.json()
  })

  return response
}
