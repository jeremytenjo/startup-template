import React from 'react'
import Link from '@useweb/ui/Link'
import List from '@useweb/ui/List'
import type { BoxProps } from '@useweb/ui/Box'

import type NavLinkSchema from '../../../../../../../../../../../data/_commonSchemas/NavLinkSchema/NavLinkSchema.js'

export type RootFooterLinksListContentProps = {
  links: ({ sx?: BoxProps['sx']; component?: any; newTab?: boolean } & NavLinkSchema)[]
  linkPrefix?: string
}

export default function RootFooterLinksListContent(
  props: RootFooterLinksListContentProps,
) {
  return (
    <List<RootFooterLinksListContentProps['links'][0]>
      data={props.links || []}
      listItemKeyName='url'
      ListItemComponent={({ itemData: link }) => {
        return (
          <Link
            href={link.url}
            newTab={link.newTab}
            sx={{
              color: 'neutral.100',
              fontWeight: '400 !important',
              fontSize: '13px',
              lineHeight: '24px',
              textAlign: 'left',
              ...(link.sx || {}),
            }}
          >
            {link.component || link.label}
          </Link>
        )
      }}
      sx={{
        gridGap: '13px',
      }}
    />
  )
}
