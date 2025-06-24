import type { SuperCodeGeneratorTemplateSchema } from '@jeremytenjo/super-code-generator'

import story from '../misc/story.js'

import muiOverride from './muiOverride.js'

const template: SuperCodeGeneratorTemplateSchema<any> = {
  type: 'Component Defaults with story',
  files: [...muiOverride.files, ...story.componentStoryFiles],
}

export default template
