import assert from '@useweb/assert'

export type GenerateCsvFileProps = {
  fileName: string
  data: object[]
}

export default function generateCsvFile(props: GenerateCsvFileProps) {
  assert<GenerateCsvFileProps>({ props, requiredProps: ['fileName', 'data'] })

  const titleKeys: string[] = Object.keys(props.data[0])

  const refinedData: string[][] = []

  refinedData.push(titleKeys)

  props.data.forEach((item) => {
    refinedData.push(Object.values(item))
  })

  let csvContent = ''

  refinedData.forEach((row) => {
    csvContent += row.join(',') + '\n'
  })

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
  const objUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', objUrl)
  link.setAttribute('download', props.fileName + '.csv')
  link.click()
}

export type GenerateCsvFileReturn = ReturnType<typeof generateCsvFile>
