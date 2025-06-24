import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

import addRouteToApi from '../../utils/addRouteToApi/addRouteToApi.js'
import { getStoryPrefix } from '../misc/story.js'

export type FunctionWithFirebaseCloudFunctionConsumerParamsSchema = {
  cloudFunctionName: string
}

const files: SuperCodeGeneratorFilesSchema<
  any,
  FunctionWithFirebaseCloudFunctionConsumerParamsSchema
> = [
  // function
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `${fileName}.ts`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import assert from '@useweb/assert'
      
export type ${namePascalCase}Props = { name: string }

export default async function ${nameCamelCase}(
  props: ${namePascalCase}Props
) {
  assert<${namePascalCase}Props,>({ props, requiredProps: ['name'] })

  const person = props.name

  return { person }
}

export type ${namePascalCase}Return = ReturnType<typeof ${nameCamelCase}>`
    },
  },

  // ui - readme
  {
    path: () => {
      return `ui/readme.md`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)

      return `# ${nameCamelCase} UI

Add components that consume '${nameCamelCase}' query here.`
    },
  },

  // firebase cloud function - readme
  {
    path: () => {
      return `consumers/readme.md`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)

      return `# ${nameCamelCase} Consumers

Add consumers that consume '${nameCamelCase}' query here.

A consumer is could be a Firebase Cloud Function, Next API Function, useData hook, etc.
`
    },
  },

  // firebase cloud function - consumer
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `consumers/firebaseCloudFunction/${fileName}.firebase.ts`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'

import ${nameCamelCase}, {
  type ${namePascalCase}Props,
  type ${namePascalCase}Return,
} from '../../${nameCamelCase}.js'

export const routeId = 'routes/${nameCamelCase}'

export type API_${namePascalCase}FirebaseProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: ${namePascalCase}Props
  return: Awaited<${namePascalCase}FirebaseReturn>
}

export type ${namePascalCase}FirebasePropsInternal = Omit<
  API_${namePascalCase}FirebaseProps,
  'route' | 'return'
>

export default async function ${nameCamelCase}Firebase(
  props: ${namePascalCase}FirebasePropsInternal,
): ${namePascalCase}FirebaseReturn {
  logger.info(${'`'}START: ${'${'}routeId${'}'}${'`'}, { props })

  assert<${namePascalCase}FirebasePropsInternal>({
    props,
    requiredProps: ['payload'],
  })

  const res = await ${nameCamelCase}(props.payload)

  const response: Awaited<${namePascalCase}FirebaseReturn> = {
    data: [res],
  }

  logger.info(${'`'}END: ${'${'}routeId${'}'}${'`'}, { response })

  return response
}
      
export type ${namePascalCase}FirebaseReturn = Promise<{
  data: Awaited<${namePascalCase}Return>[]
}>
      `
    },
  },

  // firebase cloud function - consumer client
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `consumers/firebaseCloudFunction/${fileName}.firebase.client.ts`
    },
    template: ({ name, helpers, params }) => {
      const cloudFunctionName = params?.cloudFunctionName || ''
      const cloudFunctionNameCamelCase = helpers?.changeCase?.camelCase(cloudFunctionName)
      const cloudFunctionNamePascalCase =
        helpers?.changeCase?.pascalCase(cloudFunctionName)

      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import type { API_${namePascalCase}FirebaseProps } from './${nameCamelCase}.firebase.js'

import type { ${cloudFunctionNamePascalCase}ClientProps } from '@/firebaseFunctions/src/${cloudFunctionNameCamelCase}/${cloudFunctionNameCamelCase}.client.js'
import ${cloudFunctionNameCamelCase}Client from '@/firebaseFunctions/src/${cloudFunctionNameCamelCase}/${cloudFunctionNameCamelCase}.client.js'

export type ${namePascalCase}FirebaseClientProps = {
  payload: ${cloudFunctionNamePascalCase}ClientProps<API_${namePascalCase}FirebaseProps>['api']['payload']
  options?: ${cloudFunctionNamePascalCase}ClientProps<API_${namePascalCase}FirebaseProps>['options']
}

export default async function ${nameCamelCase}FirebaseClient(
  props: ${namePascalCase}FirebaseClientProps,
) {
  const res = await ${cloudFunctionNameCamelCase}Client<API_${namePascalCase}FirebaseProps>({
    api: {
      route: 'routes/${nameCamelCase}',
      payload: props.payload,
    },
    options: props.options,
  })

  const data = res.data?.[0] || []

  return data
}

      `
    },
  },

  // firebase cloud function - hook
  {
    path: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const fileName = `${namePascalCase}`

      return `consumers/firebaseCloudFunction/use${fileName}.firebase.ts`
    },
    template: ({ name, helpers, params }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      const cloudFunctionName = params?.cloudFunctionName || ''
      const cloudFunctionNameCamelCase = helpers?.changeCase?.camelCase(cloudFunctionName)
      const cloudFunctionNamePascalCase =
        helpers?.changeCase?.pascalCase(cloudFunctionName)

      return `import type { PartialRequired } from '@useweb/use-data'
import { createUseDataId } from '@useweb/use-data'
import useAsync from '@useweb/use-async'

import type { API_${namePascalCase}FirebaseProps } from './${nameCamelCase}.firebase.js'
import ${nameCamelCase}FirebaseClient from './${nameCamelCase}.firebase.client.js'

import type { ${cloudFunctionNamePascalCase}ClientProps } from '@/firebaseFunctions/src/${cloudFunctionNameCamelCase}/${cloudFunctionNameCamelCase}.client.js'
import logError from '@/src/lib/utils/loggers/logError/logError.js'
import use${cloudFunctionNamePascalCase}Persist from '@/firebaseFunctions/src/${cloudFunctionNameCamelCase}/utils/use${cloudFunctionNamePascalCase}Persist/use${cloudFunctionNamePascalCase}Persist.js'
import type { Use${cloudFunctionNamePascalCase}PersistProps } from '@/firebaseFunctions/src/${cloudFunctionNameCamelCase}/utils/use${cloudFunctionNamePascalCase}Persist/use${cloudFunctionNamePascalCase}Persist.js'

type PayloadSchema = API_${namePascalCase}FirebaseProps['payload']
type PartialPayloadSchema = PartialRequired<PayloadSchema>

export type Use${namePascalCase}PersistProps = {
  payload: PartialPayloadSchema
  options?: Use${cloudFunctionNamePascalCase}PersistProps<API_${namePascalCase}FirebaseProps>['options']
}

export const getUse${namePascalCase}PersistDataId = (
  props: PartialPayloadSchema,
) => {
  const id = createUseDataId<PayloadSchema>({
    name: 'use${namePascalCase}Persist',
    props,
  })
  return id
}

export function use${namePascalCase}Persist(
  props: Use${namePascalCase}PersistProps,
) {
  const res = use${cloudFunctionNamePascalCase}Persist<API_${namePascalCase}FirebaseProps>({
    id: getUse${namePascalCase}PersistDataId(props.payload).id,
    api: {
      route: 'routes/${nameCamelCase}',
      payload: props.payload as PayloadSchema,
    },
    options: props.options,
  })

  return res
}

export type Use${namePascalCase}TriggerProps = {
  options?: ${cloudFunctionNamePascalCase}ClientProps<API_${namePascalCase}FirebaseProps>['options']
}

export function use${namePascalCase}Trigger(
  props: Use${namePascalCase}TriggerProps,
) {
  const trigger = useAsync<
    PayloadSchema,
    Awaited<ReturnType<typeof ${nameCamelCase}FirebaseClient>>
  >({
    fn: async (p) => {
      const res = await ${nameCamelCase}FirebaseClient({
        payload: p,
        options: props.options,
      })

      return res
    },

    onResult(p) {
      if (props.options?.onResult) {
        props.options.onResult({
          result: {
            data: [p.result],
          },
        })
      }
    },
    onError({ error, fnProps }) {
      logError({
        error,
        fnName: 'use${namePascalCase}Trigger',
        metadata: { fnProps },
      })
    },
  })

  return trigger
}
      `
    },
  },

  // stories
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `consumers/firebaseCloudFunction/stories/${fileName}.stories.tsx`
    },
    template: ({ name, helpers, folderPath }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const storyPrefix = getStoryPrefix({ folderPath: folderPath || '' })

      return `//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import {
  type ${namePascalCase}Props,
  type ${namePascalCase}Return,
} from '../../../${nameCamelCase}.js'
import ${nameCamelCase}FirebaseClient from '../${nameCamelCase}.firebase.client.js'

const defaultArgs: ${namePascalCase}Props = {
  name: 'hello'
}

export default {
  title: '${storyPrefix}/${nameCamelCase}',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

const Template = (args: ${namePascalCase}Props) => {
  const fn = async (triggerProps = {}) => {
    return await ${nameCamelCase}FirebaseClient({
      payload: {
        ...args,
        ...triggerProps,
      },
    })
  }

  return (
    <>
      <AsyncTester<${namePascalCase}Return, ${namePascalCase}Props>
        fn={fn}
      />
    </>
  )
}

export const Default = {
  render: (args: ${namePascalCase}Props) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies ${namePascalCase}Props
// }
`
    },
  },
]

const functionWithFirebaseCloudFunctionConsumer: SuperCodeGeneratorTemplateSchema<
  any,
  FunctionWithFirebaseCloudFunctionConsumerParamsSchema
> = {
  type: 'Function With Firebase Cloud Function Consumer',
  files,
  hooks: {
    async onCreate(props) {
      await addRouteToApi({
        outputPath: props.outputPath,
        name: props.componentName,
        cloudFunctionName: props.params.cloudFunctionName,
        workspacePath: props.workspacePath,
      })
    },
  },
  params: [
    {
      name: 'cloudFunctionName',
      type: 'dropdown',
      description: 'The name of the Firebase Cloud Function',
      options: [
        {
          value: 'supabaseDatabaseApi',
        },
        {
          value: 'adminApi',
        },
        {
          value: 'miscFunctions',
        },
        {
          value: 'jobPaymentApi',
        },
        {
          value: 'discordApi',
        },
      ],
    },
  ],
}

export default functionWithFirebaseCloudFunctionConsumer
