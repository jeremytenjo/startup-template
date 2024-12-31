import React from 'react'
import Head from 'next/head'

import appConfig from '../../../../../app.config.js'

export type DefaultHeadTagsProps = {
  title?: string | undefined
  description?: string | undefined
}

export default function DefaultHeadTags(props: DefaultHeadTagsProps) {
  return (
    <Head>
      <title>{props.title || appConfig.siteInfo.name}</title>
      <meta
        name='description'
        content={props.description || appConfig.siteInfo.description}
      />
      <meta property='og:url' content={appConfig.siteInfo.domain} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={appConfig.siteInfo.name} />
      <meta property='og:description' content={appConfig.siteInfo.description} />
      <meta
        property='og:image'
        content={`${appConfig.siteInfo.domain}/images/og/main.png`}
      />
      <meta name='twitter:card' content='summary_large_image' />
      <meta property='twitter:domain' content={appConfig.siteInfo.domain} />
      <meta property='twitter:url' content={appConfig.siteInfo.domain} />
      <meta name='twitter:title' content={`${appConfig.siteInfo.name}`} />
      <meta name='twitter:description' content={appConfig.siteInfo.description} />
      <meta
        name='twitter:image'
        content={`${appConfig.siteInfo.domain}/images/og/main.png`}
      />
      <meta property='og:image:alt' content={`${appConfig.siteInfo.name} logo`} />
    </Head>
  )
}
