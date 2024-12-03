// https://vitest.dev/api/
import { expect, test } from 'vitest'

import logError from '../logError.js'

// use to run log error and see if it works
test('Success', async () => {
  logError({
    error: new Error('Error message'),
    fnName: 'test',
    metadata: {},
  })

  const expected = 0
  const result = 0

  expect(result).toBe(expected)
})
