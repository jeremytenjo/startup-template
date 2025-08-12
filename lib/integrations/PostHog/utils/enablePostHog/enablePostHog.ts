import posthogConfig from '../../posthog.config.js'

export default function enablePostHog() {
  const enable = process.env.NODE_ENV === 'production' && posthogConfig.id

  return { enable }
}
