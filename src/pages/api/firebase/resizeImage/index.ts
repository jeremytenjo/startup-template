import type { NextApiRequest, NextApiResponse } from 'next'

import resizeImage from '../../../../apiFunctions/resizeImage/resizeImage.next.js'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let body: any = {}

  try {
    body = JSON.parse(req.body)
  } catch (e) {
    body = req.body
  }

  try {
    const data = await resizeImage({ body, req })
    console.log('resizeImage API Response:')
    res.status(200).json({ data, error: undefined })
  } catch (error: any) {
    console.log('resizeImage API Error:')
    console.log(error)
    res.status(200).json({ error: String(error) })
  }
}
