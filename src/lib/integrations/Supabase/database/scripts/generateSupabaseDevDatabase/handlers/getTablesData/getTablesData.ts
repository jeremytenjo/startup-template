import path from 'path'

import pluralize from 'pluralize'
import tsj from 'ts-json-schema-generator'

import generateSupabaseDevDatabaseConfig from '../../generateSupabaseDevDatabase.config.js'
import glob from '../../../../../../../../../devtools/utils/node/glob.js'

export type GetTablesDataTablesProps<DataSchema = any> = {
  name: string
  data: any[]
  schemaProps: object
  references: object | undefined
  genOrder: number
  disablePrimaryKeyAutoGeneration: boolean
  customTablePropDataType: {
    [key in keyof DataSchema]?: any
  }
  createHyperTable: {
    tableName: string
    timeProperty: string
  }
}[]

export default async function getTablesData() {
  try {
    const pattern = path.join(process.cwd(), 'src', 'data', '**', '*.stubs.ts')
    const stubsData = await glob({
      pattern,
    })

    const tables: GetTablesDataTablesProps = []

    await Promise.all(
      stubsData.map(async (stubPath) => {
        const [name] = stubPath.split('/').pop()?.split('.') || []

        try {
          if (generateSupabaseDevDatabaseConfig.tables.some((t) => t.name === name)) {
            const { default: data } = await import(stubPath)
            const schemaPath = stubPath.replace(
              `${name}.stubs`,
              `${pluralize.singular(name)}.schema`,
            )
            const config = {
              path: schemaPath,
              tsconfig: path.join(process.cwd(), 'tsconfig.json'),
              type: '*',
            }
            try {
              const schema = tsj.createGenerator(config).createSchema(config.type) as any

              const schemaProps =
                schema.definitions[Object.keys(schema.definitions)[0]]?.properties

              if (!schemaProps) {
                throw new Error(
                  `schemaFile ${config.path} is not exporting a named type `,
                )
              }

              const schemaFile = await import(config.path)

              // gen order is required, use when a table needs to be created after another if it has a reference to it
              if (!schemaFile.genOrder) {
                throw new Error(`schemaFile ${config.path} is missing genOrder export`)
              }

              tables.push({
                name,
                data,
                schemaProps,
                ...schemaFile,
              })
            } catch (error: any) {
              throw new Error(String(error), {
                cause: { config, ...error?.cause },
              })
            }
          }
        } catch (error: any) {
          throw new Error(String(error), {
            cause: {
              stubPath,
              ...error?.cause,
              hint: String(error).includes('Invalid index')
                ? `Make sure you do not import types withing ${name}.schema `
                : '',
            },
          })
        }
      }),
    )

    return {
      tables,
    }
  } catch (error: any) {
    throw new Error(String(error), { cause: error?.cause })
  }
}

export type GetTablesDataReturn = ReturnType<typeof getTablesData>
