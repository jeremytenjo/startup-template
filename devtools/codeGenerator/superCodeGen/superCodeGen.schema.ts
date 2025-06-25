import type { SuperCodeGeneratorConfigSchema } from '@jeremytenjo/super-code-generator'

import component from './templates/components/component.js'
import componentStory from './templates/components/componentStory.js'
import componentWithStory from './templates/components/componentWithStory.js'
import functions from './templates/functions/function.js'
import functionStory from './templates/functions/functionStory.js'
import functionWithStory from './templates/functions/functionWithStory.js'
import functionWithUseAsync from './templates/functions/functionWithUseAsync.js'
import functionWithVitest from './templates/functions/functionWithVitest.js'
import functionWithUseData from './templates/functions/functionWithUseData.js'
import functionWithHook from './templates/functions/functionWithHook.js'
import muiOverride from './templates/components/muiOverride.js'
import muiOverrideWithStory from './templates/components/muiOverrideWithStory.js'
import vitestTest from './templates/misc/vitestTest.js'
import script from './templates/misc/script.js'
import functionWithNextPagesApiConsumer from './templates/functions/functionWithNextPagesApiConsumer.js'
import tsSchema from './templates/misc/tsSchema.js'
import reactHook from './templates/react/reactHook.js'
import basicFormComponent from './templates/components/basicFormComponent.js'
import postHogEventBrowser from './templates/posthog/postHogEventBrowser.js'
import postHogEventNode from './templates/posthog/postHogEventNode.js'
import newScgTemplate from './templates/misc/newScgTemplate.js'
import infiniteFeed from './templates/components/infiniteFeed.js'
import functionWithTable from './templates/functions/functionWithTable.js'
import functionWithFeed from './templates/functions/functionWithFeed.js'
import functionWithNextCachedFunction from './templates/functions/functionWithNextCachedFunction.js'

const superCodeGeneratorConfig: SuperCodeGeneratorConfigSchema<any, any> = [
  component,
  componentStory,
  componentWithStory,
  infiniteFeed,
  basicFormComponent,
  functions,
  functionStory,
  functionWithStory,
  functionWithUseAsync,
  functionWithVitest,
  functionWithUseData,
  functionWithHook,
  functionWithNextPagesApiConsumer,
  functionWithTable,
  functionWithFeed,
  reactHook,
  functionWithNextCachedFunction,
  tsSchema,
  vitestTest,
  muiOverride,
  muiOverrideWithStory,
  postHogEventBrowser,
  postHogEventNode,
  newScgTemplate,
  script,
]

export default superCodeGeneratorConfig
