import type { CallableRequest } from 'firebase-functions/v2/https'

import logFirebaseCloudFunctionError from '../utils/logFirebaseCloudFunctionError/logFirebaseCloudFunctionError.js'

import miscFunctions from './miscFunctions.js'

export type MiscFunctionsPropsFirebase = {
  request: CallableRequest<any>
}

export default async function miscFunctionsFirebase(props: MiscFunctionsPropsFirebase) {
  try {
    return await miscFunctions<any>({
      authUser: props.request.auth,
      context: props.request.data,
    })
  } catch (error: any) {
    logFirebaseCloudFunctionError({
      fnName: 'miscFunctions',
      description: error,
      uid: props.request?.auth?.uid,
      throwHttpsError: true,
      metadata: error?.cause,
    })
  }
}
