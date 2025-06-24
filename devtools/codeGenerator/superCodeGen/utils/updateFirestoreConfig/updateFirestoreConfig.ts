import path from 'path'
import fs from 'fs/promises'

export type UpdateFirestoreConfigProps = {
  componentName: string
  outputPath: string
  workspacePath: string
}

export default async function updateFirestoreConfig(props: UpdateFirestoreConfigProps) {
  const configFilePath = path.resolve(
    props.workspacePath,
    'src/lib/integrations/Google/Firebase/firestore/firestore.config.ts',
  )

  // Verify the file exists
  try {
    await fs.access(configFilePath)
  } catch (error) {
    throw new Error(`Config file not found at: ${configFilePath}`, { cause: error })
  }

  // Read the current file content
  const fileContent = await fs.readFile(configFilePath, 'utf-8')

  // Create import statements following the existing pattern
  const collectionImport = `import { ${props.componentName}CollectionName } from '../../../../../data/${props.componentName}/${props.componentName}.config.js'`
  const stubsImport = `import ${props.componentName}Stubs from '../../../../../data/${props.componentName}/${props.componentName}.stubs.js'`

  // Create collection entry
  const collectionEntry = `    {
      name: ${props.componentName}CollectionName,
      data: ${props.componentName}Stubs,
    },`

  // Add imports at the top of the file (after existing imports)
  const updatedContent = fileContent.replace(/(import.*\n)*/, (imports) => {
    return `${imports}${collectionImport}\n${stubsImport}\n`
  })

  // Add collection entry before the closing bracket of the collections array
  const finalContent = updatedContent.replace(
    /(collections: \[\n)([\s\S]*?)(\n\s*\])/,
    `$1$2${collectionEntry}\n$3`,
  )

  // Write the updated content back to the file
  await fs.writeFile(configFilePath, finalContent, 'utf-8')

  return {
    success: true,
    addedImports: [collectionImport, stubsImport],
    addedCollectionEntry: collectionEntry,
    configFilePath,
  }
}

export type UpdateFirestoreConfigReturn = ReturnType<typeof updateFirestoreConfig>
