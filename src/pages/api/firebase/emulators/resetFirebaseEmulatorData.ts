import type { NextApiRequest, NextApiResponse } from 'next'

import resetFirebaseEmulatorData from '../../../../apiFunctions/resetFirebaseEmulatorData/resetFirebaseEmulatorData.next.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let body: any = {}

  try {
    body = JSON.parse(req.body)
  } catch (e) {
    body = req.body
  }

  try {
    const data = await resetFirebaseEmulatorData({ body, req })
    console.log('resetFirebaseEmulatorData API Succeeded')
    res.status(200).json({ data, error: undefined })
  } catch (error: any) {
    console.log('resetFirebaseEmulatorData API Error:')
    console.error(error)

    res.status(200).json({ error: String(error) })
  }
}
