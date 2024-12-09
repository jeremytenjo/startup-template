import React from 'react'
import AsyncTester from '@useweb/async-tester'

import type { API_CreateConnectedAccountProps } from '../createConnectedAccount.js'
import miscFunctionsClient from '../../../../miscFunctions.client.js'

export default {
  title: 'Cloud Functions/firebase/miscFunctions/routes/createConnectedAccount',
  parameters: {
    signInAs: false,
  },
}

const Template = () => {
  const fn = async () => {
    const res = await miscFunctionsClient<API_CreateConnectedAccountProps>({
      api: {
        route: 'routes/createConnectedAccount',
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
