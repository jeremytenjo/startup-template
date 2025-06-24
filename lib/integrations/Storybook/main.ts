import type { StorybookConfig } from '@storybook/nextjs'

// disable because webpack has not ran extensionAlias
// eslint-disable-next-line require-extensions/require-extensions
import webpackFinal from './storybookWebpack/webpackFinal'
import stories from './storiesList.cjs'

const config: StorybookConfig = {
  stories: [...stories],
  staticDirs: ['../../../public'],
  framework: '@storybook/nextjs',
  core: { builder: '@storybook/builder-webpack5', disableTelemetry: true },
  addons: [
    {
      // https://storybook.js.org/docs/react/essentials/introduction#disabling-addons
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        docs: false,
      },
    },
    {
      name: '@storybook/addon-interactions',
    },
  ],
  webpackFinal: async (defaultWebpackConfig) => {
    return webpackFinal({ defaultWebpackConfig })
  },
}

export default config
