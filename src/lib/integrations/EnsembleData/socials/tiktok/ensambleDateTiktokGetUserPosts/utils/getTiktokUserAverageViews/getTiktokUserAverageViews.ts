import assert from '@useweb/assert'

import type { EnsambleDateTiktokGetUserPostsReturn } from '../../ensambleDateTiktokGetUserPosts.js'
import calcAverageViews from '../../../../../../../utils/math/calcAverageViews/calcAverageViews.js'

export type GetTiktokUserAverageViewsProps = {
  ensambleDateTiktokGetUserPostsReturn: Awaited<EnsambleDateTiktokGetUserPostsReturn>
}

export default function getTiktokUserAverageViews(
  props: GetTiktokUserAverageViewsProps,
): GetTiktokUserAverageViewsReturn {
  assert<GetTiktokUserAverageViewsProps>({
    props,
    requiredProps: ['ensambleDateTiktokGetUserPostsReturn'],
  })

  if (!props.ensambleDateTiktokGetUserPostsReturn.dataWithoutPinnedPosts.length) {
    return {
      averageViews: 0,
    }
  }

  const dataByGroupId =
    props.ensambleDateTiktokGetUserPostsReturn.dataWithoutPinnedPosts.sort(
      (a, b) => Number(b.group_id) - Number(a.group_id),
    )

  const latest4Videos = dataByGroupId.slice(0, 4)

  const totalPlayCount = latest4Videos.reduce(
    (acc, curr) => acc + curr.statistics.play_count,
    0,
  )

  const { averageViews } = calcAverageViews({
    total: totalPlayCount,
    size: latest4Videos.length,
  })

  return { averageViews }
}

export type GetTiktokUserAverageViewsReturn = {
  averageViews: number
}
