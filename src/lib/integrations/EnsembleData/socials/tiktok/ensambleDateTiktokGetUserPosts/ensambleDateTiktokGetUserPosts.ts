import assert from '@useweb/assert'

import ensembleDataFetcher from '../../../utils/ensembleDataFetcher/ensembleDataFetcher.js'

import type { EnsambleDateTiktokGetUserPostsReturnSchema } from './EnsambleDateTiktokGetUserPostsReturnSchema/EnsambleDateTiktokGetUserPostsReturn.schema.js'
import { ensambleDateTiktokGetUserPostsStubs } from './ensambleDateTiktokGetUserPosts.stubs.js'

export type EnsambleDateTiktokGetUserPostsProps = {
  username: string
  depth?: number
  start_cursor?: number
}

export default async function ensambleDateTiktokGetUserPosts(
  props: EnsambleDateTiktokGetUserPostsProps,
): EnsambleDateTiktokGetUserPostsReturn {
  assert<EnsambleDateTiktokGetUserPostsProps>({ props, requiredProps: ['username'] })

  // prevent using credits quota in development
  if (process.env.NODE_ENV === 'development') {
    return {
      data: ensambleDateTiktokGetUserPostsStubs,
      dataWithoutPinnedPosts: ensambleDateTiktokGetUserPostsStubs,
    }
  }

  // https://ensembledata.com/apis/docs#tag/Tiktok/operation/user_posts_from_username_tt_user_posts_get
  const data =
    (await ensembleDataFetcher<
      EnsambleDateTiktokGetUserPostsProps,
      EnsambleDateTiktokGetUserPostsReturnSchema
    >({
      endpoint: '/tt/user/posts',
      payload: {
        username: props.username,
        depth: props.depth || 1,
        start_cursor: props.start_cursor || 0,
      },
    })) || []

  const dataWithoutPinnedPosts = data.filter((post) => !post.is_top) || []

  return { data, dataWithoutPinnedPosts }
}

export type EnsambleDateTiktokGetUserPostsReturn = Promise<{
  data: EnsambleDateTiktokGetUserPostsReturnSchema
  dataWithoutPinnedPosts: EnsambleDateTiktokGetUserPostsReturnSchema
}>
