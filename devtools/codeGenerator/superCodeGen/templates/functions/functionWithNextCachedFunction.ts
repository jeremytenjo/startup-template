import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}.ts`

      return `${fileName}`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const propsName = `${namePascalCase}Props`
      const returnName = `${namePascalCase}Return`

      return `import assert from '@useweb/assert'
      
export type ${propsName} = {name: string}
    
    export default async function ${nameCamelCase}(props: ${propsName}) {
      assert<${propsName},>({ props, requiredProps: ['name'] })

      const data = []
      
      return { data }
    }
    
    export type ${returnName} = ReturnType<typeof ${nameCamelCase}>`
    },
  },
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `consumers/nextCachedFunction/${nameCamelCase}.nextCachedFunction.ts`

      return `${fileName}`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import { unstable_cache } from 'next/cache'

import type { ${namePascalCase}Props } from '../../${nameCamelCase}.js'
import ${nameCamelCase} from '../../${nameCamelCase}.js'

import { ${nameCamelCase}NextCachedFunctionConfig } from './${nameCamelCase}.nextCachedFunction.config.js'

export default async function ${nameCamelCase}NextCachedFunction(
  props: ${namePascalCase}Props,
) {
  const fetcher = unstable_cache(
    async () => {
      console.log('Fetching ${nameCamelCase}...')

      const pageProps = await ${nameCamelCase}(props)

      return pageProps
    },
    [${nameCamelCase}NextCachedFunctionConfig.tag],
    {
      tags: [${nameCamelCase}NextCachedFunctionConfig.tag],
    },
  )

  const pageProps = await fetcher()

  return pageProps
}

export type ${namePascalCase}NextCachedFunctionReturn = ReturnType<
  typeof ${nameCamelCase}NextCachedFunction
>

`
    },
  },
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `consumers/nextCachedFunction/${nameCamelCase}.nextCachedFunction.config.ts`

      return `${fileName}`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)

      return `export const ${nameCamelCase}NextCachedFunctionConfig = {
  tag: '${nameCamelCase}',
}
`
    },
  },
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `consumers/nextCachedFunction/${nameCamelCase}.nextCachedFunction.revalidate.ts`

      return `${fileName}`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import { revalidateTag } from 'next/cache'

import { ${nameCamelCase}NextCachedFunctionConfig } from './${nameCamelCase}.nextCachedFunction.config.js'

export default function ${nameCamelCase}NextCachedFunctionRevalidate() {
  revalidateTag(${nameCamelCase}NextCachedFunctionConfig.tag)
}

export type ${namePascalCase}NextCachedFunctionReturn = ReturnType<
  typeof ${nameCamelCase}NextCachedFunctionRevalidate
>
`
    },
  },
]

const functionWithNextCachedFunction: SuperCodeGeneratorTemplateSchema = {
  type: 'Function With Next Cached Function',
  files,
}

export default functionWithNextCachedFunction
