import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

import { getStoryPrefix } from '../misc/story.js'

const consumerFolderName = 'consumers/nextPagesApiFunction/'

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

export type ${namePascalCase}Props = {
  name: string
}

export default async function ${nameCamelCase}(props: ${namePascalCase}Props) {
  assert<${namePascalCase}Props,>({ props, requiredProps: ['name'] })

  const person = props.name

  return {
    id: person,
  }
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

  // Next Pages API Function - readme
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

  // Pages API Function entry
  {
    outputInRootFolder: true,
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)

      return `src/pages/api/${nameCamelCase}/index.ts`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)

      return `import type { NextApiRequest, NextApiResponse } from 'next'

import allowCrossOriginInNextApi from '@/src/lib/utils/nextjs/allowCrossOriginInNextApi/allowCrossOriginInNextApi.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await allowCrossOriginInNextApi({ req, res })

  let body: any = {}
  try {
    body = JSON.parse(req.body)
  } catch (e) {
    body = req.body
  }

  try {
    const data = await ${nameCamelCase}Next({ body, req })
    console.log('${nameCamelCase} API Response:')
    res.status(200).json({ data, error: undefined })
  } catch (error: any) {
    console.log('${nameCamelCase} API Error:')
    console.log(error)
    res.status(200).json({ error: String(error) })
  }
}`
    },
  },

  // Consumer index
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `${consumerFolderName}${fileName}.next.ts`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import type { NextApiRequest } from 'next'

import ${nameCamelCase}, { type ${namePascalCase}Props } from '../../${nameCamelCase}.js'

export type ${namePascalCase}NextProps = {
  req?: NextApiRequest
  body: ${namePascalCase}Props
}

export default async function ${nameCamelCase}Next(props: ${namePascalCase}NextProps) {
  try {
    const data = await ${nameCamelCase}({
      ...props.body,
    })

    return data
  } catch (error: any) {
    throw new Error(error, {
      cause: error.cause || {},
    })
  }
}
`
    },
  },

  // Consumer client
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `${consumerFolderName}${fileName}.next.client.ts`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import type { ${namePascalCase}Props, ${namePascalCase}Return } from '../../${nameCamelCase}.js'

import nextApi from '@/src/lib/utils/nextjs/nextApi/nextApi'

export type ${namePascalCase}NextClientProps = ${namePascalCase}Props

export type ${namePascalCase}NextClientReturn = ${namePascalCase}Return

export default async function ${nameCamelCase}NextClient(
  props: ${namePascalCase}Props & { isExternalCall?: boolean },
) {
  const { ...payload } = props || {}
  const res = await nextApi<Awaited<${namePascalCase}Return>, ${namePascalCase}Props>({
    name: '${nameCamelCase}',
    payload,
    isExternalCall: props.isExternalCall,
  })

  if (res.error) {
    throw new Error(res.error, {
      cause: { props, res, functionName: '${nameCamelCase}NextClient' },
    })
  }

  return res
}
`
    },
  },

  // Consumer hook
  {
    path: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const fileName = `use${namePascalCase}.ts`

      return `${consumerFolderName}${fileName}`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import type { UseAsyncProps } from '@useweb/use-async'
import useAsync from '@useweb/use-async'

import ${nameCamelCase} from '../../${nameCamelCase}.js'

import type {
  ${namePascalCase}NextClientProps,
  ${namePascalCase}NextClientReturn,
} from './${nameCamelCase}.next.client.js'

import logError from '@/src/lib/utils/loggers/logError/logError.js'

export type Use${namePascalCase}Props = UseAsyncProps

export default function use${namePascalCase}(props: Use${namePascalCase}Props) {
  const _${nameCamelCase} = useAsync<${namePascalCase}NextClientProps, Awaited<${namePascalCase}NextClientReturn>>({
    ...props,

    fn: async (p) => {
      const res = await ${nameCamelCase}(p)
      return res
    },

    onError({ error, fnProps }) {
      logError({
        error,
        fnName: '${nameCamelCase}',
        metadata: { fnProps },
      })
    },
  })

  return _${nameCamelCase}
}

export type Use${namePascalCase}NextClientReturn = ReturnType<typeof use${namePascalCase}>
`
    },
  },

  // Consumer hook persist
  {
    path: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const fileName = `use${namePascalCase}Persist.ts`

      return `${consumerFolderName}${fileName}`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import useData, { createUseDataId, type PartialRequired } from '@useweb/use-data'

import type {
  ${namePascalCase}NextClientProps,
  ${namePascalCase}NextClientReturn,
} from './${nameCamelCase}.next.client.js'
import ${nameCamelCase}NextClient from './${nameCamelCase}.next.client.js'

import logError from '@/src/lib/utils/loggers/logError/logError.js'

export type Use${namePascalCase}PersistProps = ${namePascalCase}NextClientProps
type PartialPayloadSchema = PartialRequired<Use${namePascalCase}PersistProps>

export const get${namePascalCase}DataId = (props: PartialPayloadSchema) => {
  const id = createUseDataId<Use${namePascalCase}PersistProps>({
    name: '${nameCamelCase}',
    props,
  })
  return id
}

export default function use${namePascalCase}Persist(
  props: PartialPayloadSchema,
) {
  const _${nameCamelCase} = useData<Awaited<${namePascalCase}NextClientReturn>, ${namePascalCase}NextClientProps>({
    id: get${namePascalCase}DataId(props).id,
    get: {
      fetcher: async () => {
        const { data } = await ${nameCamelCase}NextClient(props as ${namePascalCase}NextClientProps)

        return [data]
      },
      onGetError({ error }) {
        logError({
          error,
          fnName: 'use${namePascalCase}',
          metadata: { props },
        })
      },
    },
  })

  return _${nameCamelCase}
}

export type Use${namePascalCase}PersistReturn = ReturnType<typeof use${namePascalCase}Persist>
`
    },
  },

  // Consumer story
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `stories/${nameCamelCase}.stories.tsx`

      return `${consumerFolderName}${fileName}`
    },
    template: ({ name, helpers, folderPath }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const storyPrefix = getStoryPrefix({
        folderPath: folderPath || '',
      })

      return `import React from 'react'
import AsyncTester from '@useweb/async-tester'

import ${nameCamelCase}Client, { type ${namePascalCase}NextClientProps } from '../${nameCamelCase}.next.client.js'

const args: ${namePascalCase}NextClientProps = {
  name: 'hello',
}

export default {
  title: '${storyPrefix}/${nameCamelCase}',
  args,
  parameters: {
    signInAs: false,
  },
}

export const Test = {
  render: (args: ${namePascalCase}NextClientProps) => {
    return (
      <AsyncTester<
        any,
        {
          payload: ${namePascalCase}NextClientProps
        }
      >
        // if using triggerComponent change to async(fnArgs)=> fetcher(fnArgs)
        fn={async () => {
          return await ${nameCamelCase}Client(args)
        }}
        autoExec
      />
    )
  },
}
`
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Function with Next Pages API Function Consumer',
  files,
}

export default template
