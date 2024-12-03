import appConfig from './app.config.js'

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: appConfig.siteInfo.domain,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }],
  },
}
