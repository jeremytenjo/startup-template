import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'
import pluralize from 'pluralize'

const files: SuperCodeGeneratorFilesSchema = [
  // Form Fields
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const fieldsComponentName = `${pascalName}FormFields`

      return `${fieldsComponentName}/${fieldsComponentName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const fieldsComponentName = `${pascalName}FormFields`

      return `import React from 'react'
import Box from '@useweb/ui/Box'
import TextField from '@useweb/ui/TextField'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import Skeleton from '@useweb/ui/Skeleton'
export type ${fieldsComponentName}Props = {
  validationErrorMessage: string | undefined
  loading?: boolean
}

export type ${fieldsComponentName}Schema = ${pascalName}Schema

export default function ${fieldsComponentName}(props: ${fieldsComponentName}Props) {
  return (
    <Box
      data-id='${fieldsComponentName}'
      sx={{
        display: 'grid',
        gap: 2,
      }}
    >
      <Skeleton loading={props.loading}>
        <TextField<${fieldsComponentName}Schema> name='name' label='Name' isRequired />
      </Skeleton>
      <ErrorMessage
        error={props.validationErrorMessage}
        message={props.validationErrorMessage || ''}
      />
    </Box>
  )
}
      `
    },
  },
  // Form - Create
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const createFormComponentName = `${pascalName}CreateForm`

      return `${createFormComponentName}/${createFormComponentName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const createFormComponentName = `${pascalName}CreateForm`
      const hookName = `use${pascalName}Form`
      const fieldsComponentName = `${pascalName}FormFields`

      return `import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Form from '@useweb/ui/Form'
import ActionBox from '@useweb/ui/ActionBox'
import Button from '@useweb/ui/Button'
import { useRouter } from 'next/compat/router'
import useSnackbar from '@useweb/ui/Snackbar'

import ${fieldsComponentName}, { type ${fieldsComponentName}Schema } from '../${fieldsComponentName}/${fieldsComponentName}.js'
import ${hookName} from '../${hookName}/${hookName}.js'

export type ${createFormComponentName}Props = {
  sx?: BoxProps['sx']
}

export default function ${createFormComponentName}(props: ${createFormComponentName}Props) {
  const router = useRouter()
  const snackbar = useSnackbar()
  const { submit } = ${hookName}({
    onSubmit: (p) => {
      snackbar.show({
        message: '${pascalName} added',
        severity: 'success',
      })
    },
  })

  return (
    <Form<${fieldsComponentName}Schema>
      data-id='${createFormComponentName}'
      sx={props.sx}
      onSubmit={({ formValues }) => {
        submit.exec({...formValues})
      }}
    >
      <ActionBox
        headerProps={{
          title: '${createFormComponentName}',
        }}
        singleCTA
        ctas={
          <>
            <Button
              name='Save'
              type='submit'
              sx={{}}
              loading={submit.loading}
            >
              Save
            </Button>
          </>
        }
        sx={{}}
      >
        <${fieldsComponentName}
          validationErrorMessage={
            submit.publicErrorMessage || (submit.error ? String(submit.error) : undefined)
          }
        />
      </ActionBox>
    </Form>
  )
}
      `
    },
  },
  // Form - Update
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const updateFormComponentName = `${pascalName}UpdateForm`

      return `${updateFormComponentName}/${updateFormComponentName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const updateFormComponentName = `${pascalName}UpdateForm`
      const camelCase = helpers?.changeCase?.camelCase(name)
      const nameSingluar = pluralize.singular(camelCase)
      const fieldsComponentName = `${pascalName}FormFields`

      return `import React from 'react'
import Button from '@useweb/ui/Button'
import ActionBox from '@useweb/ui/ActionBox'
import Form, { ResetForm } from '@useweb/ui/Form'
import useSnackbar from '@useweb/ui/Snackbar'

import type { ${fieldsComponentName}Schema } from '../${fieldsComponentName}/${fieldsComponentName}.js'
import ${fieldsComponentName} from '../${fieldsComponentName}/${fieldsComponentName}.js'
import use${pascalName}Form from '../use${pascalName}Form/use${pascalName}Form.js'

export type ${updateFormComponentName}Props = { ${nameSingluar}: ${pascalName}Schema | undefined }

export default function ${updateFormComponentName}(props: ${updateFormComponentName}Props) {
  const snackbar = useSnackbar()
  const { submit } = use${pascalName}Form({
    onSubmit: () => {
      snackbar.show({
        message: '${pascalName} Updated',
        severity: 'success',
      })
    },
  })

  return (
    <Form<${fieldsComponentName}Schema>
      data-id='${updateFormComponentName}'
      onSubmit={({ formValues }) => {
        submit.exec({...formValues})
      }}
    >
      <ResetForm<${fieldsComponentName}Schema>
        formValues={
          props.${nameSingluar}?.id
            ? {
               ...props.${nameSingluar},      
               // Add children properties and files here to know if they were changed when submitting             
              }
            : undefined
        }
        resetIfTrue={props.${nameSingluar}?.id}
      />
      <ActionBox
        ctas={
          <>
            <Button
              name='Save'
              type='submit'
              loading={submit.loading}
              sx={{}}
            >
              Save
            </Button>
          </>
        }
        sx={{}}
      >
        <${fieldsComponentName}
          validationErrorMessage={
            submit.publicErrorMessage || (submit.error ? String(submit.error) : undefined)
          }
          loading={false}
        />
      </ActionBox>
    </Form>
  )
}
      `
    },
  },
  // useDataForm hook
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const hookName = `use${pascalName}Form`

      return `${hookName}/${hookName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers?.changeCase?.pascalCase(name)
      const hookName = `use${pascalName}Form`
      const camelCase = helpers?.changeCase?.camelCase(name)
      const fieldsComponentName = `${pascalName}FormFields`

      return `import useAsync from '@useweb/use-async'
import logError from '@/src/lib/utils/loggers/logError/logError'
import type { ${fieldsComponentName}Schema } from '../${fieldsComponentName}/${fieldsComponentName}.js'

export type Use${pascalName}FormProps = {
  onSubmit?: (props: { latest${pascalName}: ${pascalName}Schema }) => void
}

export default function ${hookName}(props: Use${pascalName}FormProps) {
  const ${camelCase} = use${pascalName}({
    uid: props.uid,
  })

  const submit = useAsync<
    ${fieldsComponentName}Schema,
    {
      latest${pascalName}: ${pascalName}Schema
    }
  >({
    fn: async (p) => {
      const new${pascalName}: ${pascalName}Schema = {
        id: p.id || Math.random().toString(36).substring(7),
        // add data
      }

      let latest${pascalName}: ${pascalName}Schema = {} as any

      if (p.id) {
        // Update ${pascalName}
        const res = await ${camelCase}.update.exec({
          value: new${pascalName},
        })

        if (res?.error || !res?.result?.updatedItem) {
          throw new Error(String(res?.error || 'res?.result?.updatedItem is undefined'), {
            cause: res?.error?.cause
          })
        }

        latest${pascalName} = res?.result?.updatedItem
      } else {
        // Create ${pascalName}
        const res = await ${camelCase}.create.exec({
          newItem: new${pascalName},
        })

        if (res?.error || !res?.result?.createdItem) {
          throw new Error(String(res?.error || 'res?.result?.createdItem'), {
            cause: res?.error?.cause
          })
        }

        latest${pascalName} = res?.result?.createdItem
      }

      return { latest${pascalName} }
    },

    onResult({ result }) {
      props.onSubmit && props.onSubmit(result)
    },

    onError({ error, fnProps }) {
      logError({
        error,
        fnName: '${hookName} - submit',
        metadata: { fnProps },
      })
    },
  })

  return { submit }
}

export type Use${pascalName}FormReturn = ReturnType<typeof ${hookName}>
`
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Data Form Component',
  files,
  usageInstructions: 'Use when you need a form that creates and updates data.',
}

export default template
