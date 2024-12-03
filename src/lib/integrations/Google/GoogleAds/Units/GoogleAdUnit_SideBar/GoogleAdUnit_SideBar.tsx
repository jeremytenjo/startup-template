import React from 'react'

import GoogleAdUnit, { type GoogleAdUnitProps } from '../../GoogleAdUnit/GoogleAdUnit.js'

export default function GoogleAdUnit_SideBar() {
  const data: GoogleAdUnitProps = {
    dataAdSlot: '',
    dataAdFormat: '',
    'data-id': 'GoogleAdUnit_SideBar',
  }

  return <GoogleAdUnit {...data} />
}
