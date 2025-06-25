import { siteInfo } from './data/_siteInfo/siteInfo.js'

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: siteInfo.domain,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }],
  },
}
