import fs from 'fs/promises'
import path from 'path'

import changeCase from 'change-case'

import getRelativeImportPath from '../../../../utils/node/getRelativeImportPath/getRelativeImportPath.js'

export type AddTemplateToSchemaProps = {
  templatePath: string
  workspacePath: string
  name: string
}

export default async function addTemplateToSchema(props: AddTemplateToSchemaProps) {
  const schemaPath = path.join(
    props.workspacePath,
    'devtools/codeGenerator/superCodeGen/superCodeGen.schema.ts',
  )

  const nameCamelCase = changeCase.camelCase(props.name)

  // Calculate relative path from schema to the new template
  const templateImportPath = getRelativeImportPath({
    fromPath: schemaPath,
    toPath: props.templatePath,
  })

  // Read the current file content
  const fileContent = await fs.readFile(schemaPath, 'utf-8')

  // Create import statement
  const importStatement = `import ${nameCamelCase} from '${templateImportPath.importPath}/${props.name}.js'`

  // Add import at the top of the file (after existing imports)
  const contentWithImport = fileContent.replace(
    /(import type { SuperCodeGeneratorConfigSchema } from '@jeremytenjo\/super-code-generator'.*?\n)/,
    (match) => {
      return `${match}\n${importStatement}`
    },
  )

  // Add the template to the templates array
  const updatedContent = contentWithImport.replace(
    /const superCodeGeneratorConfig: SuperCodeGeneratorConfigSchema<.*> = \[([\s\S]*?)\]/,
    (match, content) => {
      return `const superCodeGeneratorConfig: SuperCodeGeneratorConfigSchema<any, any> = [${content}  ${nameCamelCase},\n]`
    },
  )

  // Write the updated content back to the file
  await fs.writeFile(schemaPath, updatedContent, 'utf-8')

  return {
    success: true,
    addedImport: importStatement,
    schemaPath,
    templatePath: props.templatePath,
  }
}

export type AddTemplateToSchemaReturn = ReturnType<typeof addTemplateToSchema>
