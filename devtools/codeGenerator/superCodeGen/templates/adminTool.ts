import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name }) => {
      return `${name}.tsx`
    },
    template: ({ helpers, name }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import React from 'react'
      import ActionBox from '@useweb/ui/ActionBox'
      import Button from '@useweb/ui/Button'
      import useAsync from '@useweb/use-async'
      import useSnackbar from '@useweb/ui/Snackbar'
      import ErrorMessage from '@useweb/ui/ErrorMessage'
      
      import adminApiClient from '../../../../../../../../firebaseFunctions/src/adminApi/adminApi.client.js'

      const ReactJsonView = React.lazy(() => import('react-json-view'))
 
      export default function ${namePascalCase}() {
        const snackbar = useSnackbar()
      
        const ${nameCamelCase} = useAsync<any, any>({
          fn: async () => {
            return await adminApiClient<any>({
              route: 'routes/${nameCamelCase}',
              payload: {},
            })
          },
          onResult() {
            snackbar.show({
              message: ${'`'}Success${'`'},
            })
          },
        })
      
        return (
          <ActionBox
            data-id='${namePascalCase}'
            headerProps={{
              title: '${namePascalCase}',
            }}
            ctas={
              <>
                <Button
                  name='Send'
                  loading={${nameCamelCase}.loading}
                  onClick={() => {
                    ${nameCamelCase}.exec()
                  }}
                  sx={{}}
                >
                  Send
                </Button>
              </>
            }
            sx={{}}
            childrenSx={{
              display: 'grid',
              gap: 2,
            }}
          >
          {${nameCamelCase}.result && (
            <ReactJsonView
              src={${nameCamelCase}.result}
              indentWidth={2}
              style={{
                fontSize: '12px',
              }}
              theme='monokai'
            />
          )}

            <ErrorMessage error={${nameCamelCase}.error} message={${nameCamelCase}.error} />
          </ActionBox>
        )
      }`
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Admin Other Tool',
  files,
}

export default template
