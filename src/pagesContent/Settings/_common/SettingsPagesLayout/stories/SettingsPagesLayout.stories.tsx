//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import LinkTabsComp from '@useweb/ui/LinkTabs'

export default {
  title: 'lib/components/SettingsPagesLayout',
  args: {
    links: [
      {
        label: 'hello',
        href: '/hello',
      },
      {
        label: 'hello',
        href: '/hello',
      },
      {
        label: 'hello',
        href: '/hello',
      },
      {
        label: 'hello',
        href: '/hello',
      },
      {
        label: 'hello',
        href: '/hello',
      },
    ],
  },
}

export const LinkTabs = {
  render: (args) => {
    return (
      <>
        <LinkTabsComp {...args} />
      </>
    )
  },
}
