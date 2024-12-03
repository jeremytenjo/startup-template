import path from 'path'

import glob from '../../../../../../../../../devtools/utils/node/glob.js'

export type DatabaseFunctionSchema = {
  name: string
  fn: string
}

export default async function getDatabaseFunctions() {
  const functions: DatabaseFunctionSchema[] = []
  const pattern = path.join(process.cwd(), 'src', '**', '*.databaseFunction.ts')
  const functionsData = await glob({
    pattern,
  })

  await Promise.all(
    functionsData.map(async (functionPath) => {
      const functionData = await import(functionPath)

      functions.push({ ...functionData })
    }),
  )

  return { functions }
}

export type GetDatabaseFunctionsReturn = ReturnType<typeof getDatabaseFunctions>
