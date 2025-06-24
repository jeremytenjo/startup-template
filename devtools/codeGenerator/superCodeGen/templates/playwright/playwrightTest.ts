import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

import playwrighttestfile from './playwrightTestFile.js'

const files: SuperCodeGeneratorFilesSchema = [
  ...playwrighttestfile.files,
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)

      return `${camelCase}.e2e.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)

      return `import { test, expect } from '@playwright/test'
      import resetFirebaseEmulatorDataClientFetch from 'resetFirebaseEmulatorData.fetch'

      import { ${camelCase}_ } from './${camelCase}.tests.js'

      test.beforeEach(async () => {
        await resetFirebaseEmulatorDataClientFetch()
      })
      
      test('${helpers?.changeCase?.sentenceCase(name)}', async ({ page }) => {
        const consoleErrors: Error[] = []
        page.on('pageerror', (err) => {
          consoleErrors.push(err)
        })

        await ${camelCase}_({ page })
        expect(consoleErrors.length).toBe(0)
      })
      
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Playwright Test',
  files,
}

export default template
