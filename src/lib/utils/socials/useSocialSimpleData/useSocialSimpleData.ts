import { useMemo } from 'react'

import type VideoTypesSchema from '../../../../data/_commonSchemas/VideoTypesSchema/VideoTypes.schema.js'
import YoutubeIcon from '../../../components/icons/YoutubeIcon/YoutubeIcon.js'
import YoutubeShortIcon from '../../../components/icons/YoutubeShortIcon.js'
import TiktokIcon from '../../../components/icons/TiktokIcon.js'

export type UseSocialSimpleDataProps = { social: VideoTypesSchema }

export default function useSocialSimpleData(props: UseSocialSimpleDataProps) {
  const data = useMemo(() => {
    let name = ''
    let icon: any = null

    if (props.social === 'youtube') {
      name = 'YouTube Video'
      icon = YoutubeIcon
    }

    if (props.social === 'youtubeShort') {
      name = 'YouTube Short'
      icon = YoutubeShortIcon
    }

    if (props.social === 'tiktok') {
      name = 'Tiktok'
      icon = TiktokIcon
    }

    return {
      name,
      icon,
    }
  }, [props.social])

  return data
}

export type UseSocialSimpleDataReturn = ReturnType<typeof useSocialSimpleData>
