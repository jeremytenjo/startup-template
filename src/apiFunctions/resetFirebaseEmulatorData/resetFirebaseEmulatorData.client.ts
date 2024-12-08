import type {
  ResetFirebaseEmulatorDataProps,
  ResetFirebaseEmulatorDataReturn,
} from './resetFirebaseEmulatorData.raw.js'

import nextApi from '@/src/lib/utils/nextjs/nextApi/nextApi'

export type { ResetFirebaseEmulatorDataProps, ResetFirebaseEmulatorDataReturn }

export default async function resetFirebaseEmulatorDataClient(
  props: ResetFirebaseEmulatorDataProps,
) {
  const res = await nextApi<
    ResetFirebaseEmulatorDataReturn,
    ResetFirebaseEmulatorDataProps
  >({
    name: 'firebase/emulators/resetFirebaseEmulatorData',
    payload: props,
  })

  if (res.error) {
    throw new Error(res.error)
  }

  return res
}
