import path from 'path'

export type GetRelativeImportPathProps = {
  fromPath: string
  toPath: string
}

export default function getRelativeImportPath(props: GetRelativeImportPathProps) {
  const fromDir = path.dirname(props.fromPath)
  const toDir = path.dirname(props.toPath)
  const fileName = path.basename(props.toPath)
  const importPath = path.relative(fromDir, toDir)

  const importPathWithFileName = path.join(importPath, fileName)
  const normalizedPath = importPathWithFileName.replace(/\\/g, '/')
  const pathWithJsExtension = normalizedPath.endsWith('.ts')
    ? normalizedPath.replace('.ts', '.js')
    : normalizedPath

  const finalPath = pathWithJsExtension.startsWith('.')
    ? pathWithJsExtension
    : `./${pathWithJsExtension}`

  return { importPath: finalPath }
}

export type GetRelativeImportPathReturn = ReturnType<typeof getRelativeImportPath>
