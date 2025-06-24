import fs from 'fs/promises'
import path from 'path'

import assert from '@useweb/assert'

import findFileInFolder from '../../../../utils/node/findFileInFolder/findFileInFolder.js'
import getRelativeImportPath from '../../../../utils/node/getRelativeImportPath/getRelativeImportPath.js'

export type AddFunctionToFirebaseFunctionsFileProps = {
  workspacePath: string
  functionName: string
  fileName: string
  exportFuncionExpression: string
}

export default async function addFunctionToFirebaseFunctionsFile(
  props: AddFunctionToFirebaseFunctionsFileProps,
) {
  assert<AddFunctionToFirebaseFunctionsFileProps>({
    props,
    requiredProps: ['workspacePath', 'functionName'],
  })

  const firebaseFunctionsPath = path.join(
    props.workspacePath,
    'firebaseFunctions/src/firebaseFunctions.ts',
  )

  const fileContent = await fs.readFile(firebaseFunctionsPath, 'utf-8')

  const firebaseFunctionFilePath = await findFileInFolder({
    folderPath: props.workspacePath || '',
    fileName: props.fileName,
  })
  const firebaseFunctionImportPath = getRelativeImportPath({
    fromPath: firebaseFunctionsPath || '',
    toPath: firebaseFunctionFilePath.filePath,
  })

  const importStatement = `\nimport ${props.functionName} from '${firebaseFunctionImportPath.importPath}'`

  // Add import at the top of the file (after existing imports)
  const contentWithImport = fileContent.replace(
    /(\/\/ https:\/\/firebase\.google\.com\/docs\/functions\/get-started)/,
    `${importStatement}\n\n$1`,
  )

  // Add route handler before the last error throw
  const finalContent = `${contentWithImport}
  
  ${props.exportFuncionExpression}
  `

  // Write the updated content back to the file
  await fs.writeFile(firebaseFunctionsPath, finalContent, 'utf-8')

  return { finalContent }
}

export type AddFunctionToFirebaseFunctionsFileReturn = ReturnType<
  typeof addFunctionToFirebaseFunctionsFile
>
