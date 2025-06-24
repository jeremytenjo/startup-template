import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const rootpath = 'lib/integrations/PostHog/events/browser'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase.camelCase(name)
      return `${rootpath}/ph_${camelCase}/ph_${camelCase}.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const snakeCase = helpers?.changeCase?.snakeCase(name)

      return `import assert from '@useweb/assert'

      import postHog from '@/lib/integrations/PostHog/utils/postHog'
      
      export type PH_${pascalCase}Props = { name: string; metadata?: object }
      
      export default function ph_${camelCase}(
        props: PH_${pascalCase}Props,
      ) {
        try {
        assert<PH_${pascalCase}Props,>({
          props,
          requiredProps: ['name'],
        })
      
        postHog({
          eventName: '${snakeCase}',
          data: {
              ...props,
          },
        })
        } catch (error) {
          console.error('Error in ph_${camelCase}:', error)
        }
      }
      
      export type PH_${pascalCase}Return = ReturnType<
        typeof ph_${camelCase}
      >      
    `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'PostHog Event - Browser',
  usageInstructions:
    'Use present-tense verbs, e.g., "submit" and "create" instead of "submitted" and "created". Use no case.',
  files,
  options: {
    outputInRootFolder: true,
    createNamedFolder: false,
  },
}

export default template
