import React from 'react'
import type { SliceZoneProps } from '@prismicio/react'
import { SliceZone } from '@prismicio/react'

import { components } from '../../slices/index.js'

export type PrismicSlicesRendererProps = {
  slices: SliceZoneProps['slices']
}

export default function PrismicSlicesRenderer(props: PrismicSlicesRendererProps) {
  return <SliceZone slices={props.slices} components={components} />
}
