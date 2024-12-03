import assert from '@useweb/assert'

import ensembleDataFetcher from '../../../utils/ensembleDataFetcher/ensembleDataFetcher.js'

import ensambleDataTiktokGetUserInfoFromUsernameStubs from './ensambleDataTiktokGetUserInfoFromUsernameSchema/ensambleDataTiktokGetUserInfoFromUsername.stubs.js'
import type { ensambleDataTiktokGetUserInfoFromUsernameSchema } from './ensambleDataTiktokGetUserInfoFromUsernameSchema/ensambleDataTiktokGetUserInfoFromUsername.schema.js'

export type EnsambleDataTiktokGetUserInfoFromUsernameProps = { username: string }

export default async function ensambleDataTiktokGetUserInfoFromUsername(
  props: EnsambleDataTiktokGetUserInfoFromUsernameProps,
): EnsambleDataTiktokGetUserInfoFromUsernameReturn {
  assert<EnsambleDataTiktokGetUserInfoFromUsernameProps>({
    props,
    requiredProps: ['username'],
  })

  // prevent using credits quota in development
  if (process.env.NODE_ENV === 'development') {
    return {
      data: ensambleDataTiktokGetUserInfoFromUsernameStubs,
    }
  }

  // https://ensembledata.com/apis/docs#tag/Tiktok/operation/user_info_from_username_tt_user_info_get
  const data =
    (await ensembleDataFetcher<
      EnsambleDataTiktokGetUserInfoFromUsernameProps,
      EnsambleDataTiktokGetUserInfoFromUsernameReturn
    >({
      endpoint: '/tt/user/info',
      payload: {
        username: props.username,
      },
    })) || []

  console.log('data', data)

  return { data: data.data }
}

export type EnsambleDataTiktokGetUserInfoFromUsernameReturn = Promise<{
  data: ensambleDataTiktokGetUserInfoFromUsernameSchema
}>
