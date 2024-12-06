import React from 'react'
import * as changeCase from 'change-case'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import Box from '@useweb/ui/Box'

import type { LinkTabsProps } from '../../../../lib/components/navigation/LinkTabs/LinkTabs.js'
import LinkTabs from '../../../../lib/components/navigation/LinkTabs/LinkTabs.js'
import type { LinkTabProps } from '../../../../lib/components/navigation/LinkTabs/components/LinkTab/LinkTab.js'
import PageTitleHeading from '../../../../lib/layouts/PageTitleHeading/PageTitleHeading.js'
import useAuth from '../../../../data/users/utils/useAuth/useAuth.js'

import SettingsPagesLayoutContent from './containers/SettingsPagesLayoutContent/SettingsPagesLayoutContent.js'

export type SettingsPagesLayoutProps = {
  children: React.ReactElement
}

export default function SettingsPagesLayout(props: SettingsPagesLayoutProps) {
  const auth = useAuth()
  const { settingsLinks } = useSettingsLinks()

  if (auth.isUserSignedOutAfterInitialAuthAttempt) {
    return <ErrorMessage error message='Sign in to view your settings' />
  }

  return (
    <Box data-id='SettingsPagesLayout' sx={{}}>
      <PageTitleHeading title='Settings' subTitle='Manage your account settings.' />
      <LinkTabs
        links={settingsLinks}
        urlBase='settings'
        selectSx={{
          mb: '20px',
        }}
        sx={{
          mb: '20px',
        }}
      />
      <SettingsPagesLayoutContent>{props.children}</SettingsPagesLayoutContent>
    </Box>
  )
}

export function useSettingsLinks() {
  const settingsLinks: LinkTabsProps['links'] = [
    {
      label: 'Edit Profile',
    },
  ]

  settingsLinks.push({
    label: 'Security',
  })

  settingsLinks.push({
    label: 'Billing',
  })

  settingsLinks.push({
    label: 'Account',
  })

  return { settingsLinks }
}

export const useGetSettingsLinksWithHrefs = () => {
  const { settingsLinks } = useSettingsLinks()

  const settingsLinksWithHrefs = settingsLinks.map((s) => ({
    label: s.label,
    href: formatSettingsPageLink(s),
  }))

  return { settingsLinksWithHrefs }
}

export const formatSettingsPageLink = (props: LinkTabProps) => {
  const href = `/settings/${props.hrefOverride || changeCase.paramCase(props.label)}`
  return href
}
