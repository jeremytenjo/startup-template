import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

import createSchemaName from '../../utils/createSchemaName/createSchemaName.js'
import { getStoryPrefix } from '../misc/story.js'

import { getSchemaImportPath } from './dataQueryUi.js'

type CustomProps = {
  folderPath: string
}

const files: SuperCodeGeneratorFilesSchema<CustomProps> = [
  // hook
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)

      return `queries/use${pascalName}/use${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const camelCase = helpers?.changeCase?.camelCase(name)
      const schemaName = createSchemaName({ name }).schemaName
      const getpropsName = `Get${pascalName}Props`
      const createpropsName = `Create${pascalName}PayloadProps`
      const propsUpdaterName = `Update${pascalName}PayloadProps`
      const removePropsName = `Remove${pascalName}PayloadProps`

      return `import useData, { createUseDataId, type UseDataProps, type PartialRequired } from '@useweb/use-data'
      
      import useGet${pascalName}, { type ${getpropsName} } from './useGet${pascalName}/useGet${pascalName}.js'
      import useCreate${pascalName}, { type ${createpropsName} } from './useCreate${pascalName}/useCreate${pascalName}.js'
      import useUpdate${pascalName}, { type ${propsUpdaterName} } from './useUpdate${pascalName}/useUpdate${pascalName}.js'
      import useRemove${pascalName}, { type ${removePropsName} } from './useRemove${pascalName}/useRemove${pascalName}.js'
      
      import { type ${schemaName} } from '${getSchemaImportPath(name)}'

      type UseDataPropsValues = UseDataProps<
        ${schemaName},
        ${getpropsName},
        ${createpropsName},
        ${propsUpdaterName},
        ${removePropsName}
      >

      type FetcherProps = PartialRequired<${getpropsName}>
      
      export type Use${pascalName}Props = FetcherProps & {
        getOptions?: UseDataPropsValues['get']
        createOptions?: UseDataPropsValues['create']
        updateOptions?: UseDataPropsValues['update']
        removeOptions?: UseDataPropsValues['remove']
      }

      export const get${pascalName}DataId = (props: FetcherProps) => {
        const id = createUseDataId<${getpropsName}>({
          name: '${camelCase}',
          props,
        })
        return id
      }
      
      export default function use${pascalName}(
        props: Use${pascalName}Props = {
          uid: undefined,
        },
      ) {
        const fetcherProps: FetcherProps = {
          uid: props.uid,
        }

        const get = useGet${pascalName}({ 
          ...props?.getOptions,
          fetcherPayload: {
            ...props.getOptions?.fetcherPayload,
            ...fetcherProps,
          }
        })
        const create = useCreate${pascalName}(props?.createOptions)
        const update = useUpdate${pascalName}(props?.updateOptions)
        const remove = useRemove${pascalName}(props?.removeOptions)
      
        const ${camelCase} = useData<${schemaName}, ${getpropsName}, ${createpropsName}, ${propsUpdaterName}, ${removePropsName}>({
          id: get${pascalName}DataId(fetcherProps).id,
          get,
          create,
          update,
          remove
        })
      
        return ${camelCase}
      }
      
      `
    },
  },

  // use hook UI
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)

      return `queries/use${pascalName}/ui/readme.md`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)

      return `## use${pascalName} UI

Add UI that uses 'use${pascalName}' here.
      `
    },
  },

  // stories
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const pascalName = helpers?.changeCase?.pascalCase(name)

      return `queries/use${pascalName}/stories/${camelCase}.stories.tsx`
    },
    template: ({ name, helpers, customProps }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const camelCase = helpers?.changeCase?.camelCase(name)

      const storyPrefix = getStoryPrefix({
        folderPath: customProps?.folderPath || `src/data/${camelCase}`,
      })

      return `import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      
      // get
      import {
        get${pascalName},
        type Get${pascalName}Props,
      } from '../useGet${pascalName}/useGet${pascalName}.js'
      // create
      //import {
      //  create${pascalName},
      //  type Create${pascalName}PayloadProps,
      //} from '../useCreate${pascalName}/useCreate${pascalName}.js'
      // update
      //import {
      //  update${pascalName},
      //  type Update${pascalName}PayloadProps,
      //} from '../useUpdate${pascalName}/useUpdate${pascalName}.js'
      // remove
      //import {
      //  remove${pascalName},
      //  type Remove${pascalName}PayloadProps,
      //} from '../useRemove${pascalName}/useRemove${pascalName}.js'
      
      export default {
        title: '${storyPrefix}/${pascalName}',
        parameters: {
          signInAs: false,
        },
      }
      
      export const Get${pascalName} = {
        render: () => {
          const payload: Get${pascalName}Props = {
            uid: '1',
          }
          const fn = async () => {
            get${pascalName}(payload)
          }
          return <AsyncTester fn={fn} autoExec />
        },
      }
      
      // export const Create${pascalName} = {
      //   render: () => {
      //     const payload: Create${pascalName}PayloadProps = {}
      //     const fn = async () => create${pascalName}(payload)
      //     return <AsyncTester fn={fn} autoExec />
      //   },
      // }
      
      // export const Update${pascalName} = {
      //   render: () => {
      //     const payload: Update${pascalName}PayloadProps = {}
      //     const fn = async () => update${pascalName}(payload)
      //     return <AsyncTester fn={fn} autoExec />
      //   },
      // }
      
      // export const Remove${pascalName} = {
      //   render: () => {
      //     const payload: Remove${pascalName}PayloadProps = {}
      //     const fn = async () => remove${pascalName}(payload)
      //     return <AsyncTester fn={fn} autoExec />
      //   },
      // }
      `
    },
  },

  // get
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)

      return `queries/use${pascalName}/useGet${pascalName}/useGet${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const schemaName = createSchemaName({ name }).schemaName
      const propsName = `Get${pascalName}Props`

      return `
import { type UseDataProps } from '@useweb/use-data'
import assert from '@useweb/assert'

import logError from '@/src/lib/utils/loggers/logError/logError'
import { type ${schemaName} } from '${getSchemaImportPath(name)}'

// fetcher
export type ${propsName} = {
  uid: ${schemaName}['uid']
}

export const get${pascalName} = async (props: ${propsName}) => {
  assert<${propsName},>({ props, requiredProps: ['uid'] })
  const ${name}: ${schemaName}[] = []

  return ${name}
}

// hook
type useGet${pascalName}Props = UseDataProps<${schemaName}>['get']
type useGet${pascalName}Return = UseDataProps<${schemaName}>['get']

export default function useGet${pascalName}(
  props: useGet${pascalName}Props,
): useGet${pascalName}Return {

  const get: useGet${pascalName}Return = {
    ...props,
    fetcher: get${pascalName},

    onGet: (result) => {
      props?.onGet && props.onGet(result)
    },

    onGetError: (error) => {
      logError({
        error: error.error,
        fnName: 'useGet${pascalName}',
        metadata: { props },
      })
      props?.onGetError && props.onGetError(error)
    },
  }

  return get
}
`
    },
  },

  // create
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)

      return `queries/use${pascalName}/useCreate${pascalName}/useCreate${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const schemaName = createSchemaName({ name }).schemaName
      const propsName = `Create${pascalName}PayloadProps`

      return `
      import { type UseDataProps, type CreatorProps } from '@useweb/use-data'
      
      import logError from '@/src/lib/utils/loggers/logError/logError'
      import { type ${schemaName} } from '${getSchemaImportPath(name)}'

      export type ${propsName} = any

      // creator
      export const create${pascalName} = async (props: CreatorProps<${schemaName}, ${propsName}>) => {
        if (!props.newItem) {
          throw new Error('Missing newItem prop')
        }
      
        const newItem: ${schemaName} = {
          ...props.newItem,
        }
      
        return { newItem }
      }

      export type Create${pascalName}Return = ReturnType<typeof create${pascalName}>
      
      // hook
      type useCreate${pascalName}Props = UseDataProps<${schemaName}>['create']
      type useCreate${pascalName}Return = UseDataProps<${schemaName}>['create']
      
      export default function useCreate${pascalName}(
        props: useCreate${pascalName}Props,
      ): useCreate${pascalName}Return {
        const create: useCreate${pascalName}Return = {
          creator: create${pascalName},
      
          onCreate: (result) => {
            props?.onCreate && props?.onCreate(result)
          },
      
          onCreateError: (error) => {      
            logError({
              error: error.error, 
              fnName: 'useCreate${pascalName}',
              metadata: { props },
            })
            props?.onCreateError && props?.onCreateError(error)

          },
        }
      
        return create
      }
      `
    },
  },

  // update
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)

      return `queries/use${pascalName}/useUpdate${pascalName}/useUpdate${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const schemaName = createSchemaName({ name }).schemaName
      const propsName = `Update${pascalName}Props`
      const propsUpdaterName = `Update${pascalName}PayloadProps`

      return `import { type UseDataProps, type UpdaterProps } from '@useweb/use-data'
      import type { UpdaterReturn } from '@useweb/use-data/build/types/handlers/useUpdate'
      
      import logError from '@/src/lib/utils/loggers/logError/logError'
      import { type ${schemaName} } from '${getSchemaImportPath(name)}'

      export type ${propsUpdaterName} = any

      type ${propsName} = UpdaterProps<${schemaName}, ${propsUpdaterName}>
      
      // updater      
      export const update${pascalName} = async (props: ${propsName}): Promise<UpdaterReturn<${schemaName}>> => {
        if (!props.value.id) {
          throw new Error("missing 'id' property on value")
        }
      
        return { updatedItem: props.value }
      }
      
      // hook
      type useUpdate${pascalName}Props = UseDataProps<${schemaName}>['update']
      type useUpdate${pascalName}Return = UseDataProps<${schemaName}>['update']
      
      export default function useUpdate${pascalName}(
        props: useUpdate${pascalName}Props,
      ): useUpdate${pascalName}Return {
      
        const update: useUpdate${pascalName}Return = {
          updater: update${pascalName},
      
          onUpdate: (result) => {
            props?.onUpdate && props.onUpdate(result)
          },
      
          onUpdateError: (error) => {
            logError({
              error: error.error, 
              fnName: 'useUpdate${pascalName}',
              metadata: { props },
            })
            props?.onUpdateError && props.onUpdateError(error)
          },
        }
      
        return update
      }
      
      `
    },
  },

  // remove
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)

      return `queries/use${pascalName}/useRemove${pascalName}/useRemove${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const schemaName = createSchemaName({ name }).schemaName
      const propsName = `Remove${pascalName}Props`
      const removePropsName = `Remove${pascalName}PayloadProps`

      return `import { type UseDataProps, type RemoverProps } from '@useweb/use-data'

      import logError from '@/src/lib/utils/loggers/logError/logError'
      import { type ${schemaName} } from '${getSchemaImportPath(name)}'

      export type ${removePropsName} = any

      type ${propsName} = RemoverProps<${schemaName}, ${removePropsName}>
      
      // remover
      export const remove${pascalName} = async (props: ${propsName}) => {
        if (!props.removedItemId) {
          throw new Error('No id provided to remove${pascalName}')
        }
      }
      
      // hook
      type useRemove${pascalName}Props = UseDataProps<${schemaName}>['remove']
      type useRemove${pascalName}Return = UseDataProps<${schemaName}>['remove']
      
      export default function useRemove${pascalName}(
        props: useRemove${pascalName}Props,
      ): useRemove${pascalName}Return {
      
        const remove: useRemove${pascalName}Return = {
          remover: remove${pascalName},
      
          onRemove: (result) => {
            props?.onRemove && props.onRemove(result)
          },
      
          onRemoveError: (error) => {
            logError({
              error: error.error, 
              fnName: 'useRemove${pascalName}',
              metadata: { props },
            })
            props?.onRemoveError && props.onRemoveError(error)
          },
        }
      
        return remove
      }
      
`
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema<CustomProps> = {
  type: 'Data Query',
  files,
}

export default template
