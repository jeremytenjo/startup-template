import { useRouter } from 'next/router'
import type { StringifiableRecord } from 'query-string'
import queryString from 'query-string'

export default function useUrlQuery<URLQuerySchema extends StringifiableRecord>() {
  const router = useRouter()
  const parsed = queryString.parseUrl(router.asPath) as any
  const parsedUrlQuery = parsed.query as URLQuerySchema
  const urlString = queryString.stringifyUrl({
    url: router.asPath,
    query: parsedUrlQuery,
  })

  return { parsedUrlQuery, urlString }
}
