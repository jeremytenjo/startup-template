import React from 'react'
import Text from '@useweb/ui/Text'
import type { LinkProps } from '@useweb/ui/Link'
import Link from '@useweb/ui/Link'
import Skeleton from '@useweb/ui/Skeleton'

export type BalanceMiniCardProps = {
  title: string
  balance: number | string
  loading: boolean
  link: string
  sx?: LinkProps['sx']
}

export default function BalanceMiniCard(props: BalanceMiniCardProps) {
  return (
    <Link
      data-id='BalanceMiniCard'
      href={props.link}
      sx={{
        ...(props.sx ?? {}),
      }}
    >
      <Text
        text={props.title || `Balance`}
        tag='p'
        sx={{
          fontWeight: '700',
          fontSize: ['12px', '15px'],
          color: 'neutral.200',
        }}
      />

      <Skeleton
        loading={props.loading}
        sx={{
          width: '40px',
        }}
      >
        <Text
          text={`${props.balance}`}
          tag='p'
          sx={{
            fontSize: ['11px', '15px'],
            fontWeight: '700',
          }}
        />
      </Skeleton>
    </Link>
  )
}
