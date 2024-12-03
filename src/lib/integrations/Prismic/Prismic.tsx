import React from 'react'
import { PrismicPreview } from '@prismicio/next'

import prismicConfig from './prismic.config.js'
import PrismicProvider from './utils/PrismicProvider/PrismicProvider.js'

type PrismicProps = {
  children: any
  disablePreview?: boolean
}

export default function Prismic(props: PrismicProps) {
  return prismicConfig.accessToken ? (
    <>
      <PrismicPreview repositoryName={prismicConfig.repositoryName} />
      <PrismicProvider
        repositoryName={prismicConfig.repositoryName}
        disablePreview={props.disablePreview}
      >
        {props.children}
      </PrismicProvider>
    </>
  ) : (
    props.children
  )
}
