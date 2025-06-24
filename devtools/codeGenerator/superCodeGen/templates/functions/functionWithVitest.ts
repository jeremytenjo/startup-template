import type { SuperCodeGeneratorTemplateSchema } from '@jeremytenjo/super-code-generator'

import { testFile_useExternal } from '../misc/vitestTest.js'

import functions from './function.js'

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Function with Vitest',
  files: [...functions.files, testFile_useExternal],
}

export default template
