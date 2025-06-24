import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

import addRouteToApi from '../../utils/addRouteToApi/addRouteToApi.js'
import { getStoryPrefix } from '../misc/story.js'

const files: SuperCodeGeneratorFilesSchema = [
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

export default async function ${nameCamelCase}(props: ${namePascalCase}Props) {
  assert<${namePascalCase}Props,>({ props, requiredProps: ['name'] })

  const person = props.name

  return { person }
}

export type ${namePascalCase}Return = ReturnType<typeof ${nameCamelCase}>`
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
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import type { API_${namePascalCase}FirebaseProps } from './${nameCamelCase}.firebase.js'

import nodeTestingApiClient, {
  type NodeTestingApiClientProps,
} from '@/firebaseFunctions/src/_localFirebaseFunctions/nodeTestingApi/nodeTestingApi.client.js'

export type ${namePascalCase}FirebaseClientProps = {
  payload: NodeTestingApiClientProps<API_${namePascalCase}FirebaseProps>['api']['payload']
  options?: NodeTestingApiClientProps<API_${namePascalCase}FirebaseProps>['options']
}

export default async function ${nameCamelCase}FirebaseClient(
  props: ${namePascalCase}FirebaseClientProps,
) {
  const res = await nodeTestingApiClient<API_${namePascalCase}FirebaseProps>({
    api: {
      route: 'routes/${nameCamelCase}',
      payload: props.payload,
    }, 
    options: props.options,
  })

  const data = res.data || []

  return data
}

      `
    },
  },

  // stories - KEEP THIS LAST
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

const functionWithNodeTestingFirebaseCloudFunctionConsumer: SuperCodeGeneratorTemplateSchema =
  {
    type: 'Function With Node Testing Firebase Cloud Function Consumer',
    files,
    hooks: {
      async onCreate(props) {
        await addRouteToApi({
          outputPath: props.outputPath,
          name: props.componentName,
          cloudFunctionName: 'nodeTestingApi',
          workspacePath: props.workspacePath,
        })
      },
    },
  }

export default functionWithNodeTestingFirebaseCloudFunctionConsumer
