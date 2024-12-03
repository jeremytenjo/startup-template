import type { SuperCodeGeneratorTemplateSchema } from '@jeremytenjo/super-code-generator'

import story from './story.js'

const template: SuperCodeGeneratorTemplateSchema<any> = {
  type: 'Component Story',
  files: story.componentStoryFiles,
  outputWithoutParentDir: true,
}

export default template
