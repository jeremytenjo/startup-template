import assert from '@useweb/assert'

import postHog from '../../../utils/postHog.js'

export type PhErrorProps = {
  fnName: string
  description: string
  fatal?: boolean
  metadata?: any
}

export default async function phError(props: PhErrorProps) {
  assert<PhErrorProps>({ props, requiredProps: ['description', 'fnName'] })

  postHog({
    eventName: 'error',
    data: {
      description: String(props.description),
      functionName: props.fnName,
      fatal: Boolean(props.fatal),
      metadata: props.metadata,
    },
  })
}

export type PhErrorReturn = ReturnType<typeof phError>
