import React from 'react'

import IconTikTok from '../../../icons/IconTikTok.js'
import IconInstagram from '../../../icons/IconInstagram.js'
import IconYoutube from '../../../icons/IconYoutube.js'
import IconPinterest from '../../../icons/IconPinterest.js'

import SocialContactsUi, {
  type SocialContactsUiProps,
} from './SocialContactsUi/SocialContacts.ui.js'

export default function SocialContacts() {
  const accountLinks: SocialContactsUiProps['accountLinks'] = [
    {
      url: 'https://www.tiktok.com/@onlyfindz',
      icon: IconTikTok,
      hoverColor: '#39C6DD',
    },
    {
      url: 'https://www.instagram.com/onlyfindz',
      icon: IconInstagram,
      hoverColor: '#C72784',
    },
    {
      url: 'https://www.youtube.com/channel/UCKqNC6XNQVKmKOSHvJuQBEw/videos',
      icon: IconYoutube,
      hoverColor: '#FF0000',
    },
    {
      url: 'https://www.pinterest.ca/jerzaydt',
      icon: IconPinterest,
      hoverColor: '#E60023',
    },
  ]

  return <SocialContactsUi accountLinks={accountLinks} />
}
