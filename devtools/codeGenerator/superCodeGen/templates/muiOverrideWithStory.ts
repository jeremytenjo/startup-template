import type { SuperCodeGeneratorTemplateSchema } from '@jeremytenjo/super-code-generator'

import muiOverride from './muiOverride.js'
import story from './story.js'

const template: SuperCodeGeneratorTemplateSchema<any> = {
  type: 'Component Defaults with story',
  files: [...muiOverride.files, ...story.componentStoryFiles],
}

export default template
