import fs from 'fs/promises'
import path from 'path'

export type UpdateSupabaseConfigProps = {
  componentName: string
  outputPath: string
  workspacePath: string
}

export default async function updateSupabaseConfig(props: UpdateSupabaseConfigProps) {
  const { componentName, workspacePath } = props

  if (!workspacePath) {
    throw new Error('workspacePath is required')
  }

  const configFilePath = path.resolve(
    workspacePath,
    'src/lib/integrations/Supabase/database/supabase.database.config.ts',
  )

  // Verify the file exists
  try {
    await fs.access(configFilePath)
  } catch (error) {
    throw new Error(`Config file not found at: ${configFilePath}`, { cause: error })
  }

  // Read the current file content
  const fileContent = await fs.readFile(configFilePath, 'utf-8')

  // Create import statement
  const importStatement = `import { ${componentName}CollectionName } from '../../../../data/${componentName}/${componentName}.config.js';`

  // Create table entry
  const tableEntry = `    {
      name: ${componentName}CollectionName,
    },`

  // Add import at the top of the file (after existing imports)
  const updatedContent = fileContent.replace(/(import.*\n)*/, (imports) => {
    return `${imports}${importStatement}\n`
  })

  // Add table entry before the closing bracket of the tables array
  const finalContent = updatedContent.replace(
    /(tables: \[\n)([\s\S]*?)(\n\s*\])/,
    `$1$2${tableEntry}\n$3`,
  )

  // Write the updated content back to the file
  await fs.writeFile(configFilePath, finalContent, 'utf-8')

  return {
    success: true,
    addedImport: importStatement,
    addedTableEntry: tableEntry,
    configFilePath,
  }
}
