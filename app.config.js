export const getIsProductionEnv = () => {
  return process.env.NODE_ENV === 'production'
}

const appConfig = {
  siteInfo: {
    name: 'Startup Template',
    title: 'title',
    description: 'description',
    domain: 'https://www.domain.com',
    previewDomain: 'https://www.previewDomain.com',
  },
  socialLinks: {
    discord: {
      link: 'https://discord.gg/startup',
    },
    twitter: {
      link: 'https://twitter.com/SocialSeedHQ',
    },
    mailto: {
      link: 'mailto:info@socialseed.com',
    },
  },
  nextjs: {
    port: 3001,
  },
  firebase: {
    enabled: true,
  },
  devtools: {
    storybook: {
      port: 6006,
    },
    playwright: {
      testIdAttribute: 'data-id',
    },
  },
  featureFlags: {
    email: {
      enabled: getIsProductionEnv(),
    },
    credits: {
      developer: {
        enabled: true,
      },
    },
  },
  getIsPreviewEnv: () => {
    return process.env.NEXT_PUBLIC_ENV === 'preview'
  },
  getIsProductionEnv,
}

export default appConfig
