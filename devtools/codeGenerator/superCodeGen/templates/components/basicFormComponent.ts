import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  // Form Component
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const formComponentName = `${pascalName}`

      return `${formComponentName}/${formComponentName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const formHookName = `use${pascalName}`
      const useSubmitForm = `useSubmit${pascalName}`

      return `import React from 'react'
import Box from '@useweb/ui/Box'
import Form from '@useweb/ui/Form'
import TextField from '@useweb/ui/TextField'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import useSnackbar from '@useweb/ui/Snackbar'

import ${formHookName} from '../${formHookName}/${formHookName}.js'
import ${useSubmitForm} from '../${useSubmitForm}/${useSubmitForm}.js'

export type ${pascalName}Schema = {
  name: string
}

export type ${pascalName}Props = any

export default function ${pascalName}(props: ${pascalName}Props) {
  const snackbar = useSnackbar()
  const submitForm = ${useSubmitForm}({
    onSuccess: () => {
      snackbar.show({
      message: 'Success',
    })
  },
})  
  return (
    <Form<${pascalName}Schema>
      data-id='${pascalName}'
      onSubmit={({ formValues }) => {
        submitForm.exec({...formValues})
      }}
    >
      <${pascalName}Content
        {...props}
        submissionError={submitForm.error}
        submitting={submitForm.loading}
      />
    </Form>
  )
}

type ${pascalName}ContentProps = ${pascalName}Props & {
  submissionError: string | Error | null
  submitting: boolean
}

const ${pascalName}Content = (props: ${pascalName}ContentProps) => {
  const formData = ${formHookName}()

  return (
      <Box data-id='${pascalName}Content' sx={{
        display: 'grid',
        gap: 2,
      }}>
        <TextField<${pascalName}Schema>
           name='name'
           label='name'
        />

        <ErrorMessage
          error={props.submissionError}
          message='Error'
        />
      </Box>
  )
}`
    },
  },

  // Form Hook
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const formHookName = `use${pascalName}`

      return `${formHookName}/${formHookName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const formHookName = `use${pascalName}`
      const formHookNamePascal = helpers?.changeCase?.pascalCase(formHookName)

      return `import { useFormContext } from '@useweb/ui/Form'
      
import type { ${pascalName}Schema } from '../${pascalName}/${pascalName}.js'

export type ${formHookNamePascal}Props = any

export default function ${formHookName}() {
  const formContext = useFormContext<${pascalName}Schema>()

  return {
    formContext,
  }
}

export type ${formHookNamePascal}Return = ReturnType<
  typeof ${formHookName}
>
      `
    },
  },
  // Components
  {
    path: () => {
      return `components/readme.md`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)

      return `## ${pascalName} Components

      Add Custom Field Components, etc in this folder.
      `
    },
  },
  // useSubmitForm Hook
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const formHookName = `useSubmit${pascalName}`

      return `${formHookName}/${formHookName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const formHookName = `useSubmit${pascalName}`
      const formHookNamePascal = helpers?.changeCase?.pascalCase(formHookName)

      return `import useAsync  from '@useweb/use-async'

import type { ${pascalName}Schema } from '../${pascalName}/${pascalName}.js'
      
import logError from '@/src/lib/utils/loggers/logError/logError'

export type ${formHookNamePascal}Props = {
  onSuccess?: (props: { updates: Partial<any> }) => void
}

export default function ${formHookName}(props: ${formHookNamePascal}Props) {
  const submitForm = useAsync<${pascalName}Schema, any>({
    fn: async (p) => {
      // Add your form submission logic here
    },

    onError({ error, fnProps }) {
      logError({
        error,
        fnName: '${formHookName}',
        metadata: { fnProps },
      })
    },
  })

  return submitForm
}

export type ${formHookNamePascal}Return = ReturnType<typeof ${formHookName}>
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Basic Form Component',
  files,
}

export default template
