import assert from '@useweb/assert'
import type { Storage as AdminStorage } from 'firebase-admin/storage'

import getFilesInFolder from '../../../../../../utils/node/getFilesInFolder/getFilesInFolder.js'

export type AddStorageEmulatorDataProps = { storage: AdminStorage }

export default async function addStorageEmulatorData(props: AddStorageEmulatorDataProps) {
  assert<AddStorageEmulatorDataProps>({ props, requiredProps: ['storage'] })

  const emulatorFilesPath = 'src/lib/integrations/Google/Firebase/emulator/storage/files'

  const storageEmulatorFolderHasFiles = await getFilesInFolder({
    path: emulatorFilesPath,
  })

  await Promise.all(
    storageEmulatorFolderHasFiles.files.map(async (file: string) => {
      const bucket = props.storage.bucket()
      const fileName = file.split(emulatorFilesPath)[1]

      await bucket.upload(file, {
        destination: fileName,
      })
    }),
  )
}
