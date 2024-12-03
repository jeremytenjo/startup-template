import changeCaseFn from 'change-case'
import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const getFunctionFileName = ({ name }) => {
  const camelCase = changeCaseFn.camelCase(name)

  return `ph_${camelCase}.ts`
}

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name }) => {
      return getFunctionFileName({ name })
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const snakeCase = helpers?.changeCase?.snakeCase(name)

      return `import assert from '@useweb/assert'

      import postHog from '@/src/lib/integrations/PostHog/postHog'
      
      export type PH_${pascalCase}Props = { name: string }
      
      export default function ph_${camelCase}(
        props: PH_${pascalCase}Props,
      ) {
        assert<PH_${pascalCase}Props,>({
          props,
          requiredProps: ['name'],
        })
      
        postHog({
          eventName: '${snakeCase}',
          data: {
            metadata: {
              ...props,
            }
          },
        })
      }
      
      export type PH_${pascalCase}Return = ReturnType<
        typeof ph_${camelCase}
      >      
    `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'PostHog Event',
  usageInstructions:
    'Use present-tense verbs, e.g., "submit" and "create" instead of "submitted" and "created". Use no case.',
  files,
  options: {
    formatParentFolderName: ({ currentName }) => {
      return {
        newName: getFunctionFileName({ name: currentName }),
      }
    },
  },
}

export default template
