import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'

export const routeId = `routes/exampleRoute`

export type APIExampleRouteProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    name: string
  }
  return: Awaited<ExampleRouteReturn>
}

export type ExampleRoutePropsInternal = Omit<APIExampleRouteProps, 'route' | 'return'>

export default async function exampleRoute(
  props: ExampleRoutePropsInternal,
): ExampleRouteReturn {
  assert<ExampleRoutePropsInternal>({ props, requiredProps: ['payload'] })
  assert<APIExampleRouteProps['payload']>({
    props: props.payload,
    requiredProps: [],
  })

  const data = 'hi'

  return { data }
}

export type ExampleRouteReturn = Promise<{
  data: any
}>
