import type { MetadataRoute } from 'next'

import { siteInfo } from '../data/_siteInfo/siteInfo.js'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteInfo.domain}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ]
}
