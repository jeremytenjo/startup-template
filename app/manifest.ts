import type { MetadataRoute } from 'next'

import { siteInfo } from '../data/_siteInfo/siteInfo.js'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteInfo.name,
    short_name: siteInfo.name,
    description: siteInfo.description,
    start_url: '/',
    display: 'standalone',
    theme_color: '#15202B',
    background_color: '#15202B',
    icons: [
      {
        src: '/images/logo/assets/sizes/192x192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: '/images/logo/assets/sizes/512x512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
  }
}
