import { onCall } from 'firebase-functions/v2/https'

import miscFunctionsFirebase from './miscFunctions/miscFunctions.firebase.js'

// miscFunctions
export const miscFunctions = onCall(
  {
    memory: '1GiB',
  },
  async (request) => await miscFunctionsFirebase({ request }),
)
