import assert from '@useweb/assert'
import { uploadFile } from '@useweb/firebase/useFirebaseStorage'

import resizeImageClient from '../../../../../../../apiFunctions/resizeImage/resizeImage.client.js'

export type UploadProfilePhotoProps = {
  file: File
  fileName: string
  displayName: string
  storageFolderRoot?: string
}

export default async function uploadProfilePhoto(props: UploadProfilePhotoProps) {
  assert<UploadProfilePhotoProps>({ props, requiredProps: ['file'] })

  const {
    data: { resizedImage },
  } = (await resizeImageClient({
    file: props.file,
    width: 350,
    height: 350,
  })) || { data: undefined }

  if (!resizedImage) {
    throw new Error(`Failed to resize ${props.fileName}`)
  }

  const fileFolderId = `${props?.displayName}_${Math.round(Math.random()).toFixed(0)}`

  const { downloadUrl } = await uploadFile({
    file: resizedImage,
    storageFolder: `${props.storageFolderRoot || 'profilePhotos'}/${fileFolderId}`,
  })

  return { downloadUrl }
}

export type UploadProfilePhotoReturn = ReturnType<typeof uploadProfilePhoto>
