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

  const data = props.name

  return {
    data
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

const Template = (${p.namePascalCase}NextjsRouteHandlerConsumerProps) => {
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
    return <Template {...args} />
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
      return `import type {
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

  return res
}

export type ${p.namePascalCase}NextjsRouteHandlerConsumerReturn = ReturnType<
  typeof ${p.nameCamelCase}NextjsRouteHandlerConsumer
>`
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

      return `import ${
        p.nameCamelCase
      } from '@${mainFunctionPathFromFolder?.fileWorkspacePath.replace('.ts', '.js')}'

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const props = await req.json()
    const res = await ${p.nameCamelCase}(props)

    return Response.json(res)
  } catch (error: any) {
    return Response.json(error.cause)
  }
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
