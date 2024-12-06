//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import SettingsPagesLayoutNavLinkComponent from '../LinkTab.js'

export default {
  title: 'lib/components/SettingsPagesLayoutNavLink',
}

export const Default = {
  render: () => {
    return (
      <>
        <SettingsPagesLayoutNavLinkComponent label='settings' urlBase='settings' />
      </>
    )
  },
}
