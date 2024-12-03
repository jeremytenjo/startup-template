import useData from '@useweb/use-data'

import _fetchPrismic, { type FetchPrismicProps } from '../fetchPrismic.js'

import logError from '@/src/lib/utils/loggers/logError/logError'

export type UseFetchPrismicProps = { id: string } & FetchPrismicProps

export const getFetchPrismicDataId = (props: Partial<UseFetchPrismicProps>) => {
  const dataId = props.id ? `fetchPrismic/${props.id}` : undefined

  return {
    id: dataId,
  }
}

export default function useFetchPrismic<
  // get schema from prismicio-types.d.js
  Schema extends {
    data: any
  },
>(props: UseFetchPrismicProps) {
  const fetchPrismic = useData<
    Awaited<{
      id: string
      data: Awaited<Schema>['data']
    }>,
    FetchPrismicProps
  >({
    id: getFetchPrismicDataId(props).id,
    get: {
      fetcher: async () => {
        const fetchPrismicRes = await _fetchPrismic<Schema>(props as FetchPrismicProps)

        if (fetchPrismicRes.data && props.id) {
          return [{ id: props.id, data: fetchPrismicRes?.data?.data }]
        }

        return []
      },
      onGetError({ error }) {
        logError({
          error,
          fnName: `useFetchPrismic - ${props.id}`,
          metadata: { props, error },
        })
      },
    },
  })

  return fetchPrismic
}

export type UseFetchPrismicReturn = ReturnType<typeof useFetchPrismic>
