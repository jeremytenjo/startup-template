import { siteInfo } from '../../siteInfo.js'

export default function isProductionSite() {
  if (typeof window === 'undefined') return false

  const domainWithoutWWW = siteInfo.domain.replace('www.', '')

  const isProdWebsite =
    window.location.href.includes(siteInfo.domain) ||
    window.location.href.includes(domainWithoutWWW)

  return isProdWebsite
}
