import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name }) => {
      const fileName = `${name}`
      return `${fileName}/${fileName}/ts`
    },
    template: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase.pascalCase(name)

      return `import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import type { CustomMessageComponentPropsRules } from '../customMessageComponents.config.js'
import type RobloxGameTransactionSchema from '../../../../../robloxGameTransactions/robloxGameTransaction.schema.js'
import useRobloxGameTransactionFullData from '../../../../../robloxGameTransactions/utils/useRobloxGameTransactionFullData/useRobloxGameTransactionFullData.js'

export type ${namePascalCase}Props = CustomMessageComponentPropsRules<{
  robloxGameTransactionId: RobloxGameTransactionSchema['id']
}>

export default function ${namePascalCase}(
  props: ${namePascalCase}Props,
) {
  const tran = useRobloxGameTransactionFullData({
    robloxGameTransactionId: props.robloxGameTransactionId,
  })

  return (
    <Box data-id='${namePascalCase}' sx={{}}>
      <Text text={'${namePascalCase}'} tag='p' sx={{}} />
    </Box>
  )
}`
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Custom Message Component',
  files,
}

export default template
