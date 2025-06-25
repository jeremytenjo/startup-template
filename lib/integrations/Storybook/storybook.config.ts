import { nextjsConfig } from '../Nextjs/nextjs.config.js'

export const storybookConfig = {
  port: 6006,
  nextjsPort: nextjsConfig.port,
  testIdAttribute: 'data-id',
}
