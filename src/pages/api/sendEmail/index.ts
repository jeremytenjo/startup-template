import type { NextApiRequest, NextApiResponse } from 'next'

import sendEmailNext from '../../../apiFunctions/sendEmail/sendEmail.next.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await sendEmailNext({ body: req.body, req })
    console.log(' ')
    console.log('sendEmail API Succeeded')
    console.log(' ')

    res.status(200).json({ data })
  } catch (error: any) {
    console.log(' ')
    console.log('sendEmail API Error:')
    console.log(' ')
    console.log(JSON.stringify(error, null, 2))
    console.log({ error })
    res.status(200).json({ error: String(error) })
  }
}
