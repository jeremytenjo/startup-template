import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  // component
  {
    path: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `${namePascalCase}.tsx`
    },
    template: ({ helpers, name }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import Text from '@useweb/ui/Text'
      import Skeleton from '@useweb/ui/Skeleton'
      import InfiniteTable from '@useweb/ui/InfiniteTable'
      import TableRow from '@useweb/ui/TableRow'
      import logError from '@/src/lib/utils/loggers/logError/logError.js'
      import useAuth from '@/src/data/users/utils/useAuth/useAuth.js'
      
      import get${namePascalCase} from './get${namePascalCase}/get${namePascalCase}.js'

      const getDataId = () => {
        const id = '${nameCamelCase}'
      
        return { id }
      }
      
      export default function ${namePascalCase}() {
        const auth = useAuth()
        const gridTemplateColumns = '1fr 90px'
      
        return (
          <InfiniteTable<DataSchema>
            dataId={getDataId().id}
            gridTemplateColumns={gridTemplateColumns}
            currentUserUid={auth.user?.id}
            loading={!auth.user?.id}
            fetcher={async (p) => {
              const data = await get${namePascalCase}({
                latestCursor: p.latestCursor,
                totalSize: p.totalSize,
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
                        content: 'hello',
                      },
                      {
                        content: <ActionsColumn />,
                        sx: {
                          justifyContent: 'flex-end',
                        },
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
                fnName: '${namePascalCase}',
                metadata: { },
              })
            }}
          />
        )
      }
      
      const ActionsColumn = (props: any) => {
        return (
          <Box
            data-id='Actions'
            sx={{}}
          >
            <Skeleton loading>
              action
            </Skeleton>
          </Box>
        )
      }`
    },
  },

  // fetcher
  {
    path: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `get${namePascalCase}/get${namePascalCase}.tsx`
    },
    template: ({ helpers, name }) => {
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
      import type { InfiniteTableFetcherProps } from '@useweb/ui/InfiniteTable'
      
      import { db } from '@/src/lib/integrations/Google/Firebase/firebase'
      
      export type Get${namePascalCase}Props = InfiniteTableFetcherProps
      
      export default async function get${namePascalCase}(props: Get${namePascalCase}Props) {
        const data: DataSchema[] = []
        const constraints: QueryConstraint[] = []
        const coll = query(collection(db, dataCollectionName))
      
        let totalSize = 0
      
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
      }`
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Infinite Table',
  files,
}

export default template
