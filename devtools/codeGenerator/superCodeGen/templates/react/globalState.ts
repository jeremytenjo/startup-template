import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name, helpers }) => {
      const upperName = helpers?.changeCase?.pascalCase(name)

      return `use${upperName}Store.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const upperName = helpers?.changeCase?.pascalCase(name)

      return `import create from 'zustand'

type ${upperName}StoreProps = {
  saving: any
  setsaving: (props: any) => any
}

export const ${camelCase}Store = create<${upperName}StoreProps>((set) => ({
  saving: undefined,
  setsaving: (payload) =>
    set(() => {
      return { saving: payload }
    })
}))

const use${upperName}Store = ${camelCase}Store

export default use${upperName}Store
`
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Global State',
  files,
}

export default template
