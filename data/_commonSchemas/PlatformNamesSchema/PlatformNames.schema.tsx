type PlatformNamesSchema =
  | 'youtubeVideo'
  | 'youtubeShort'
  | 'tiktokVideo'
  | 'freshcutVideo'

export default PlatformNamesSchema

export const getPlatformHumanName = (props: {
  platformName: PlatformNamesSchema | undefined
}) => {
  const platformHumanName =
    props.platformName === 'youtubeVideo'
      ? 'YouTube Video'
      : props.platformName === 'youtubeShort'
      ? 'YouTube Short'
      : props.platformName === 'tiktokVideo'
      ? 'TikTok'
      : props.platformName === 'freshcutVideo'
      ? 'Freshcut'
      : ''

  return { platformHumanName }
}
