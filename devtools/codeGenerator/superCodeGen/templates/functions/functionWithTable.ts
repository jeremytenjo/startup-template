import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  // function
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)

      return `${nameCamelCase}.ts`
    },
    template: ({ helpers, name }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import type { QueryConstraint } from 'firebase/firestore'
        import {
          collection,
          getCountFromServer,
          getDocs,
          limit,
          query,
          startAfter,
        } from 'firebase/firestore'
        import type { InfiniteTableFetcherProps, InfiniteTableFetcherReturn } from '@useweb/ui/InfiniteTable'
        import assert from '@useweb/assert'
        
        import { db } from '@/src/lib/integrations/Google/Firebase/firebase'
  
        export type ${namePascalCase}FetcherPayload = any
        
        export type ${namePascalCase}Props = InfiniteTableFetcherProps<${namePascalCase}FetcherPayload>
        
        export default async function ${nameCamelCase}(props: ${namePascalCase}Props): ${namePascalCase}Return {
          assert({
            props: props.fetcherPayload,
            requiredProps: [],
          })
          const data: DataSchema[] = []
          const constraints: QueryConstraint[] = []
          const coll = query(collection(db, dataCollectionName))
        
          let totalSize = props.totalSize
          if (!totalSize) {
            const countquery = query(coll, ...constraints)
            const snapshot = await getCountFromServer(countquery)
            totalSize = snapshot.data().count
            }
        
          if (props.latestCursor) {
            constraints.push(startAfter(props.latestCursor))
          }
  
          constraints.push(limit(10))
        
          const q = query(coll, ...constraints)
        
          const querySnapshot = await getDocs(q)
        
          querySnapshot.forEach((doc) => {
            data.push(doc.data() as DataSchema)
          })
        
          const nextCursor = querySnapshot.docs[querySnapshot.docs.length - 1]
        
          return { data, nextCursor, totalSize }
        }
          
        export type ${namePascalCase}Return = Promise<
          InfiniteTableFetcherReturn<DataSchema>
        >
    `
    },
  },

  // table component
  {
    path: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const componentName = `${namePascalCase}Table`

      return `ui/${componentName}/${componentName}.tsx`
    },
    template: ({ helpers, name }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const componentName = `${namePascalCase}Table`

      return `import React from 'react'
      import Text from '@useweb/ui/Text'
      import InfiniteTable from '@useweb/ui/InfiniteTable'
      import TableRow from '@useweb/ui/TableRow'
      import { createUseDataId } from '@useweb/use-data'
      import type { PartialRequired } from '@useweb/use-data'
      
import ${nameCamelCase}, {
  type ${namePascalCase}FetcherPayload,
} from '../../${nameCamelCase}.js'     

      import logError from '@/src/lib/utils/loggers/logError/logError.js'
      import useAuth from '@/src/data/users/utils/useAuth/useAuth.js'

      type FetcherProps = PartialRequired<${namePascalCase}FetcherPayload>

      export const create${namePascalCase}DataId = (props: FetcherProps) => {
        const id = createUseDataId<${namePascalCase}FetcherPayload>({
          name: '${nameCamelCase}',
          props,
        })
        return id
      }

      export type ${componentName}Props = PartialRequired<${namePascalCase}FetcherPayload>
      
      export default function ${componentName}(props: ${componentName}Props) {
        const auth = useAuth()
        const gridTemplateColumns = '1fr 90px'
      
        return (
          <InfiniteTable<DataSchema, ${namePascalCase}FetcherPayload>
            dataId={create${namePascalCase}DataId(props).id}
            gridTemplateColumns={gridTemplateColumns}
            currentUserUid={auth.user?.id}
            loading={!auth.user?.id}
            fetcher={async (p) => {
              const data = await ${nameCamelCase}({
                latestCursor: p.latestCursor,
                totalSize: p.totalSize,
                fetcherPayload: props as ${namePascalCase}FetcherPayload,
              })
              return data
            }}
            headerProps={{
              columns: [
                {
                  content: <Text text={'User'} tag='h4' sx={{}} />,
                },
                {
                  content: <Text text={'Actions'} tag='h4' sx={{}} />,
                },
              ],
            }}
            list={({ dataListFn }) => {
              const data = dataListFn.data || []
      
              return data.map((item) => {
                return (
                  <TableRow
                    key={item.id}
                    gridTemplateColumns={gridTemplateColumns}
                    columns={[
                      {
                        content: 'HelloColumn',
                      },
                      {
                        content: 'HelloColumn',
                      },
                    ]}
                  />
                )
              })
            }}
            emptyMessageProps={{
              title: 'No ${namePascalCase} found',
            }}
            onGetError={({ error }) => {
              logError({
                error,
                fnName: '${componentName}',
                metadata: { },
              })
            }}
          />
        )
      }
  
`
    },
  },

  // columns readme
  {
    path: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const componentName = `${namePascalCase}Table`

      return `ui/${componentName}/columns/readme.md`
    },
    template: () => {
      return `# add columns here`
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Function with Table',
  files,
}

export default template
