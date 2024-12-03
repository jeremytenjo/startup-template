import prettier from 'prettier'

export type PrettifyFileProps = { prettierConfig?: any; content: string }

export default async function prettifyFile({
  prettierConfig = {},
  content = '',
}: PrettifyFileProps) {
  try {
    const prettifiedContent = await prettier.format(content, {
      ...prettierConfig,
      parser: 'babel',
    })
    return prettifiedContent
  } catch (error: any) {
    return content
  }
}
