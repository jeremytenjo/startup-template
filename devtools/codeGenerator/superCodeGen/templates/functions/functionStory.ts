import type { SuperCodeGeneratorTemplateSchema } from '@jeremytenjo/super-code-generator'

import story from '../misc/story.js'

const template: SuperCodeGeneratorTemplateSchema<any> = {
  type: 'Function Story',
  files: story.functionStoryFiles,
  outputWithoutParentDir: true,
}

export default template
