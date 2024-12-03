import type { SuperCodeGeneratorTemplateSchema } from '@jeremytenjo/super-code-generator'

import functions from './function.js'
import story from './story.js'

const template: SuperCodeGeneratorTemplateSchema<any> = {
  type: 'Function with story',
  files: [...functions.files, ...story.functionStoryFiles],
}

export default template
