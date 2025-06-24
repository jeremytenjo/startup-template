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

      return `import useAsync from '@useweb/use-async'

import type { API_${namePascalCase}FirebaseProps } from './${nameCamelCase}.firebase.js'

import logError from '@/src/lib/utils/loggers/logError/logError.js'
import adminApiClient, {
  type AdminApiClientProps,
} from '@/firebaseFunctions/src/adminApi/adminApi.client.js'

type PayloadSchema = API_${namePascalCase}FirebaseProps['payload']

export type ${namePascalCase}FirebaseClientProps = {
  payload: AdminApiClientProps<API_${namePascalCase}FirebaseProps>['api']['payload']
  options?: AdminApiClientProps<API_${namePascalCase}FirebaseProps>['options']
}

export default async function ${nameCamelCase}FirebaseClient(
  props: ${namePascalCase}FirebaseClientProps,
) {
  const res = await adminApiClient<API_${namePascalCase}FirebaseProps>({
    api: {
      route: 'routes/${nameCamelCase}',
      payload: props.payload,
    }, 
    options: props.options,
  })

  const data = res.data || []

  return data
}

export type Use${namePascalCase}TriggerProps = {
  options?: AdminApiClientProps<API_${namePascalCase}FirebaseProps>['options']
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
            data: p.result,
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
  {
    path: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      return `consumers/firebaseCloudFunction/ui/AdminTool${namePascalCase}/AdminTool${namePascalCase}.tsx`
    },
    template: ({ helpers, name }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const nameCapitalCase = helpers?.changeCase?.capitalCase(name)

      return `import React from 'react'
import ActionBox from '@useweb/ui/ActionBox'
import Button from '@useweb/ui/Button'
import useSnackbar from '@useweb/ui/Snackbar'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import { use${namePascalCase}Trigger } from '../../${name}.firebase.client.js'

const ReactJsonView = React.lazy(() => {
  return import('react-json-view')
})

export default function AdminTool${namePascalCase}() {
  const snackbar = useSnackbar()

  const trigger = use${namePascalCase}Trigger({
    options: {
      onResult() {
        snackbar.show({
          message: 'Success',
        })
      },
    },
  })

  return (
    <ActionBox
      data-id='AdminTool${namePascalCase}'
      headerProps={{
        title: '${nameCapitalCase}'
      }}
      ctas={
        <>
          <Button
            name='Send'
            loading={trigger.loading}
            onClick={() => {
              trigger.exec({
                name: 'hello',
              })
            }}
            sx={{}}
          >
            Send
          </Button>
        </>
      }
      sx={{}}
      childrenSx={{
        display: 'grid',
        gap: 2,
      }}
    >
      {trigger.result && (
        <ReactJsonView
          src={trigger.result}
          indentWidth={2}
          style={{
            fontSize: '12px',
          }}
          theme='monokai'
        />
      )}

      <ErrorMessage error={trigger.error} />
    </ActionBox>
  )
}`
    },
  },
]

const functionWithAdminTool: SuperCodeGeneratorTemplateSchema = {
  type: 'Function With Admin Tool',
  files,
  hooks: {
    async onCreate(props) {
      await addRouteToApi({
        outputPath: props.outputPath,
        name: props.componentName,
        cloudFunctionName: 'adminApi',
        workspacePath: props.workspacePath,
      })
    },
  },
}

export default functionWithAdminTool
