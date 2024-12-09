import { useMemo } from 'react'

import type { GetPrefixProps } from '../stripe.utils.config.js'
import { getRefreshUrl, getReturnUrl } from '../stripe.utils.config.js'

export default function useStripeUtilsConfig() {
  const data = useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        refreshUrl: '',
        returnUrl: '',
      }
    }

    const prefixProps: GetPrefixProps = {
      origin: window?.location?.origin || '',
      pathname: window?.location?.pathname || '',
    }

    const refreshUrl = getRefreshUrl(prefixProps)
    const returnUrl = getReturnUrl(prefixProps)

    return {
      refreshUrl,
      returnUrl,
    }
  }, [])

  return data
}

export type UseStripeUtilsConfigReturn = ReturnType<typeof useStripeUtilsConfig>
