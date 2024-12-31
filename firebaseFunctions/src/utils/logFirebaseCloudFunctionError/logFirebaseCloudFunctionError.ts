import assert from '@useweb/assert'
import logger from 'firebase-functions/logger'
import { HttpsError } from 'firebase-functions/v2/https'

import nodePhError from '../../../../src/lib/integrations/PostHog/events/node/nodePhError/nodePhError.js'

export type LogFirebaseCloudFunctionErrorProps = {
  description: string
  fnName: string
  metadata: any
  uid?: string
  // use in callable cloud functions
  throwHttpsError?: boolean
  throwError?: boolean
}

export default function logFirebaseCloudFunctionError(
  props: LogFirebaseCloudFunctionErrorProps,
) {
  assert<LogFirebaseCloudFunctionErrorProps>({
    props,
    requiredProps: ['description', 'fnName'],
  })

  const publicErrorMessage =
    props.metadata?.publicErrorMessage || 'Error. Please try again later.'

  const errorObj = {
    fnName: String(props.fnName),
    description: String(props.description),
    metadata: {
      ...props.metadata,
      publicErrorMessage,
    },
    uid: props.uid,
    publicErrorMessage,
  }

  nodePhError(errorObj)

  // use in callable cloud functions
  if (props.throwHttpsError) {
    logger.error(errorObj.fnName + ` - ${errorObj.description}`, errorObj)
    throw new HttpsError('failed-precondition', JSON.stringify(errorObj))
  } else {
    logger.error(errorObj.fnName + ` - ${errorObj.description}`, errorObj)
  }

  if (props.throwError) {
    throw new Error(`${errorObj.fnName} - ${errorObj.description}`)
  }
}

export type LogFirebaseCloudFunctionErrorReturn = ReturnType<
  typeof logFirebaseCloudFunctionError
>
