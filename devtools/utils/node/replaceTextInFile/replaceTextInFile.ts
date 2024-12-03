import fs from 'fs'

interface ReplaceTextInFileArgs {
  filePath: string
  changes: {
    searchValue: string | RegExp
    replaceValue: string
  }[]
}

/**
 * Asynchronously replaces text in a file using the provided arguments object.
 */
export default async function replaceTextInFile(
  props: ReplaceTextInFileArgs,
): Promise<void> {
  try {
    // Read the file
    const fileContent = await fs.promises.readFile(props.filePath, 'utf8')

    // Replace the text
    let updatedContent = fileContent

    props.changes.forEach((change) => {
      updatedContent = updatedContent.replace(change.searchValue, change.replaceValue)
    })

    // Write the updated content back to the file
    await fs.promises.writeFile(props.filePath, updatedContent)
  } catch (err) {
    console.error(`Error updating file ${props.filePath}:`, err)
    throw err // Rethrow the error for further handling if necessary
  }
}
