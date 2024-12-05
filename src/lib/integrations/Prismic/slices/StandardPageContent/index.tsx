import React from 'react'
import type { Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `StandardPage`.
 */
export type StandardPageProps = SliceComponentProps<Content.RootPageSlice>

/**
 * Component for "StandardPage" Slices.
 */
const StandardPage = ({ slice }: StandardPageProps) => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for standard_page (variation: {slice.variation}) Slices
    </section>
  )
}

export default StandardPage
