import React from 'react'
import Link from '@useweb/ui/Link'
import List from '@useweb/ui/List'
import type { BoxProps } from '@useweb/ui/Box'

import type NavLinkSchema from '../../../../../../../../../../../data/_commonSchemas/NavLinkSchema/NavLinkSchema.js'

export type RootFooterLinksListContentProps = {
  links: ({ sx?: BoxProps['sx'] } & NavLinkSchema)[]
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
            sx={{
              color: 'neutral.100',
              fontWeight: 400,
              fontSize: '13px',
              lineHeight: '24px',
              textAlign: 'left',
              ...(link.sx || {}),
            }}
          >
            {link.label}
          </Link>
        )
      }}
      sx={{
        gridGap: '16px',
      }}
    />
  )
}
