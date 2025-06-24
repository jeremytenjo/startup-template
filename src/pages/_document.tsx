import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import setMuiDocumentData from '../../theme/UiTheme/utils/setMuiDocumentData.js'

type DocumentProps = {
  emotionStyleTags: any
}

export default class MyDocument extends Document<DocumentProps> {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='icon' href='/images/logo/logo.svg' />
          <link
            rel='apple-touch-icon'
            href='/images/logo/assets/apple/apple-touch-icon.png'
          />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => setMuiDocumentData(ctx, Document)
