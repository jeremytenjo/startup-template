import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import type { Configuration } from 'webpack'

export default function webpackFinal(props: { defaultWebpackConfig: Configuration }) {
  const updatedConfig: Configuration = props.defaultWebpackConfig
  // fixes Module parse failed: Unexpected character '�' - https://github.com/lovell/sharp/issues/2350
  // updatedConfig.externals = {}
  // updatedConfig.externals.sharp = 'commonjs sharp'

  // resolve
  // fix next router NextRouter was not mounted error
  updatedConfig.resolve = updatedConfig.resolve || {}
  updatedConfig.resolve.alias = {
    ...updatedConfig.resolve.alias,
    'next/compat/router': 'next-router-mock',
    '@': process.cwd(),
  }
  // allow importing ts files with .js
  updatedConfig.resolve.extensionAlias = {
    '.js': ['.ts', '.tsx', '.js'],
  }
  // fallback
  updatedConfig.resolve.fallback = {
    url: false,
    querystring: false,
    path: false,
    assert: false,
    fs: false,
  }
  // plugins
  updatedConfig.resolve.plugins = updatedConfig.resolve.plugins || []
  updatedConfig.resolve.plugins.push(new TsconfigPathsPlugin({}))

  return updatedConfig
}
