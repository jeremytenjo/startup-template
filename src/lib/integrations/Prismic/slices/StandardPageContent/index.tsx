import React from 'react'
import type { Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `RootPage`.
 */
export type RootPageProps = SliceComponentProps<Content.RootPageSlice>

/**
 * Component for "RootPage" Slices.
 */
const RootPage = ({ slice }: RootPageProps) => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for standard_page (variation: {slice.variation}) Slices
    </section>
  )
}

export default RootPage
