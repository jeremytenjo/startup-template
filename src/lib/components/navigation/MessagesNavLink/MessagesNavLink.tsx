import React from 'react'
import { useFaviconWithAlert } from '@useweb/change-favicon'
import Link from '@useweb/ui/Link'

import MessagesIcon from '../../icons/MessagesIcon.js'

export default function MessagesNavLink() {
  const fav = useFaviconWithAlert()

  return (
    <Link
      data-id='MessagesNavLink'
      className='iconBackground'
      href={`/messages`}
      onClick={() => {
        fav.showIconUrl()
      }}
      sx={{
        position: 'relative',
        mx: 1,
      }}
    >
      <MessagesIcon />
    </Link>
  )
}
