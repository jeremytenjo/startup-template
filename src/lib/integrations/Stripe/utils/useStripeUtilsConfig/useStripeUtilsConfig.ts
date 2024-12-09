import { useMemo } from 'react'
import { GetPrefixProps, getRefreshUrl, getReturnUrl } from '../stripe.utils.config'

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
