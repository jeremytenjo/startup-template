import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

import { getStoryPrefix } from '../misc/story.js'

type FunctionWithRouteHandlerConsumerParamsSchema = {
  // path from app/api/
  routeHandlerParentFolder: string
}

const files: SuperCodeGeneratorFilesSchema<
  any,
  FunctionWithRouteHandlerConsumerParamsSchema
> = [
  {
    path: (p) => {
      const fileName = `${p.nameCamelCase}`

      return `${fileName}.ts`
    },
    template: (p) => {
      return `import assert from '@useweb/assert'

export type ${p.namePascalCase}Props = { name: string }

export default async function ${p.nameCamelCase}(props: ${p.namePascalCase}Props) {
  assert<${p.namePascalCase}Props,>({ props, requiredProps: ['name'] })

  const name = props.name

  return {
    id: props.name,
    name
  }
}

export type ${p.namePascalCase}Return = ReturnType<typeof ${p.nameCamelCase}>`
    },
  },
  // stories
  {
    path: (p) => {
      const fileName = `${p.nameCamelCase}`
      return `stories/${fileName}.stories.tsx`
    },
    template: (p) => {
      const storyPrefix = getStoryPrefix({ folderPath: p.folderPath || '' })

      return `import React from 'react'
import AsyncTester from '@useweb/async-tester'

import {
  type ${p.namePascalCase}Props,
  type ${p.namePascalCase}Return,
} from '../${p.nameCamelCase}.js'
import type { ${p.namePascalCase}NextjsRouteHandlerConsumerProps } from '../consumers/nextjsRouteHandlerConsumer/${p.nameCamelCase}.nextjsRouteHandlerConsumer.js'
import ${p.nameCamelCase}NextjsRouteHandlerConsumer from '../consumers/nextjsRouteHandlerConsumer/${p.nameCamelCase}.nextjsRouteHandlerConsumer.js'

const defaultArgs: ${p.namePascalCase}NextjsRouteHandlerConsumerProps['payload'] = {
  name: 'hello',
}

export default {
  title: '${storyPrefix}/${p.nameCamelCase}',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

const Template = (args: ${p.namePascalCase}NextjsRouteHandlerConsumerProps) => {
  const fn = async (triggerProps = {}) => {
    const res = await ${p.nameCamelCase}NextjsRouteHandlerConsumer({
      ...args,
      ...triggerProps,
    })

    return res
  }

  return (
    <>
      <AsyncTester<Awaited<${p.namePascalCase}Return>, ${p.namePascalCase}NextjsRouteHandlerConsumerProps> fn={fn} />
    </>
  )
}

export const Default = {
  render: (args: ${p.namePascalCase}Props) => {
    return <Template payload={args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies ${p.namePascalCase}Props
// }`
    },
  },
  // consumer
  {
    path: (p) => {
      const fileName = `${p.nameCamelCase}`
      return `consumers/nextjsRouteHandlerConsumer/${fileName}.nextjsRouteHandlerConsumer.ts`
    },
    template: (p) => {
      return `import throwError from '@useweb/ui/throwError'

import type {
  ${p.namePascalCase}Props,
  ${p.namePascalCase}Return,
} from '../../${p.nameCamelCase}.js'

import type { NextApiProps } from '@/lib/integrations/Nextjs/utils/nextApi/nextApi.js'
import nextApi from '@/lib/integrations/Nextjs/utils/nextApi/nextApi.js'

export type ${p.namePascalCase}NextjsRouteHandlerConsumerProps = {
  payload: ${p.namePascalCase}Props
  nextApiProps?: Partial<NextApiProps<${p.namePascalCase}Props>>
}

export default async function ${p.nameCamelCase}NextjsRouteHandlerConsumer(
  props: ${p.namePascalCase}NextjsRouteHandlerConsumerProps,
) {
  const res = await nextApi<
    Awaited<${p.namePascalCase}Return>,
    ${p.namePascalCase}NextjsRouteHandlerConsumerProps['payload']
  >({
    name: '${p.params?.routeHandlerParentFolder}/${p.nameCamelCase}',
    payload: props.payload,
    ...props.nextApiProps,
  })

  if (res.error) {
    throwError({
      message: res.error.message,
    })
  }

  return res
}

export type ${p.namePascalCase}NextjsRouteHandlerConsumerReturn = ReturnType<
  typeof ${p.nameCamelCase}NextjsRouteHandlerConsumer
>`
    },
  },
  // hook with persist and trigger
  {
    path: (p) => {
      const fileName = `use${p.namePascalCase}`
      return `consumers/nextjsRouteHandlerConsumer/${fileName}.nextjsRouteHandlerConsumer.ts`
    },
    template: (p) => {
      return `import type { PartialRequired } from '@useweb/use-data'
import createUseDataId from '@useweb/use-data/createUseDataId'
import useAsync from '@useweb/use-async'
import useData from '@useweb/use-data'
import type { GetOptions } from '@useweb/use-data/useData/handlers/useGet'

import ${p.nameCamelCase}NextjsRouteHandlerConsumer, {
  type ${p.namePascalCase}NextjsRouteHandlerConsumerProps,
  type ${p.namePascalCase}NextjsRouteHandlerConsumerReturn,
} from './${p.nameCamelCase}.nextjsRouteHandlerConsumer.js'

import type { NextApiProps } from '@/lib/integrations/Nextjs/utils/nextApi/nextApi.js'
import logError from '@/lib/utils/loggers/logError/logError.js'

type PayloadSchema = ${p.namePascalCase}NextjsRouteHandlerConsumerProps['payload']
type PartialPayloadSchema = PartialRequired<PayloadSchema>
type ReturnSchema = Awaited<${p.namePascalCase}NextjsRouteHandlerConsumerReturn>['data']

export type Use${p.namePascalCase}PersistProps = {
  payload: PartialPayloadSchema
  onGet?: GetOptions<ReturnSchema, any>['onGet']
}

export const getUse${p.namePascalCase}PersistDataId = (props: PartialPayloadSchema) => {
  const id = createUseDataId<PayloadSchema>({
    name: 'use${p.namePascalCase}Persist',
    props,
  })
  return id
}

export function use${p.namePascalCase}Persist(props: Use${p.namePascalCase}PersistProps) {
  const res = useData<ReturnSchema, PayloadSchema>({
    id: getUse${p.namePascalCase}PersistDataId(props.payload).id,
    get: {
      fetcher: async () => {
        const result = await ${p.nameCamelCase}NextjsRouteHandlerConsumer({
          payload: props.payload as PayloadSchema,
        })
        return [result.data]
      },
      onGet: props.onGet,
      onGetError(p) {
        logError({
          fnName: 'use${p.namePascalCase}Persist',
          error: p.error,
          metadata: {
            props,
          },
        })
      },
    },
  })

  return res
}

export type Use${p.namePascalCase}TriggerProps = {
  options?: {
    nextApiProps?: Partial<NextApiProps<PayloadSchema>>
    onResult?: (props: { result: ReturnSchema }) => void
    onError?: (props: { error: unknown; fnProps: PayloadSchema }) => void
  }
}

export function use${p.namePascalCase}Trigger(props: Use${p.namePascalCase}TriggerProps = {}) {
  const trigger = useAsync<PayloadSchema, ReturnSchema>({
    fn: async (payload) => {
      const res = await ${p.nameCamelCase}NextjsRouteHandlerConsumer({
        payload,
        nextApiProps: props.options?.nextApiProps,
      })

      return res.data
    },

    onResult(p) {
      if (props.options?.onResult) {
        props.options.onResult({
          result: p.result,
        })
      }
    },
    onError({ error, fnProps }) {
      if (props.options?.onError) {
        props.options.onError({ error, fnProps })
      }

      logError({
        error,
        fnName: 'use${p.namePascalCase}Trigger',
        metadata: { fnProps },
      })
    },
  })

  return trigger
}
`
    },
  },
  // route
  {
    outputInRootFolder: true,
    path: (p) => {
      return `app/api/${p.params?.routeHandlerParentFolder}/${p.nameCamelCase}/route.ts`
    },
    template: (p) => {
      const mainFunctionPathFromFolder = p.createdFiles?.find((file) => {
        return file.fileWorkspacePath.includes(`${p.nameCamelCase}.ts`)
      })

      return `import nextRouteHandler from '@/lib/integrations/Nextjs/utils/nextRouteHandler/nextRouteHandler.js'
      import ${
        p.nameCamelCase
      } from '@${mainFunctionPathFromFolder?.fileWorkspacePath.replace('.ts', '.js')}'

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const maxDuration = 60

export async function POST(req: Request) {
  return await nextRouteHandler({
    req,
    func: async ({ req }) => {
      const props = await req.json()
      return ${p.nameCamelCase}(props)
    }
  })
}`
    },
  },
]

const functionWithNextjsRouteHandler: SuperCodeGeneratorTemplateSchema<
  any,
  FunctionWithRouteHandlerConsumerParamsSchema
> = {
  type: 'Function With Nextjs Route Handler',
  files,
  params: [
    {
      name: 'routeHandlerParentFolder',
      description: 'Folder in app/api/ where the route handler will be created',
      type: 'input',
    },
  ],
}

export default functionWithNextjsRouteHandler
