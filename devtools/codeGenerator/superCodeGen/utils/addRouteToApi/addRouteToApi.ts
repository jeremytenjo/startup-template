import fs from 'fs/promises'
import path from 'path'

import changeCase from 'change-case'

import findFileInFolder from '../../../../utils/node/findFileInFolder/findFileInFolder.js'
import getRelativeImportPath from '../../../../utils/node/getRelativeImportPath/getRelativeImportPath.js'

export type AddRouteToApiProps = {
  outputPath: string
  name: string
  workspacePath: string
  cloudFunctionName: string
}

async function findFile(filename: string, dir: string): Promise<string | null> {
  // Skip system directories, node_modules, and hidden directories
  const skipDirs = ['node_modules']

  if (
    skipDirs.some((skipDir) => {
      return dir.includes(skipDir)
    }) ||
    path.basename(dir).startsWith('.')
  ) {
    return null
  }

  try {
    const files = await fs.readdir(dir, { withFileTypes: true })

    for (const file of files) {
      const filePath = path.join(dir, file.name)

      // Skip hidden files and directories
      if (file.name.startsWith('.')) continue

      if (file.isDirectory()) {
        const result = await findFile(filename, filePath)
        if (result) return result
      } else if (file.name === filename) {
        return filePath
      }
    }
  } catch (error: any) {
    // Skip any directories we can't access
    if (error.code === 'EACCES' || error.code === 'EPERM') {
      return null
    }
    throw error
  }

  return null
}

export default async function addRouteToApi(props: AddRouteToApiProps) {
  // Start search from a more specific location
  const firebaseFunctionsDir = path.join(props.workspacePath, 'firebaseFunctions')
  const apiRoutesPath = await findFile(
    `${props.cloudFunctionName}.routes.ts`,
    firebaseFunctionsDir,
  )
  if (!apiRoutesPath) {
    throw new Error(`Could not find ${props.cloudFunctionName}.routes.ts`, {
      cause: {
        searchPath: process.cwd(),
      },
    })
  }

  const nameCamelCase = changeCase.camelCase(props.name)

  // Calculate relative path from routes file to the new route
  const firebaseFunctionFilePath = await findFileInFolder({
    folderPath: props.workspacePath || '',
    fileName: `${nameCamelCase}.firebase.ts`,
  })
  const firebaseFunctionImportPath = getRelativeImportPath({
    fromPath: apiRoutesPath || '',
    toPath: firebaseFunctionFilePath.filePath,
  })
  const routePath = firebaseFunctionImportPath.importPath

  // Read the current file content
  const fileContent = await fs.readFile(apiRoutesPath, 'utf-8')

  // Create import statement
  const importStatement = `\nimport * as ${nameCamelCase} from '${routePath}'`

  // Create route handler
  const routeHandler = `
  if (props.context.route === ${nameCamelCase}.routeId) {
    try {
      return await ${nameCamelCase}.default({
        authUser: props.authUser,
        payload: props.context.payload,
      })
    } catch (error: any) {
      throw new Error(\`${nameCamelCase} - \${error}\`, {
        cause: error?.cause,
      })
    }
  }
`

  // Add import at the top of the file (after existing imports)
  const updatedContent = fileContent.replace(/(import.*\n)*/, (imports) => {
    return `${imports}${importStatement}`
  })

  // Add route handler before the last error throw
  const finalContent = updatedContent.replace(
    /throw new Error\(`Route doesn't exist/,
    `${routeHandler}\n  throw new Error(\`Route doesn't exist`,
  )

  // Write the updated content back to the file
  await fs.writeFile(apiRoutesPath, finalContent, 'utf-8')

  return {
    success: true,
    addedImport: importStatement,
    addedRoute: routeHandler,
    apiRoutesPath,
    routePath,
  }
}

export type AddRouteToApiReturn = ReturnType<typeof addRouteToApi>
