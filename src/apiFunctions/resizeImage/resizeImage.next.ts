import type { NextApiRequest } from 'next'
import sharp from 'sharp'
import formidable from 'formidable'

export type ResizeImageProps = {
  req: NextApiRequest
  body: {
    formData: FormData
  }
}

export default async function resizeImageAPI(props: ResizeImageProps) {
  try {
    const formidableFileRes = (await readFile(props.req)) as any
    const file = formidableFileRes.file as any
    const width = parseInt(formidableFileRes.width, 10)
    const height = parseInt(formidableFileRes.height, 10)

    const resizedImage = sharp(file.filepath).resize({
      width,
      height,
    })
    const resizedImageBuffer = await resizedImage.toBuffer()
    const resizedImageFile = resizedImageBuffer.toString('base64')

    return resizedImageFile
  } catch (error: any) {
    throw new Error(error)
  }
}

const readFile = (req: NextApiRequest) => {
  const form = formidable()
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
      }

      resolve({ file: files.file, ...fields })
    })
  })
}
