import type { SuperCodeGeneratorTemplateSchema } from '@jeremytenjo/super-code-generator'

import component from './component.js'
import story from './story.js'

const template: SuperCodeGeneratorTemplateSchema<any> = {
  type: 'Component with story',
  files: [...component.files, ...story.componentStoryFiles],
}

export default template
