import type { MetadataRoute } from 'next'

import { siteInfo } from '../data/_siteInfo/siteInfo.js'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: `${siteInfo.domain}/sitemap.xml`,
  }
}
