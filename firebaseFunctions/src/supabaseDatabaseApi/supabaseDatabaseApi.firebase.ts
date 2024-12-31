import type { CallableRequest } from 'firebase-functions/v2/https'

import logFirebaseCloudFunctionError from '../utils/logFirebaseCloudFunctionError/logFirebaseCloudFunctionError.js'

import supabaseDatabaseApi from './supabaseDatabaseApi.js'

export type SupabaseDatabaseApiPropsFirebase = {
  request: CallableRequest<any>
}

export default async function supabaseDatabaseApiFirebase(
  props: SupabaseDatabaseApiPropsFirebase,
) {
  try {
    return await supabaseDatabaseApi<any>({
      authUser: props.request.auth,
      context: props.request.data,
    })
  } catch (error: any) {
    logFirebaseCloudFunctionError({
      fnName: 'supabaseDatabaseApi',
      description: error,
      uid: props.request?.auth?.uid,
      throwHttpsError: true,
      metadata: error.cause,
    })
  }
}
