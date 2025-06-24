// https://vitest.dev/api/
import { expect, test } from 'vitest'

import dollarsToCents from '../dollarsToCents.js'

test('Converts 1 dollar to 100 cents', async () => {
  const result = dollarsToCents({
    dollars: 1,
  })

  const expected: ReturnType<typeof dollarsToCents> = {
    cents: 100,
  }

  expect(result).toStrictEqual(expected)
})

test('Converts 0 dollars to 0 cents', async () => {
  const result = dollarsToCents({
    dollars: 0,
  })

  const expected: ReturnType<typeof dollarsToCents> = {
    cents: 0,
  }

  expect(result).toStrictEqual(expected)
})

test('Converts 0.01 dollars to 1 cent', async () => {
  const result = dollarsToCents({
    dollars: 0.01,
  })

  const expected: ReturnType<typeof dollarsToCents> = {
    cents: 1,
  }

  expect(result).toStrictEqual(expected)
})

test('Converts 0.05 dollars to 5 cents', async () => {
  const result = dollarsToCents({
    dollars: 0.05,
  })

  const expected: ReturnType<typeof dollarsToCents> = {
    cents: 5,
  }

  expect(result).toStrictEqual(expected)
})

test('Converts 0.99 dollars to 99 cents', async () => {
  const result = dollarsToCents({
    dollars: 0.99,
  })

  const expected: ReturnType<typeof dollarsToCents> = {
    cents: 99,
  }

  expect(result).toStrictEqual(expected)
})

test('Converts 100 dollars to 10000 cents', async () => {
  const result = dollarsToCents({
    dollars: 100,
  })

  const expected: ReturnType<typeof dollarsToCents> = {
    cents: 10000,
  }

  expect(result).toStrictEqual(expected)
})
