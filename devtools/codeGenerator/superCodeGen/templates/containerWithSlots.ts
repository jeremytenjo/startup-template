import type {
  SuperCodeGeneratorFilesSchema,
  SuperCodeGeneratorTemplateSchema,
} from '@jeremytenjo/super-code-generator'

type CustomProps = {
  slots?: {
    childContainers?: {
      importStatements?: string
      importedComponents?: string
    }
    localComponents?: {
      localComponents: string
      localComponentsDeclarations: string
    }
  }
}

const files: SuperCodeGeneratorFilesSchema<CustomProps> = [
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name, customProps }) => {
      const noChildContainers = !customProps?.slots?.childContainers

      return `import React from 'react'
    
    import ${name}Ui${renderIfTrue(
      noChildContainers,
      `, { type ${name}UiProps }`,
    )} from './${name}Ui/${name}.ui'
    
    export default function ${name}() {
      ${renderIfTrue(
        noChildContainers,
        `const uiProps: ${name}UiProps = {
          title: '${name}'
         }`,
      )}



      ${noChildContainers ? `return <${name}Ui {...uiProps} />` : `return <${name}Ui />`}

    }`
    },
  },
  {
    path: ({ name }) => `${name}Ui/${name}.ui.tsx`,
    template: ({ name, helpers, customProps }) => {
      const noChildContainers = !customProps?.slots?.childContainers
      const propsName = `${helpers?.changeCase
        .capitalCase(name)
        .split(' ')
        .join('')}UiProps`

      return `import React from 'react'
    import Box from '@useweb/ui/Box'

    ${customProps?.slots?.childContainers?.importStatements || ''}

    ${renderIfTrue(
      noChildContainers,
      `export type ${propsName} = {
      title: string
    }`,
    )}


    export default function ${name}Ui(${renderIfTrue(
      noChildContainers,
      `props: ${propsName}`,
    )}) {        
      return (
        <Box data-id='${name}' sx={{}}>
          ${renderIfTrue(noChildContainers, `<Title {...props} />`)}
          ${customProps?.slots?.localComponents?.localComponentsDeclarations || ''}
          ${customProps?.slots?.childContainers?.importedComponents || ''}
        </Box>
      )
    }
    
    ${renderIfTrue(
      noChildContainers,
      `const Title = (props: ${propsName}) => {
      return (
        <Box data-id='Title' sx={{}}>
          {props.title}
        </Box>
      )
    }`,
    )}

    ${customProps?.slots?.localComponents?.localComponents || ''}

    `
    },
  },
]

const renderIfTrue = (condition, string) => {
  return condition ? string : ``
}

const template: SuperCodeGeneratorTemplateSchema<CustomProps> = {
  type: 'Container',
  files,
}

export default template
