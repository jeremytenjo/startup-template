import React, { useState, useRef, useEffect, Fragment, useMemo } from 'react'
import Script from 'next/script'
import withRetry from 'fetch-retry'
import Box from '@mui/material/Box'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import loadScript from '../../../../utils/scripts/loadScript/loadScript.js'

const TIKTOK_OEMBED_BASE_URL = `https://www.tiktok.com/oembed`

const invalidErrorMessage =
  'Invalid URL. Example https://www.tiktok.com/@roblox/video/videoid'

export type TikTokEmbedProps = {
  url: string
  errorFallback: any
  fallback?: any
}

export default function TikTokEmbed({
  url,
  fallback,
  errorFallback = '',
}: TikTokEmbedProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(undefined)
  const [scriptSrc, setScriptSrc] = useState<string | undefined>(undefined)
  const [html, setHTML] = useState<string | undefined>(undefined)

  const ref = useRef(null)

  /**
   * Trigger loaded state when the iframe has loaded
   */
  useEffect(() => {
    /**
     * MutationObserver:
     * https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
     */
    if (!('MutationObserver' in window)) return setLoaded(true)

    /**
     * TODO: Check bugs for MutationObserver
     * https://caniuse.com/#feat=mutationobserver
     */
    const elem = ref.current

    const observer = new MutationObserver((mutationList) => {
      // Get the iframe from the mutation that has added it
      const iframeAdded = mutationList.reduce<Node | undefined>((acc, curr) => {
        const iframe = Array.from(curr.addedNodes).find(
          (node) => node.nodeName === 'IFRAME',
        )
        if (iframe) {
          acc = iframe
        }
        return acc
      }, undefined)

      if (iframeAdded) {
        iframeAdded.addEventListener('load', () => setLoaded(true))
      }
    })

    if (elem) {
      observer.observe(elem, {
        childList: true,
        attributes: true,
        subtree: true,
      })
    }
    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    loadScript({
      id: 'tiktokt-embed',
      url: 'https://www.tiktok.com/embed.js',
      reload: true,
    })
  })

  useEffect(() => {
    const fetchRetry = withRetry(window.fetch)
    fetchRetry(`${TIKTOK_OEMBED_BASE_URL}?url=${url}`, {
      retries: 3,
      retryDelay: (attempt) => 2 ** attempt * 1000,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.status_msg) throw new Error(res.status_msg)

        if (!res || !res.html) throw new Error("API response doesn't look right")

        const htmlString = res.html

        const tempElement = document.createElement('div')

        tempElement.innerHTML = htmlString

        const scriptTag = tempElement.getElementsByTagName('script')[0]

        setScriptSrc(scriptTag && scriptTag.src)
        setHTML(htmlString.substr(0, htmlString.indexOf('<script')))
      })
      .catch((err) => setError(err))
  }, [url])

  const validUrl = useMemo(() => {
    const { isValid } = validateTiktokUrl({
      url,
    })

    return {
      isValid,
    }
  }, [url])

  if (!validUrl.isValid) {
    return <ErrorMessage error={invalidErrorMessage} message={invalidErrorMessage} />
  }

  if (error) {
    return errorFallback
  }

  const loading = !!!loaded

  return (
    <Fragment>
      <Script src={scriptSrc} id='tiktok-script' async />

      {loading && fallback && <Box>{fallback}</Box>}

      <Box
        data-id='TikTokEmbed'
        ref={ref}
        dangerouslySetInnerHTML={{ __html: html || '' }}
        sx={{
          display: loaded && html ? 'block' : 'none',
          borderRadius: '4px',
          m: 0,
          p: 0,
          '& blockquote': {
            m: '0',
            width: 'fit-content',
            height: 'fit-content',
            minWidth: 'auto !important',
          },
        }}
      />
    </Fragment>
  )
}

export function validateTiktokUrl({ url }: { url: string }) {
  const regex = /^https?:\/\/(www\.)?tiktok\.com\/.+$/

  const isValid = regex.test(url)

  return { isValid, invalidErrorMessage }
}
