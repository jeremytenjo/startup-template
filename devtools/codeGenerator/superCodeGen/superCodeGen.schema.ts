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
import componentWithProvider from './templates/components/componentWithProvider.js'
import page from './templates/components/page.js'
import pageContent from './templates/components/pageContent.js'
import globalState from './templates/react/globalState.js'
import muiOverride from './templates/components/muiOverride.js'
import muiOverrideWithStory from './templates/components/muiOverrideWithStory.js'
import playwrightTest from './templates/playwright/playwrightTest.js'
import playwrightTestFile from './templates/playwright/playwrightTestFile.js'
import playwrightTestCommon from './templates/playwright/playwrightTestCommon.js'
import data from './templates/data/data.js'
import dataQuery from './templates/data/dataQuery.js'
import dataQueryUi from './templates/data/dataQueryUi.js'
import dataPrismic from './templates/data/dataPrismic.js'
import dataVariant from './templates/data/dataVariant.js'
import dataFormComponent from './templates/data/dataFormComponent.js'
import reactContext from './templates/react/ReactContext.js'
import vitestTest from './templates/misc/vitestTest.js'
import script from './templates/misc/script.js'
import functionWithNextPagesApiConsumer from './templates/functions/functionWithNextPagesApiConsumer.js'
import tsSchema from './templates/misc/tsSchema.js'
import collection from './templates/data/collection.js'
import firebaseCollableFunctionEntry from './templates/firebase/firebaseCallableFunctionEntry.js'
import firebaseHttpFunctionEntry from './templates/firebase/firebaseHttpFunctionEntry.js'
import reactHook from './templates/react/reactHook.js'
import basicFormComponent from './templates/components/basicFormComponent.js'
import postHogEventBrowser from './templates/posthog/postHogEventBrowser.js'
import postHogEventNode from './templates/posthog/postHogEventNode.js'
import newScgTemplate from './templates/misc/newScgTemplate.js'
import infiniteFeed from './templates/components/infiniteFeed.js'
import customMessageComponent from './templates/components/customMessageComponent.js'
import functionWithFirebaseCronJobConsumer from './templates/functions/functionWithFirebaseCronJobConsumer.js'
import functionWithFirebaseCloudFunctionConsumer from './templates/functions/functionWithFirebaseCloudFunctionConsumer.js'
import functionWithTable from './templates/functions/functionWithTable.js'
import functionWithFeed from './templates/functions/functionWithFeed.js'
import supabaseDatabaseFunction from './templates/supabase/supabaseDatabaseFunction.js'
import supabasePaginationFunction from './templates/supabase/supabasePaginationFunction.js'
import functionWithFirebaseHttpFunctionRoute from './templates/functions/functionWithFirebaseHttpFunctionRoute.js'
import functionWithNodeTestingFirebaseCloudFunctionConsumer from './templates/functions/functionWithNodeTestingFirebaseCloudFunctionConsumer.js'
import functionWithAdminTool from './templates/functions/functionWithAdminTool.js'
import functionWithNextCachedFunction from './templates/functions/functionWithNextCachedFunction.js'

const superCodeGeneratorConfig: SuperCodeGeneratorConfigSchema<any, any> = [
  // Components
  component,
  componentStory,
  componentWithStory,
  customMessageComponent,
  infiniteFeed,
  basicFormComponent,

  // Functions
  functions,
  functionStory,
  functionWithStory,
  functionWithUseAsync,
  functionWithVitest,
  functionWithUseData,
  functionWithHook,
  functionWithFirebaseCloudFunctionConsumer,
  functionWithFirebaseHttpFunctionRoute,
  functionWithNextPagesApiConsumer,
  functionWithNodeTestingFirebaseCloudFunctionConsumer,
  functionWithAdminTool,
  functionWithFirebaseCronJobConsumer,
  functionWithTable,
  functionWithFeed,
  reactHook,
  functionWithNextCachedFunction,

  // Firebase
  firebaseCollableFunctionEntry,
  firebaseHttpFunctionEntry,

  // Supabase
  supabaseDatabaseFunction,
  supabasePaginationFunction,

  // Data
  collection,
  data,
  dataQuery,
  dataQueryUi,
  componentWithProvider,
  dataVariant,
  dataFormComponent,
  dataPrismic,
  globalState,
  reactContext,
  tsSchema,

  // Testing
  playwrightTest,
  playwrightTestFile,
  playwrightTestCommon,
  vitestTest,

  // Pages
  page,
  pageContent,

  // MUI
  muiOverride,
  muiOverrideWithStory,

  // PostHog
  postHogEventBrowser,
  postHogEventNode,

  // Misc
  newScgTemplate,
  script,
]

export default superCodeGeneratorConfig
