import pluralize from 'pluralize'
import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

import createSchemaName from '../../utils/createSchemaName/createSchemaName.js'
import type { UpdateSupabaseConfigProps } from '../../utils/updateSupabaseConfig/updateSupabaseConfig.js'
import updateSupabaseConfig from '../../utils/updateSupabaseConfig/updateSupabaseConfig.js'
import type { UpdateFirestoreConfigProps } from '../../utils/updateFirestoreConfig/updateFirestoreConfig.js'
import updateFirestoreConfig from '../../utils/updateFirestoreConfig/updateFirestoreConfig.js'

import dataQuery from './dataQuery.js'

function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

type CustomProps = {
  folderPath: string
}

type ParamsSchema = {
  databaseType: 'supabase' | 'firestore'
}

const files: SuperCodeGeneratorFilesSchema<CustomProps, ParamsSchema> = [
  // schema
  {
    path: ({ name, helpers }) => {
      const nameSingle = helpers?.changeCase?.pascalCase(pluralize.singular(name))
      return `${lowercaseFirstLetter(nameSingle)}.schema.ts`
    },
    template: ({ name }) => {
      const schemaName = createSchemaName({ name }).schemaName

      return `
      export type ${schemaName} = {
        id: string
        uid: string
        name: string
      }
      `
    },
  },

  // stubs
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      return `${camelCase}.stubs.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const nameSingle = pluralize.singular(name)
      const schemaName = createSchemaName({ name }).schemaName

      return `
      import { type ${schemaName} } from './${lowercaseFirstLetter(nameSingle)}.schema.js'
          
      const ${camelCase}Stubs: ${schemaName}[] = []
      
      export default ${camelCase}Stubs
`
    },
  },

  // config
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      return `${camelCase}.config.ts`
    },
    template: ({ name, helpers, params }) => {
      let collectionName = name
      const camelCase = helpers?.changeCase?.camelCase(name)

      if (params?.databaseType === 'firestore') {
        collectionName = pluralize.plural(camelCase)
      }

      if (params?.databaseType === 'supabase') {
        collectionName = helpers?.changeCase?.snakeCase(name) || collectionName
      }

      return `export const ${camelCase}CollectionName = '${collectionName}'`
    },
  },

  // Queries

  {
    path: () => {
      return `queries/readme.md`
    },
    template: () => {
      return `Use this folder to add 'Data Queries'`
    },
  },

  // Fetch List Data
  ...dataQuery.files,
]

const template: SuperCodeGeneratorTemplateSchema<CustomProps, ParamsSchema> = {
  type: 'Data',
  files,
  hooks: {
    async onCreate(props) {
      if (props.params?.databaseType === 'supabase') {
        const updateProps: UpdateSupabaseConfigProps = {
          componentName: props.componentName,
          outputPath: props.outputPath,
          workspacePath: props.workspacePath,
        }
        await updateSupabaseConfig(updateProps)
      }

      if (props.params?.databaseType === 'firestore') {
        const updateProps: UpdateFirestoreConfigProps = {
          componentName: props.componentName,
          outputPath: props.outputPath,
          workspacePath: props.workspacePath,
        }
        await updateFirestoreConfig(updateProps)
      }
    },
  },
  params: [
    {
      name: 'databaseType',
      type: 'dropdown',
      description: 'Select the database type',
      options: [
        {
          value: 'supabase',
        },
        {
          value: 'firestore',
        },
      ],
    },
  ],
}

export default template
