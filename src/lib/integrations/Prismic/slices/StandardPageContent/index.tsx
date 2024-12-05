import React from 'react'
import type { Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'
import Box from '@useweb/ui/Box'

import RichText from '../../ui/RichText/RichText.js'

/**
 * Props for `StandardPage`.
 */
export type StandardPageProps = SliceComponentProps<Content.RootPageSlice>

/**
 * Component for "StandardPage" Slices.
 */
const StandardPage = ({ slice }: StandardPageProps) => {
  return (
    <Box
      component={'section'}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <RichText field={slice.primary.body} />
    </Box>
  )
}

export default StandardPage
