import assert from '@useweb/assert'
// https://posthog.com/docs/libraries/node
import { PostHog } from 'posthog-node'

import posthogConfig from '../../posthog.config.js'
import enablePostHog from '../enablePostHog/enablePostHog.js'

export type NodePostHogProps = { eventName: string; data: any }

export default async function nodePostHog(props: NodePostHogProps) {
  assert<NodePostHogProps>({ props, requiredProps: ['eventName', 'data'] })

  if (enablePostHog().enable) {
    const client = new PostHog(posthogConfig.id)

    client.capture({
      distinctId: 'nodePostHog',
      event: props.eventName,
      properties: { ...props.data, metadata: props.data },
    })

    await client.shutdownAsync()
  }
}

export type NodePostHogReturn = ReturnType<typeof nodePostHog>
