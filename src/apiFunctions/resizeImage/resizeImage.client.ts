import base64ToBlob from '@useweb/base64-to-blob'

import nextApi from '../../lib/utils/nextjs/nextApi/nextApi.js'

export type ResizeImageProps = {
  file: File
  width: number
  height: number
}

export default async function resizeImageClient(props: ResizeImageProps) {
  const formData = new FormData()

  formData.append('file', props.file)
  formData.append('width', props.width.toString())
  formData.append('height', props.height.toString())

  const data = await nextApi({
    name: 'resizeImage',
    formData,
  })

  const base64 = `data:image;base64,${data.data}`

  const blob = await base64ToBlob({
    base64,
  })

  // base64 to image file
  const resizedImage = await fetch(base64)
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], props.file.name, { type: props.file.type })
      return file
    })

  return {
    data: {
      resizedImage,
      blob,
    },
  }
}
