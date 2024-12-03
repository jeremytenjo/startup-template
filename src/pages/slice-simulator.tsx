import React from 'react'
import { SliceSimulator } from '@slicemachine/adapter-next/simulator'
import { SliceZone } from '@prismicio/react'

import { components } from '../lib/integrations/Prismic/slices/index.js'

export default function SliceSimulatorPage() {
  return (
    <SliceSimulator
      sliceZone={(props) => <SliceZone {...props} components={components} />}
    />
  )
}
