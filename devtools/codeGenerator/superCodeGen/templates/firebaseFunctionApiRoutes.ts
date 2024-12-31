import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const exampleRouteName = 'exampleRoute'

const files: SuperCodeGeneratorFilesSchema = [
  // Raw Function
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      return `${camelCase}.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `import ${camelCase}Routes from './routes/${camelCase}.routes.js'

      import type {
        ApiRouteSchema,
        RouteSchemaProps,
      } from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'
      
      export type ${pascalCase}Props<RouteSchema extends RouteSchemaProps = any> = {
        authUser: ApiRouteSchema['authUser']
        context: ApiRouteSchema<RouteSchema>
      }
      
      export type ${pascalCase}Return<RouteSchema extends RouteSchemaProps> =
        RouteSchema['return']
      
      export default async function ${camelCase}<RouteSchema extends RouteSchemaProps>(
        props: ${pascalCase}Props,
      ): Promise<${pascalCase}Return<RouteSchema>> {
        if (props.context.route.startsWith('routes/')) {
          return await ${camelCase}Routes<RouteSchema>(props)
        }
      
        throw new Error(${'`'}Route doesn't exist - ${'${props.context.route}`'})
      }
      `
    },
  },

  // Client Function
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      return `${camelCase}.client.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `import type { UseAsyncProps } from '@useweb/use-async'

      import type {
        ${pascalCase}Props,
        ${pascalCase}Return,
      } from './${name}.js'

      import {
         callFirebaseFunction,
         type RouteSchemaProps,
      } from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'
      
      export type ${pascalCase}ClientProps<RouteSchema extends RouteSchemaProps> = {
        api: Omit<${pascalCase}Props<RouteSchema>['context'], 'return' | 'authUser'>
        options?: Partial<
          UseAsyncProps<${pascalCase}ClientProps<RouteSchema>['api'], RouteSchema['return']>
        >
      }
      
      export default async function ${camelCase}Client<
        RouteSchema extends RouteSchemaProps,
      >(
        props: ${pascalCase}ClientProps<RouteSchema>,
      ): Promise<${pascalCase}Return<RouteSchema>> {
        const res = await callFirebaseFunction({
          name: '${name}',
          api: props.api,
        })  

        return res
      }
      
      export type ${pascalCase}ClientReturn<RouteSchema extends RouteSchemaProps> =
        ${pascalCase}Return<RouteSchema>

      `
    },
  },

  // useAsync hook
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const _name = `use${pascalCase}Client`

      return `utils/${_name}/${_name}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const camelCase = helpers?.changeCase?.camelCase(name)

      return `import useAsync from '@useweb/use-async'
      
      import type { ApiRouteSchema } from '../../../utils/useApiRouteData/useApiRouteData.js'
      import logError from '../../../../../src/lib/utils/loggers/logError/logError.js'
      import type { ${pascalCase}ClientProps } from '../../${camelCase}.client.js'
      import ${camelCase}Client from '../../${camelCase}.client.js'
      
      export function use${pascalCase}Client<RouteSchema extends ApiRouteSchema>(
        props: ${pascalCase}ClientProps<RouteSchema>,
      ) {
        const ${camelCase} = useAsync<
          ${pascalCase}ClientProps<RouteSchema>['api'],
          RouteSchema['return']
        >({
          fn: async () => await ${camelCase}Client(props),
          ...props.options,
          onError({ error, fnProps }) {
            logError({
              error,
              fnName: 'use${pascalCase}Client',
              metadata: { props, fnProps },
            })
          },
        })
      
        return ${camelCase}
      }
      `
    },
  },

  // useData hook
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const _name = `use${pascalCase}Persist`

      return `utils/${_name}/${_name}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const camelCase = helpers?.changeCase?.camelCase(name)

      return `import useData from '@useweb/use-data'
import logError from '@/src/lib/utils/loggers/logError/logError'
import { useMemo } from 'react'

import ${camelCase}Client, {
  type ${pascalCase}ClientProps,
  type ${pascalCase}ClientReturn,
} from '../../${camelCase}.client.js'
import type { ApiRouteSchema } from '../../../utils/useApiRouteData/useApiRouteData.js'
import type UserSchema from '../../../../../src/data/users/user.schema.js'

export type Use${pascalCase}PersistProps<RouteSchema extends ApiRouteSchema> =
  ${pascalCase}ClientProps<RouteSchema>

export function get${pascalCase}DataId<RouteSchema extends ApiRouteSchema>(props: {
  authId: string | undefined
  route: RouteSchema['route']
  id: string | undefined
  allowUnauthenticatedUser: boolean
}) { 
  const extraId = props.id ? ${helpers?.wrapInTemplateLiteral({
    text: `/${helpers?.wrapInTemplateLiteral({
      text: 'props.id',
      isPlaceholder: true,
    })}`,
  })} : ''
  let dataId =
    props.authId && props.route
      ? ${helpers?.wrapInTemplateLiteral({
        text: `${camelCase}/${helpers?.wrapInTemplateLiteral({
          text: 'props.authId',
          isPlaceholder: true,
        })}/${helpers?.wrapInTemplateLiteral({
          text: 'props.route',
          isPlaceholder: true,
        })}${helpers?.wrapInTemplateLiteral({
          text: 'extraId',
          isPlaceholder: true,
        })}`,
      })} 
      : undefined

  if (props.allowUnauthenticatedUser && props.route) {
    dataId = ${helpers?.wrapInTemplateLiteral({
      text: `${camelCase}/${helpers?.wrapInTemplateLiteral({
        text: 'props.route',
        isPlaceholder: true,
      })}${helpers?.wrapInTemplateLiteral({
        text: 'extraId',
        isPlaceholder: true,
      })}`,
    })}
  }

  return {
    id: dataId,
  }
}

export default function use${pascalCase}Persist<RouteSchema extends ApiRouteSchema>(
  props: Partial<Use${pascalCase}PersistProps<RouteSchema>> & {
    currentUser: UserSchema | undefined
    id: string | undefined
    allowUnauthenticatedUser?: boolean
  },
) {
  const id = useMemo(() => {
    return props?.id
      ? get${pascalCase}DataId({
          authId: props.currentUser?.id,
          route: props.api?.route as string,
          id: props.id,
          allowUnauthenticatedUser: Boolean(props.allowUnauthenticatedUser),
        }).id
      : undefined
  }, [props.currentUser?.id, props.api?.route, props.id, props.allowUnauthenticatedUser])

  const ${camelCase} = useData<
    Awaited<${pascalCase}ClientReturn<RouteSchema>['data']>,
    ${pascalCase}ClientProps<RouteSchema>,
    ${pascalCase}ClientProps<RouteSchema>['api']['payload']
  >({
    id,
    get: {
      fetcher: async (p) => {
        const ${camelCase}Res = await ${camelCase}Client<RouteSchema>({
          options: props.options,
          api: {
            route: props.api?.route,
            payload: {
              ...(props.api?.payload || {}),
              ...(p.api?.payload || {}),
            },
          },
        })

        if (${camelCase}Res.data) {
          return ${camelCase}Res.data
        }

        return []
      },
      onGet({ result }) {
        if (props.options?.onResult) {
          props.options.onResult({
            result: {
              data: [result[0]['0']],
            },
          })
        }
      },
      onGetError({ error }) {
        logError({
          error,
          fnName: ${helpers?.wrapInTemplateLiteral({
            text: `use${pascalCase}Persist - get - ${helpers?.wrapInTemplateLiteral({
              text: 'props.api?.route',
              isPlaceholder: true,
            })}`,
          })} ,
          metadata: { props },
        })
      },
    },
  })

  return ${camelCase}
}

export type Use${pascalCase}Return = ReturnType<typeof use${pascalCase}Persist>
`
    },
  },

  // Firebase Function
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      return `${camelCase}.firebase.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `import type { CallableRequest } from 'firebase-functions/v2/https'
      import ${camelCase} from './${camelCase}.js'
      import logFirebaseCloudFunctionError from '../utils/logFirebaseCloudFunctionError/logFirebaseCloudFunctionError.js'
      
      export type ${pascalCase}PropsFirebase = {
        request: CallableRequest<any>
      }
      
      export default async function ${camelCase}Firebase(
        props: ${pascalCase}PropsFirebase,
      ) {
        try {
          return await ${camelCase}<any>({
            authUser: props.request.auth,
            context: props.request.data,
          })
        } catch (error: any) {
          logFirebaseCloudFunctionError({
            fnName: '${camelCase}',
            description: error,
            uid: props.request?.auth?.uid,
            throwHttpsError: true,
            metadata: error.cause
          })
        }
      }`
    },
  },

  // Routes Index
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      return `routes/${camelCase}.routes.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `import assert from '@useweb/assert'
      import type {
        ${pascalCase}Props,
        ${pascalCase}Return,
      } from '../${camelCase}.js'

      import type {
        RouteSchemaProps,
      } from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'

      import * as ${exampleRouteName} from './${exampleRouteName}/${exampleRouteName}.js'
      
      export type ${pascalCase}RoutesProps = ${pascalCase}Props
      
      export default async function ${camelCase}Routes<
        RouteSchema extends RouteSchemaProps,
      >(props: ${pascalCase}RoutesProps): Promise<${pascalCase}Return<RouteSchema>> {
        assert<${pascalCase}RoutesProps>({
          props,
          requiredProps: ['context'],
        })
      
        if (props.context.route === ${exampleRouteName}.routeId) {
          try {
            return await ${exampleRouteName}.default({
              authUser: props.authUser,
              payload: props.context.payload,
            })
          } catch (error: any) {
            throw new Error(${'`'}$${'{'}${exampleRouteName}.routeId} - ${'${error}`'}, {
              cause: error?.cause,
            })
          }
        }
            
        throw new Error(${'`'}Action doesn't exist - ${'${props.context.route}`'})
      }
      `
    },
  },

  // Routes Example
  {
    path: () => {
      return `routes/${exampleRouteName}/${exampleRouteName}.ts`
    },
    template: ({ helpers }) => {
      const fnNameCamelCase = helpers?.changeCase?.camelCase(exampleRouteName)
      const fnNamePascalCase = helpers?.changeCase?.pascalCase(exampleRouteName)

      return `import assert from '@useweb/assert'
      import type { CallableRequest } from 'firebase-functions/v2/https'
      
      export const routeId = ${'`'}routes/${fnNameCamelCase}${'`'}
      
      export type API${fnNamePascalCase}Props = {
        route: typeof routeId
        authUser: CallableRequest['auth']
        payload: {
          name: string
        }
        return: Awaited<${fnNamePascalCase}Return>
      }
      
      export type ${fnNamePascalCase}PropsInternal = Omit<API${fnNamePascalCase}Props, 'route' | 'return'>
      
      export default async function ${fnNameCamelCase}(props: ${fnNamePascalCase}PropsInternal): ${fnNamePascalCase}Return {
        assert<${fnNamePascalCase}PropsInternal>({ props, requiredProps: ['payload'] })
        assert<API${fnNamePascalCase}Props['payload']>({
          props: props.payload,
          requiredProps: [],
        })

        const data = 'hi'
      
        return { data }
      }
      
      export type ${fnNamePascalCase}Return = Promise<{
        data: any
      }>
      `
    },
  },

  // Route Example Stories
  {
    path: () => {
      return `routes/${exampleRouteName}/stories/${exampleRouteName}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const fnNameCamelCase = helpers?.changeCase?.camelCase(exampleRouteName)
      const fnNamePascalCase = helpers?.changeCase?.pascalCase(exampleRouteName)

      return `import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      import ${name}Client from '../../../${name}.client.js'
      import type { API${fnNamePascalCase}Props } from '../${fnNameCamelCase}.js'
      
      export default {
        title: 'Cloud Functions/firebase/${name}/routes/${fnNameCamelCase}',
        parameters: {
          signInAs: false,
        },
      }
      
      const Template = () => {
        const fn = async () => {
          const res = await ${name}Client<API${fnNamePascalCase}Props>({
            api: {
              route: 'routes/${fnNameCamelCase}',
              payload: {
                name: 'hello'
              },
            }
          })
      
          return res
        }
      
        return (
          <>
            <AsyncTester<any, any> fn={fn} autoExec />
          </>
        )
      }
      
      export const Default = {
        render: () => {
          return <Template />
        },
      }
      
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Firebase Function with API routes',
  files,
}

export default template
