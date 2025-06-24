import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

import { getStoryPrefix } from '../misc/story.js'

const files: SuperCodeGeneratorFilesSchema = [
  // function
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      return `${camelCase}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const camelCase = helpers?.changeCase?.camelCase(name)

      return `import assert from '@useweb/assert'

export type ${pascalCase}Props = { name: string }

export default async function ${camelCase}(
  props: ${pascalCase}Props,
) {
  assert<${pascalCase}Props>({ props, requiredProps: ['name'] })

  const name = props.name

  return { name }
}

export type ${pascalCase}Return = ReturnType<
  typeof ${camelCase}
>
`
    },
  },

  // Firebase Route
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)

      return `consumers/firebaseHttpFunction/${camelCase}.firebaseHttpFunction.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `import assert from '@useweb/assert'
import logger from 'firebase-functions/logger'

import ${camelCase}, {
  type ${pascalCase}Props,
  type ${pascalCase}Return,
} from '../../${camelCase}.js'

export const routeId = 'routes/${camelCase}'

export type API_${pascalCase}Props = {
  route: typeof routeId
  payload: ${pascalCase}Props
  return: Awaited<${pascalCase}Return>
}

export type ${pascalCase}PropsInternal = Omit<
  API_${pascalCase}Props,
  'route' | 'return'
>

export default async function ${camelCase}FirebaseHttpFunction(
  props: ${pascalCase}PropsInternal,
): ${pascalCase}Return {
  logger.info(${'`'}START: ${'${'}routeId${'}'}${'`'}, { props })

  assert<${pascalCase}PropsInternal>({ props, requiredProps: ['payload'] })

  const response = await ${camelCase}(props.payload)

  logger.info(${'`'}END: ${'${'}routeId${'}'}${'`'}, { response })

  return response
}

      `
    },
  },

  // Story
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)

      return `consumers/firebaseHttpFunction/stories/${camelCase}.stories.tsx`
    },
    template: ({ name, helpers, folderPath }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const storyPrefix = getStoryPrefix({ folderPath: folderPath || '' })

      return `
      import React from 'react'
import FirebaseFunctionTester, {
  type FirebaseFunctionTesterProps,
} from '@useweb/firebase-function-tester'

import type { API_${pascalCase}Props } from '../${camelCase}.firebaseHttpFunction.js'

type ArgsProps = FirebaseFunctionTesterProps<
  any,
  Omit<API_${pascalCase}Props, 'return'>
>

const args: ArgsProps = {
  functionName: 'publicFirebaseFunctions',
  payload: {
    route: 'routes/${camelCase}',
    payload: {
      name: 'world',
    },
  },
}

export default {
  title: '${storyPrefix}/${camelCase}',
  args,
}

export const Default = {
  render: (args: ArgsProps) => {
    return <FirebaseFunctionTester {...args} />
  },
} 

      `
    },
  },
]

const functionWithFirebaseHttpFunctionRoute: SuperCodeGeneratorTemplateSchema = {
  type: 'Function With Firebase HTTP Function Route Consumer',
  files,
}

export default functionWithFirebaseHttpFunctionRoute
