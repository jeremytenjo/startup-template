import createFile from '../../../../utils/node/createFile.js'
import convertSVGToReactSVG from '../../../../utils/svg/convertSVGToReactSVG.js'

type Props = {
  name: string
  svgString: string
  outputPath: string
}

// keep import { createSvgIcon } from '@mui/material' to avoid big build
export default async function create({ name, svgString, outputPath }: Props) {
  const svgStringWithoutWidthHeight = await convertSVGToReactSVG({
    svgString,
  })

  const renderString = svgStringWithoutWidthHeight
    .replace(
      '<svg',
      `<SvgIcon 
        {...(props || {})} sx={{
          width: '15px',
          height: 'auto',
          ...(props?.sx || {}),
    }} data-id="${name}"`,
    )
    .replace('</svg>', '</SvgIcon>')

  const svg = `import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function ${name}(props: SvgIconProps) {
  return (
    ${renderString}
  )
}

`

  await createFile({
    filePath: outputPath,
    fileContent: svg,
    noTimestamp: true,
    overwrite: true,
  })
}
