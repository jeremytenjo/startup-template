import React from 'react'
import AsyncTester from '@useweb/async-tester'

import adminApiClient from '../../../adminApi.client.js'
import type { APIExampleRouteProps } from '../exampleRoute.js'

export default {
  title: 'Cloud Functions/firebase/adminApi/routes/exampleRoute',
  parameters: {
    signInAs: false,
  },
}

const Template = () => {
  const fn = async () => {
    const res = await adminApiClient<APIExampleRouteProps>({
      api: {
        route: 'routes/exampleRoute',
        payload: {
          name: 'hello',
        },
      },
    })

    return res
  }

  return (
    <>
      <AsyncTester<any, any> fn={fn} autoExec />
    </>
  )
}

export const Default = {
  render: () => {
    return <Template />
  },
}
