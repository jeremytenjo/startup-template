import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  // Feed Component
  {
    path: ({ name, helpers }) => {
      const fileName = `${helpers?.changeCase.pascalCase(name)}`
      return `${fileName}.tsx`
    },

    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase.pascalCase(name) || ''

      return `import React from 'react'
      import type { InfiniteListProps } from '@useweb/ui/InfiniteList'
      import InfiniteList from '@useweb/ui/InfiniteList'
      import { useInfiniteListCache } from '@useweb/use-infinite-list'
      import { createUseDataId } from '@useweb/use-data'

      import ${pascalName}Item from './components/${pascalName}Item/${pascalName}Item.js'
      
      import logError from '@/lib/utils/loggers/logError/logError.js'
      
      export type ${pascalName}Props = {
        sx?: InfiniteListProps<any>['sx']
      }

     export type ${pascalName}DataSchema = any

     export const get${pascalName}DataId = () => {
  return createUseDataId({
    name: '${pascalName}',
    props: {},
  })
}      
      export default function ${pascalName}(props: ${pascalName}Props) {
        return (
          <InfiniteList<${pascalName}DataSchema>
            dataId={get${pascalName}DataId().id}
            loading={false}
            fetcher={async (p) => {
              return {
                data: [],
                nextCursor: null,
                totalSize: 0,
              }
            }}
            itemComponent={(p) => {
              return <${pascalName}Item item={p.data} />
            }}
            sx={{
              ...props.sx,
            }}
            listSx={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            }}
            loadingComponent={<${pascalName}Item loading item={undefined} />}
            onGetError={(p) => {
              logError({
                error: p.error,
                fnName: '${pascalName}',
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


export function use${pascalName}() {
  const infiniteListCache = useInfiniteListCache()

  const revalidate = () => {
    infiniteListCache.revalidate({
      id: get${pascalName}DataId().id || '',
    })
  }

  return {
    revalidate,
  }
}
      `
    },
  },
  // Feed Item Component
  {
    path: ({ name, helpers }) => {
      const fileName = `${helpers?.changeCase.pascalCase(name)}Item`
      return `/components/${fileName}/${fileName}.tsx`
    },

    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase.pascalCase(name)

      return `import React from 'react'
      import Box, { type BoxProps } from '@useweb/ui/Box'
      import Text from '@useweb/ui/Text'
      import Skeleton from '@useweb/ui/Skeleton'

      import type { ${pascalName}DataSchema } from '../../${pascalName}.js'
      
      export type ${pascalName}ItemProps = {
        item: ${pascalName}DataSchema | undefined
        loading?: boolean
        sx?: BoxProps['sx']
      }
      
      export default function ${pascalName}Item(
        props: ${pascalName}ItemProps,
      ) {
        return (
          <Box data-id='${pascalName}Item' sx={{ ...props.sx }}>
          <Skeleton loading={props.loading}>
            <Text text={'${pascalName}Item'} tag='p' sx={{}} />
          </Skeleton>
          </Box>
        )
      }
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Infinite Feed',
  files,
}

export default template
