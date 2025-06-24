import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}.ts`

      return `${fileName}`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import { getSupabasePaginatedData } from '@useweb/supabase'
import type {
  InfiniteListFetcherProps,
  InfiniteListFetcherReturn,
} from '@useweb/ui/InfiniteList'

import getSupabaseClientServer from '../../../../lib/integrations/Supabase/utils/supabase.client.server.js'

export type ${namePascalCase}Props = InfiniteListFetcherProps

export default async function ${nameCamelCase}(
  props: ${namePascalCase}Props,
): ${namePascalCase}Return {
  const { supabaseClientServer } = getSupabaseClientServer()

  // Get Total Size
  let totalSize = props.totalSize
  if (!totalSize) {
    const totalSizeQuery = supabaseClientServer
      .from(collectionName)
      .select('id', { count: 'exact' })

    const totalSizeDataRes = await totalSizeQuery
    if (totalSizeDataRes.error) {
      throw new Error('Error getting total size', {
        cause: totalSizeDataRes.error,
      })
    }

    totalSize = totalSizeDataRes.count ?? 0
  }

  // Create Query
  let query = supabaseClientServer
    .from(collectionName)
    .select('*', { count: 'exact' })

  // Execute Query
  const { data, nextCursor } = await getSupabasePaginatedData<DataSchema,>({
    query,
    itemsPerPage: 10,
    latestCursor: props.latestCursor,
  })

  return { data, nextCursor, totalSize }
}

export type ${namePascalCase}Return = Promise<InfiniteListFetcherReturn<DataSchema>>
`
    },
  },
]

const supabasePaginationFunction: SuperCodeGeneratorTemplateSchema = {
  type: 'Supabase Pagination Function',
  files,
}

export default supabasePaginationFunction
