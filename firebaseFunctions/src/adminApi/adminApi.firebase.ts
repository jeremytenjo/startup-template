import type { CallableRequest } from 'firebase-functions/v2/https'

import logFirebaseCloudFunctionError from '../utils/logFirebaseCloudFunctionError/logFirebaseCloudFunctionError.js'

import adminApi from './adminApi.js'

export type AdminApiPropsFirebase = {
  request: CallableRequest<any>
}

export default async function adminApiFirebase(props: AdminApiPropsFirebase) {
  try {
    return await adminApi<any>({
      authUser: props.request.auth,
      context: props.request.data,
    })
  } catch (error: any) {
    logFirebaseCloudFunctionError({
      fnName: 'adminApi',
      description: error,
      uid: props.request?.auth?.uid,
      throwHttpsError: true,
      metadata: error.cause,
    })
  }
}
