import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const testFile: SuperCodeGeneratorFilesSchema[0] = {
  path: ({ name, helpers }) => `${helpers?.changeCase?.camelCase(name)}.vitest.ts`,
  template: ({ name }) => {
    return `// https://vitest.dev/api/
    import { expect, test } from 'vitest'
    import ${name} from '../${name}'

    test('Success', async () => {
      const result = ${name}({})
    
      const expected: ReturnType<typeof ${name}> = {}
    
      expect(result).toStrictEqual(expected)
    })
    
    `
  },
}

export const testFile_useExternal: SuperCodeGeneratorFilesSchema[0] = {
  path: ({ name, helpers }) => `tests/${helpers?.changeCase?.camelCase(name)}.vitest.ts`,
  template: testFile.template,
}

const files: SuperCodeGeneratorFilesSchema = [testFile]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Vitest unit test',
  files,
}

export default template
