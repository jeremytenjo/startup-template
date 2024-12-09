import { useMemo } from 'react'
import { GetPrefixProps, getRefreshUrl, getReturnUrl } from '../stripe.utils.config'

export default function useStripeUtilsConfig() {
  const data = useMemo(() => {
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
  }, [window?.location?.pathname])

  return data
}

export type UseStripeUtilsConfigReturn = ReturnType<typeof useStripeUtilsConfig>
