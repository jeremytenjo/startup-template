import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  // Function
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}.ts`

      return `${fileName}`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import type {
  InfiniteListFetcherProps,
  InfiniteListFetcherReturn,
} from '@useweb/ui/InfiniteList'

export type ${namePascalCase}Props = InfiniteListFetcherProps

export default async function ${nameCamelCase}(
  props: ${namePascalCase}Props,
): ${namePascalCase}Return {
  // Query Data
  const data: DataSchema[] = []

// Get Total Size
let totalSize = props.totalSize
if (!totalSize) {
  // get totalSize
  totalSize = 0
  }

  // Pagination
  const nextCursor = 0

  return { data, nextCursor, totalSize }
}

export type ${namePascalCase}Return = Promise<InfiniteListFetcherReturn<DataSchema>>

`
    },
  },

  // Component - Feed
  {
    path: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      const fileName = `ui/${namePascalCase}/${namePascalCase}.tsx`

      return `${fileName}`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import React from 'react'
import type { InfiniteListProps } from '@useweb/ui/InfiniteList'
import InfiniteList from '@useweb/ui/InfiniteList'
import { useInfiniteListCache } from '@useweb/use-infinite-list'
import { createUseDataId } from '@useweb/use-data'

import ${nameCamelCase} from '../../${nameCamelCase}.js'

import ${namePascalCase}Item from './components/${namePascalCase}Item/${namePascalCase}Item.js'

import logError from '@/src/lib/utils/loggers/logError/logError.js'

export type SocialFeedProps = {
  sx?: InfiniteListProps<any>['sx']
}

export type SocialFeedDataSchema = DataSchema

export const create${namePascalCase}DataId = () => {
  return createUseDataId({
    name: 'SocialFeed',
    props: {},
  })
}

export default function SocialFeed(props: SocialFeedProps) {
  return (
    <InfiniteList<SocialFeedDataSchema>
      dataId={create${namePascalCase}DataId().id}
      loading={false}
      fetcher={async (p) => {
        const res = await ${nameCamelCase}({
          latestCursor: p.latestCursor,
          totalSize: p.totalSize,
        })

        return {
          data: res.data,
          nextCursor: res.nextCursor,
          totalSize: res.totalSize,
        }
      }}
      itemComponent={(p) => {
        return <${namePascalCase}Item item={p.data} />
      }}
      sx={{
        ...props.sx,
      }}
      listSx={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      }}
      loadingComponent={<${namePascalCase}Item loading item={undefined} />}
      onGetError={(p) => {
        logError({
          error: p.error,
          fnName: '${namePascalCase}',
          metadata: {
            p,
          },
        })
      }}
      emptyMessageProps={{
        title: 'No Items Found',
      }}
    />
  )
}

export function use${namePascalCase}() {
  const infiniteListCache = useInfiniteListCache()

  const revalidate = () => {
    infiniteListCache.revalidate({
      id: create${namePascalCase}DataId().id || '',
    })
  }

  return {
    revalidate,
  }
}
`
    },
  },

  // Component - Item
  {
    path: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      const fileName = `ui/${namePascalCase}/components/${namePascalCase}Item/${namePascalCase}Item.tsx`

      return `${fileName}`
    },
    template: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import React from 'react'
import Box, { type BoxProps } from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Skeleton from '@useweb/ui/Skeleton'

import type { SocialFeedDataSchema } from '../../${namePascalCase}.js'

export type ${namePascalCase}ItemProps = {
  item: SocialFeedDataSchema | undefined
  loading?: boolean
  sx?: BoxProps['sx']
}

export default function ${namePascalCase}Item(props: ${namePascalCase}ItemProps) {
  return (
    <Box data-id='${namePascalCase}Item' sx={{ ...props.sx }}>
      <Skeleton loading={props.loading}>
        <Text text={'${namePascalCase}Item'} tag='p' sx={{}} />
      </Skeleton>
    </Box>
  )
}
`
    },
  },
]

const functionWithFeed: SuperCodeGeneratorTemplateSchema = {
  type: 'Function With Feed',
  files,
}

export default functionWithFeed
