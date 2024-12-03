import React from 'react'
import Head from 'next/head'

export type GoogleAdsHeadScriptProps = { clientCaPub: string | undefined }

export default function GoogleAdsHeadScript(props: GoogleAdsHeadScriptProps) {
  return (
    <>
      <Head>
        <meta name='google-adsense-account' content={`ca-pub-${props.clientCaPub}`} />
      </Head>
    </>
  )
}
