import React from 'react'
import Link from '@useweb/ui/Link'
import List from '@useweb/ui/List'
import * as changeCase from 'change-case'
import type { BoxProps } from '@useweb/ui/Box'

export type ContentProps = {
  links: {
    url: string
    sx?: BoxProps['sx']
    overrideLabel?: string
  }[]
  linkPrefix?: string
}

export default function Content(props: ContentProps) {
  const linkPrefix = props.linkPrefix ? `${props.linkPrefix}/` : ''

  return (
    <List<ContentProps['links'][0]>
      data={props.links || []}
      listItemKeyName='url'
      ListItemComponent={({ itemData: link }) => {
        return (
          <Link
            href={`/${linkPrefix}${changeCase.paramCase(link.url)}`}
            sx={{
              color: 'neutral.100',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '24px',
              textAlign: 'left',
              ...(link.sx || {}),
            }}
          >
            {link.overrideLabel || changeCase.capitalCase(link.url)}
          </Link>
        )
      }}
      sx={{
        gridGap: '16px',
      }}
    />
  )
}
