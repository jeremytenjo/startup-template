import type { SuperCodeGeneratorTemplateSchema } from '@jeremytenjo/super-code-generator'

import story from '../misc/story.js'

import functions from './function.js'

const template: SuperCodeGeneratorTemplateSchema<any> = {
  type: 'Function with story',
  files: [...functions.files, ...story.functionStoryFiles],
}

export default template
