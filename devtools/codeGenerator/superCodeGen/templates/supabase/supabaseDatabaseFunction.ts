import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
  SuperCodeGeneratorFileProps,
} from '@jeremytenjo/super-code-generator'

import addRouteToApi from '../../utils/addRouteToApi/addRouteToApi.js'
import type { FunctionWithFirebaseCloudFunctionConsumerParamsSchema } from '../functions/functionWithFirebaseCloudFunctionConsumer.js'
import functionWithFirebaseCloudFunctionConsumer from '../functions/functionWithFirebaseCloudFunctionConsumer.js'

export const supabaseDatabaseFunctionIndexFile = (props: SuperCodeGeneratorFileProps) => {
  const nameCamelCase = props.helpers?.changeCase?.camelCase(props.name)
  const namePascalCase = props.helpers?.changeCase?.pascalCase(props.name)
  const nameSnakeCase = props.helpers?.changeCase?.snakeCase(props.name)

  return {
    path: `${nameCamelCase}.supabaseDatabaseFunction.ts`,
    template: `export type ${namePascalCase}SupabaseFunctionProps = any

export const ${nameCamelCase}SupabaseFunctionFunctionName = '${nameSnakeCase}'

const getProp = (prop: keyof ${namePascalCase}SupabaseFunctionProps) => {
  return \`\${${nameCamelCase}SupabaseFunctionFunctionName}.\${prop}\`
}

const getColumn = (key: keyof DataSchema) => {
  return \`function_alias."\${key}"\`
}

// use in the FROM clause
const tableDeclaration = \`\${collectionName} function_alias\`

export default function ${nameCamelCase}SupabaseFunction(): SupabaseDatabaseFunctionSchema {
  return {
    name: ${nameCamelCase}SupabaseFunctionFunctionName,
    fn: \`/* SQL */
    
\`,
  }
}

export type ${namePascalCase}SupabaseFunctionReturn = any

export async function ${nameCamelCase}SupabaseFunctionClient(
  props: ${namePascalCase}SupabaseFunctionProps,
) {
  const res =
    await callSupabaseDatabaseFunction<${namePascalCase}SupabaseFunctionProps>(
      {
        functionName: ${nameCamelCase}SupabaseFunctionFunctionName,
        functionProps: props,
      },
    )

  return res as ${namePascalCase}SupabaseFunctionReturn
}
`,
  }
}

const files: SuperCodeGeneratorFilesSchema<
  any,
  FunctionWithFirebaseCloudFunctionConsumerParamsSchema
> = [
  // supabaseDatabaseFunctionIndexFile
  {
    path: (props) => {
      return supabaseDatabaseFunctionIndexFile(props).path
    },
    template: (props) => {
      return supabaseDatabaseFunctionIndexFile(props).template
    },
  },

  // remove index
  ...functionWithFirebaseCloudFunctionConsumer.files.slice(1),

  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `${fileName}.ts`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import assert from '@useweb/assert'

import { ${nameCamelCase}SupabaseFunctionClient } from './${nameCamelCase}.supabaseDatabaseFunction.js'

export type ${namePascalCase}Props = {
  name: string
}

export default async function ${nameCamelCase}(
  props: ${namePascalCase}Props,
) {
  assert<${namePascalCase}Props,>({
    props,
    requiredProps: ['name'],
  })

  const res = await ${nameCamelCase}SupabaseFunctionClient({
    name: props.name,
  })

  return { res }
}

export type ${namePascalCase}Return = ReturnType<
  typeof ${nameCamelCase}
>`
    },
  },
]

const supabaseDatabaseFunction: SuperCodeGeneratorTemplateSchema<
  any,
  FunctionWithFirebaseCloudFunctionConsumerParamsSchema
> = {
  type: 'Supabase Database Function',
  files,
  hooks: {
    async onCreate(props) {
      await addRouteToApi({
        outputPath: props.outputPath,
        name: props.componentName,
        cloudFunctionName: 'supabaseDatabaseApi',
        workspacePath: props.workspacePath,
      })
    },
  },
  defaultParams: {
    cloudFunctionName: 'supabaseDatabaseApi',
  },
}

export default supabaseDatabaseFunction
