import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name }) => {
      return `${name}.ts`
    },
    template: ({ name }) => {
      return `import { spinner, intro, outro } from '@clack/prompts'
      import chalk from 'chalk'

    export default async function ${name}() {
      intro(chalk.cyan('${name}'))
      const s = spinner()
      s.start('${name} start')

      try {
        // functionhere
        
        s.stop()    
        outro(chalk.green('Done'))
      } catch (error: any) {
        s.stop()
        outro(chalk.red(String(error)))
        {
          error.cause && outro(chalk.red(JSON.stringify(error.cause, null, 2)))
        }
      }
    }`
    },
  },
  {
    path: () => {
      return `run.ts`
    },
    template: ({ name }) => {
      return `import ${name} from './${name}.js'
      console.clear()
      ${name}()
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Script',
  files,
}

export default template
