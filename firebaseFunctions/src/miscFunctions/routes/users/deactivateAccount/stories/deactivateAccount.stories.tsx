import React from 'react'
import AsyncTester from '@useweb/async-tester'

import miscFunctionsClient from '../../../miscFunctions.client.js'
import type { API_DeactivateAccountProps } from '../deactivateAccount.js'

export default {
  title: 'Cloud Functions/firebase/miscFunctions/routes/deactivateAccount',
  parameters: {
    signInAs: 'user1',
  },
}

const Template = () => {
  const fn = async () => {
    const res = await miscFunctionsClient<API_DeactivateAccountProps>({
      api: {
        route: 'routes/deactivateAccount',
        payload: {
          uid: 'user1',
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
