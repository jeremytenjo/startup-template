import path from 'path'

import assert from '@useweb/assert'

import type { CloneThisProjectContextSchema } from '../../CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'
import removeFolder from '../../../../../devtools/utils/node/removeFolder.js'
import createFile from '../../../../../devtools/utils/node/createFile.js'

export type CloneThisProjectOverrideComponentsProps = {
  cloneThisProjectContext: CloneThisProjectContextSchema
}

export default async function cloneThisProjectOverrideComponents(
  props: CloneThisProjectOverrideComponentsProps,
) {
  assert<CloneThisProjectOverrideComponentsProps>({
    props,
    requiredProps: ['cloneThisProjectContext'],
  })

  // RootLayout
  const rootLayoutPath = path.join(
    props.cloneThisProjectContext.cloneProjectPath,
    'src',
    'lib',
    'layouts',
    'RootLayout',
    'containers',
  )

  await removeFolder({
    folderPath: rootLayoutPath,
  })

  await createFile({
    filePath: path.join(rootLayoutPath, 'RootHeader', 'RootHeader.tsx'),
    fileContent: `import React from 'react'
import Box from '@useweb/ui/Box'
import AppHeader from '@useweb/ui/AppHeader'

export type RootHeaderProps = any

export default function RootHeader() {
    return  <AppHeader
        mobileHeaderProps={{
          content: <>RootHeaderMobileContent</>,
          drawerContent: <>RootHeaderMobileDrawerContent</>,
        }}
        desktopHeaderProps={{
          content: <>RootHeaderDesktopContent</>,
        }}
      />
}
    `,
    overwrite: true,
    noTimestamp: true,
  })

  await createFile({
    filePath: path.join(rootLayoutPath, 'RootFooter', 'RootFooter.tsx'),
    fileContent: `import React from 'react'
import Box from '@useweb/ui/Box'

export type RootFooterProps = any

export default function RootFooter() {
    return <Box data-id='RootFooter'>
        RootFooter
    </Box>
}
    `,
    overwrite: true,
    noTimestamp: true,
  })
}

export type CloneThisProjectOverrideComponentsReturn = ReturnType<
  typeof cloneThisProjectOverrideComponents
>
