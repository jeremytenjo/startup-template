export type ValidateYoutubeUrlProps = {
  url: string
  isYoutubeShort: boolean
}

export default function validateYoutubeUrl(props: ValidateYoutubeUrlProps) {
  // https://www.youtube.com/watch?v=b-oWz7K0XJE&t=6&ab_channel=PunitChawla
  const youtubeRegex_desktop_url =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(&\S+)?$/

  // https://m.youtube.com/watch?si=73aX4I8FyJtdNErj&v=1SRoH7ZKVIw&feature=youtu.be
  const youtubeRegex_desktop_mobile_url =
    /^(https?:\/\/)?(www\.)?(m\.)?youtube\.com\/watch\?si=[\w-]+&v=[\w-]+(&\S+)?$/

  // https://youtu.be/1SRoH7ZKVIw?si=73aX4I8FyJtdNErj
  const youtubeRegex_mobile_device_url =
    /^(https?:\/\/)?(www\.)?youtu\.be\/[\w-]+(\?si=[\w-]+)?$/

  const isValidYoutubeVideoUrl =
    youtubeRegex_desktop_url.test(props.url) ||
    youtubeRegex_desktop_mobile_url.test(props.url) ||
    youtubeRegex_mobile_device_url.test(props.url)

  const youtubeShortRegex =
    /^https?:\/\/(www\.)?youtube\.com\/shorts\/[\w-]+(\?[\w=&-]*)?$/

  const isValid = props.isYoutubeShort
    ? youtubeShortRegex.test(props.url)
    : isValidYoutubeVideoUrl

  const errorMessage = props.isYoutubeShort
    ? youtubeShortErrorMessage
    : invalidErrorMessage

  return {
    isValid,
    invalidErrorMessage: isValid ? '' : errorMessage,
  }
}

export type ValidateYoutubeUrlReturn = ReturnType<typeof validateYoutubeUrl>

export const invalidErrorMessage =
  'Invalid URL. Example https://www.youtube.com/watch?videoid'
export const youtubeShortErrorMessage =
  'Invalid URL. Example https://www.youtube.com/shorts/videoid'
