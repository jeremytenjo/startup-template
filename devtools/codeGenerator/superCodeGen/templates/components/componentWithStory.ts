import type { SuperCodeGeneratorTemplateSchema } from '@jeremytenjo/super-code-generator'

import story from '../misc/story.js'

import component from './component.js'

const template: SuperCodeGeneratorTemplateSchema<any> = {
  type: 'Component with story',
  files: [...component.files, ...story.componentStoryFiles],
}

export default template
