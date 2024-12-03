import assert from '@useweb/assert'
import crossFetch from 'cross-fetch'
import type { UseFirebaseFunctionFetchProps } from '@useweb/firebase/useFirebaseFunction'

import firebaseJson from '../../../../firebase.json' assert { type: 'json' }
import firebaseConfig from '../../../../src/lib/integrations/Google/Firebase/firebase.config.js'

export type CallFirebaseCloudFunctionProps<PayloadSchema = any> = {
  name: string
  options?: UseFirebaseFunctionFetchProps<PayloadSchema>
  // eslint-disable-next-line no-undef
  fetchOptions?: RequestInit
  defaultProdUrl?: string
}

export default async function callFirebaseCloudFunction<
  PayloadSchema = any,
  ReturnSchema = any,
>(props: CallFirebaseCloudFunctionProps<PayloadSchema>): Promise<ReturnSchema> {
  assert<CallFirebaseCloudFunctionProps<PayloadSchema>>({
    props,
    requiredProps: ['name'],
  })

  const port = firebaseJson.emulators.functions.port
  const region = 'us-central1'
  const devUrl = `http://127.0.0.1:${port}/${firebaseConfig.projectId}/${region}/${props.name}`
  const prodUrl =
    props.defaultProdUrl ||
    `https://${region}-${firebaseConfig.projectId}.cloudfunctions.net/${props.name}`
  const url = process.env.NODE_ENV === 'development' ? devUrl : prodUrl

  let data: any = await crossFetch(url, {
    method: 'post',
    body: JSON.stringify(props.options?.payload || {}),
    ...(props.fetchOptions || {}),
  })

  data = await data.json()

  if (data?.error) throw new Error(data.error)

  return data
}

export type CallFirebaseCloudFunctionReturn = ReturnType<typeof callFirebaseCloudFunction>
