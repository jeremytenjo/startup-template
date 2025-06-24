import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)

      return `${camelCase}.tests.ts`
    },
    template: ({ name, helpers }) => {
      const propsName = `${helpers?.changeCase
        .capitalCase(name)
        .split(' ')
        .join('')}TestProps`
      const camelCase = helpers?.changeCase?.camelCase(name)

      return `// https://playwright.dev/docs/selectors
import { expect, type Page } from '@playwright/test'

type ${propsName} = {
  page: Page
}

// common variables

// tests
export async function ${camelCase}_({ page }: ${propsName}) {
  await page.goto('/')

  const header = await page.innerText('h1')
  expect(header).toBe('Home Page')
}

// common functions

      
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Playwright Test File',
  files,
  options: {
    createNamedFolder: false,
  },
}

export default template
