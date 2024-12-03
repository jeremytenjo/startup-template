import type { SuperCodeGeneratorConfigSchema } from '@jeremytenjo/super-code-generator'

import component from './templates/component.js'
import componentStory from './templates/componentStory.js'
import componentWithStory from './templates/componentWithStory.js'
import functions from './templates/function.js'
import functionStory from './templates/functionStory.js'
import functionWithStory from './templates/functionWithStory.js'
import functionWithUseAsync from './templates/functionWithUseAsync.js'
import functionWithVitest from './templates/functionWithVitest.js'
import functionWithUseData from './templates/functionWithUseData.js'
import functionWithHook from './templates/functionWithHook.js'
import componentWithProvider from './templates/componentWithProvider.js'
import dataFunction from './templates/dataFunction.js'
import page from './templates/page.js'
import pageContent from './templates/pageContent.js'
import globalState from './templates/globalState.js'
import muiOverride from './templates/muiOverride.js'
import muiOverrideWithStory from './templates/muiOverrideWithStory.js'
import playwrightTest from './templates/playwrightTest.js'
import playwrightTestFile from './templates/playwrightTestFile.js'
import playwrightTestCommon from './templates/playwrightTestCommon.js'
import data from './templates/data.js'
import dataQuery from './templates/dataQuery.js'
import dataQueryUi from './templates/dataQueryUi.js'
import dataComponent from './templates/dataComponent.js'
import dataPrismic from './templates/dataPrismic.js'
import dataVariant from './templates/dataVariant.js'
import dataFormComponent from './templates/dataFormComponent.js'
import reactContext from './templates/ReactContext.js'
import vitestTest from './templates/vitestTest.js'
import script from './templates/script.js'
import nextApiFunction from './templates/nextApiFunction.js'
import tsSchema from './templates/tsSchema.js'
import collection from './templates/collection.js'
import dataComponentUi from './templates/dataComponentUi.js'
import firebaseFunction from './templates/firebaseFunction.js'
import firebaseFunctionApiRoutes from './templates/firebaseFunctionApiRoutes.js'
import firebaseFunctionApiRoute from './templates/firebaseFunctionApiRoute.js'
import firebaseFunctionApiRouteHandler from './templates/firebaseFunctionApiRouteHandler.js'
import firebaseFunctionCollable from './templates/firebaseFunctionCollable.js'
import reactHook from './templates/reactHook.js'
import adminTool from './templates/adminTool.js'
import infiniteTable from './templates/infiniteTable.js'
import basicFormComponent from './templates/basicFormComponent.js'
import posthogEvent from './templates/postHogEvent.js'
import gameZoneAdUserSwitcherComponent from './templates/gameZoneAdUserSwitcherComponent.js'
import firebaseFunctionHttpApiRoute from './templates/firebaseFunctionHttpApiRoute.js'
import newScgTemplate from './templates/newScgTemplate.js'
import foundationPage from './templates/foundationPage.js'

const superCodeGeneratorConfig: SuperCodeGeneratorConfigSchema<any> = [
  component,
  componentStory,
  componentWithStory,

  functions,
  functionStory,
  functionWithStory,
  functionWithUseAsync,
  functionWithVitest,
  functionWithUseData,
  functionWithHook,
  dataFunction,
  reactHook,

  nextApiFunction,
  firebaseFunction,
  firebaseFunctionApiRoutes,
  firebaseFunctionApiRoute,
  firebaseFunctionApiRouteHandler,
  firebaseFunctionCollable,
  firebaseFunctionHttpApiRoute,

  collection,
  data,
  dataQuery,
  dataQueryUi,
  componentWithProvider,
  dataComponent,
  dataComponentUi,
  dataVariant,
  dataFormComponent,
  dataPrismic,
  globalState,
  reactContext,

  tsSchema,

  playwrightTest,
  playwrightTestFile,
  playwrightTestCommon,
  vitestTest,

  page,
  pageContent,

  muiOverride,
  muiOverrideWithStory,

  script,

  adminTool,

  infiniteTable,
  basicFormComponent,

  posthogEvent,
  gameZoneAdUserSwitcherComponent,
  newScgTemplate,
  foundationPage,
]

export default superCodeGeneratorConfig
