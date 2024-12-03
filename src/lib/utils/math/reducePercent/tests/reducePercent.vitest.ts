// https://vitest.dev/api/
import { expect, test } from 'vitest'

import reducePercent from '../reducePercent.js'

test('Success', async () => {
  const result = reducePercent({
    amount: 120,
    percent: 10,
  })

  const expected: ReturnType<typeof reducePercent> = {
    newAmount: 108,
    reductionAmount: 12,
  }

  expect(result).toStrictEqual(expected)
})
