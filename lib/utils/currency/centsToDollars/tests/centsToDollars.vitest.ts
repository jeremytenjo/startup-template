// https://vitest.dev/api/
import { expect, test } from 'vitest'

import centsToDollars from '../centsToDollars.js'

test('Converts 100 cents to 1 dollar', async () => {
  const result = centsToDollars({
    cents: 100,
  })

  const expected: ReturnType<typeof centsToDollars> = {
    dollars: 1,
    human: '1.00',
  }

  expect(result).toStrictEqual(expected)
})

test('Converts 0 cents to 0 dollars', async () => {
  const result = centsToDollars({
    cents: 0,
  })

  const expected: ReturnType<typeof centsToDollars> = {
    dollars: 0,
    human: '0.00',
  }

  expect(result).toStrictEqual(expected)
})

test('Converts 123456 cents to 1234.56 dollars', async () => {
  const result = centsToDollars({
    cents: 123456,
  })

  const expected: ReturnType<typeof centsToDollars> = {
    dollars: 1234.56,
    human: '1,234.56',
  }

  expect(result).toStrictEqual(expected)
})
