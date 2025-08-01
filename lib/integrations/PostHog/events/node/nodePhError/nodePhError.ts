import assert from '@useweb/assert'

import nodePostHog from '../../../utils/nodePostHog/nodePostHog.js'

export type NodePhErrorProps = {
  fnName: string
  description: string
  uid?: string
  metadata?: object
}

export default async function nodePhError(props: NodePhErrorProps) {
  assert<NodePhErrorProps>({ props, requiredProps: ['description', 'fnName'] })

  nodePostHog({
    eventName: 'Error',
    data: {
      description: String(props.description),
      functionName: props.fnName,
      uid: props.uid || '',
      metadata: props?.metadata,
    },
  })
}

export type NodePhErrorReturn = ReturnType<typeof nodePhError>
