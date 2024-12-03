import path from 'path'

import assert from '@useweb/assert'

import type { CloneThisProjectContextSchema } from '../../CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'
import removeFolder from '../../../../../devtools/utils/node/removeFolder.js'
import getRootFoldersAndFiles from '../../../../../devtools/utils/node/getRootFoldersAndFiles/getRootFoldersAndFiles.js'
import createFile from '../../../../../devtools/utils/node/createFile.js'

export type CloneThisProjectRemovePosthogEventsProps = {
  cloneThisProjectContext: CloneThisProjectContextSchema
}

export default async function cloneThisProjectRemovePosthogEvents(
  props: CloneThisProjectRemovePosthogEventsProps,
) {
  assert<CloneThisProjectRemovePosthogEventsProps>({
    props,
    requiredProps: ['cloneThisProjectContext'],
  })

  const postHogFolderPath = path.join(
    props.cloneThisProjectContext.cloneProjectPath,
    'src',
    'lib',
    'integrations',
    'PostHog',
  )

  // Browser Events
  const browserEventsPath = path.join(postHogFolderPath, 'events', 'browser')
  const { filesAndFolders: filesAndFoldersBrowser } = await getRootFoldersAndFiles({
    dirPath: browserEventsPath,
  })

  await Promise.all(
    filesAndFoldersBrowser.map(async (folder: string) => {
      // Edit these files
      if (folder.includes('ph_userSignedUp')) {
        const filePath = path.join(
          browserEventsPath,
          'ph_userSignedUp',
          `ph_userSignedUp.ts`,
        )

        await createFile({
          filePath,
          overwrite: true,
          noTimestamp: true,
          fileContent: `import assert from '@useweb/assert'

import type UserSchema from '../../../../../../data/users/user.schema.js'

import postHog from '@/src/lib/integrations/PostHog/postHog'

export type PH_UserSignedUpProps = { newUser: UserSchema }

export default async function ph_userSignedUp(props: PH_UserSignedUpProps) {
  assert<PH_UserSignedUpProps>({
    props,
    requiredProps: ['newUser'],
  })

  postHog({
    eventName: 'user_signed_up',
    data: {
      ...props.newUser,
      metadata: { ...props.newUser },
    },
  })
}

export type PH_UserSignedUpReturn = ReturnType<typeof ph_userSignedUp>`,
        })
      }

      // Don't remove these folders
      if (
        !folder.includes('readme.md') &&
        !folder.includes('usePostHogSendPageView') &&
        !folder.includes('postHogEventClick') &&
        !folder.includes('ph_error')
      ) {
        // Remove the rest
        await removeFolder({
          folderPath: path.join(browserEventsPath, folder),
        })
      }
    }),
  )

  // Node Events
  const nodeEventsPath = path.join(postHogFolderPath, 'events', 'node')
  const { filesAndFolders: filesAndFoldersNode } = await getRootFoldersAndFiles({
    dirPath: nodeEventsPath,
  })

  await Promise.all(
    filesAndFoldersNode.map(async (folder: string) => {
      if (!folder.includes('readme.md') && !folder.includes('nodePhError')) {
        await removeFolder({
          folderPath: path.join(nodeEventsPath, folder),
        })
      }
    }),
  )
}

export type CloneThisProjectRemovePosthogEventsReturn = ReturnType<
  typeof cloneThisProjectRemovePosthogEvents
>
