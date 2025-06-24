import pluralize from 'pluralize'
import changeCase from 'change-case'

export type CreateSchemaNameProps = { name: string }

export default function createSchemaName(props: CreateSchemaNameProps) {
  const nameSingle = pluralize.singular(props.name)
  const nameSinglePascal = changeCase?.pascalCase(nameSingle)
  const schemaName = `${nameSinglePascal}Schema`

  return { schemaName }
}

export type CreateSchemaNameReturn = ReturnType<typeof createSchemaName>
