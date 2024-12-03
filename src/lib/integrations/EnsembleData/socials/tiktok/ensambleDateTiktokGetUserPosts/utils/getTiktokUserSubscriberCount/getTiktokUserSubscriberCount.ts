import assert from '@useweb/assert'

import type { EnsambleDateTiktokGetUserPostsReturn } from '../../ensambleDateTiktokGetUserPosts.js'

export type GetTiktokUserSubscriberCountProps = {
  ensambleDateTiktokGetUserPostsReturn: Awaited<EnsambleDateTiktokGetUserPostsReturn>
}

export default function getTiktokUserSubscriberCount(
  props: GetTiktokUserSubscriberCountProps,
): GetTiktokUserSubscriberCountReturn {
  assert<GetTiktokUserSubscriberCountProps>({
    props,
    requiredProps: ['ensambleDateTiktokGetUserPostsReturn'],
  })

  if (!props.ensambleDateTiktokGetUserPostsReturn.dataWithoutPinnedPosts.length) {
    return {
      subscriberCount: 0,
    }
  }

  const subscriberCount =
    props.ensambleDateTiktokGetUserPostsReturn.dataWithoutPinnedPosts?.[0].author
      ?.follower_count || 0

  return { subscriberCount }
}

export type GetTiktokUserSubscriberCountReturn = {
  subscriberCount: number
}
