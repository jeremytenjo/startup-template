//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import SettingsPanelNavLinkComponent from '../LinkTab.js'

export default {
  title: 'lib/components/SettingsPanelNavLink',
}

export const Default = {
  render: () => {
    return (
      <>
        <SettingsPanelNavLinkComponent label='settings' urlBase='settings' />
      </>
    )
  },
}
