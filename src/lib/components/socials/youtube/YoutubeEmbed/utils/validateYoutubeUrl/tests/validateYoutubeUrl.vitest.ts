// https://vitest.dev/api/
import { expect, test } from 'vitest'

import validateYoutubeUrl from '../validateYoutubeUrl.js'

test('Accept desktop url', async () => {
  const result = validateYoutubeUrl({
    url: 'https://www.youtube.com/watch?v=b-oWz7K0XJE&t=6&ab_channel=PunitChawla',
    isYoutubeShort: false,
  })

  const expected: ReturnType<typeof validateYoutubeUrl> = {
    isValid: true,
    invalidErrorMessage: '',
  }

  expect(result).toStrictEqual(expected)
})

test('Accept mobile desktop url', async () => {
  const result = validateYoutubeUrl({
    url: 'https://m.youtube.com/watch?si=73aX4I8FyJtdNErj&v=1SRoH7ZKVIw&feature=youtu.be',
    isYoutubeShort: false,
  })

  const expected: ReturnType<typeof validateYoutubeUrl> = {
    isValid: true,
    invalidErrorMessage: '',
  }

  expect(result).toStrictEqual(expected)
})
test('Accept mobile device url', async () => {
  const result = validateYoutubeUrl({
    url: 'https://youtu.be/1SRoH7ZKVIw?si=73aX4I8FyJtdNErj',
    isYoutubeShort: false,
  })

  const expected: ReturnType<typeof validateYoutubeUrl> = {
    isValid: true,
    invalidErrorMessage: '',
  }

  expect(result).toStrictEqual(expected)
})
