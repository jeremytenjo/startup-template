import type {
  SuperCodeGeneratorFilesSchema,
  SuperCodeGeneratorTemplateSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const UpperName = `${helpers?.changeCase?.pascalCase(name)}`
      const propsName = `${namePascalCase}Props`
      return `import React, { useState, createContext, useContext } from 'react'

      type ${propsName} = {
        name?: boolean | null
      }
      
      export const ${UpperName}Context = createContext<${propsName}>\({})
      
      export const ${UpperName}Provider = ({children }) => {
        const [name] = useState(null)
      
        return (
          <${UpperName}Context.Provider
            value={{
              name,
            }}
          >
            {children}
          </${UpperName}Context.Provider>
        )
      }
      
      const ${name} = () => useContext(${UpperName}Context)
      
      export default ${name}
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'React Context',
  files,
}

export default template
