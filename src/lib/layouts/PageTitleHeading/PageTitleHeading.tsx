import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import type { BoxProps } from '@useweb/ui/Box'
import Skeleton from '@useweb/ui/Skeleton'
import Button from '@useweb/ui/Button'
import Link from '@useweb/ui/Link'

export type PageTitleHeadingProps = {
  title: string
  subTitle?: string | React.ReactNode
  size?: 1 | 2 | 3 | 4
  sx?: BoxProps['sx']
  loading?: boolean
  titleSx?: BoxProps['sx']
  subTitleSx?: BoxProps['sx']
  link?: {
    href: string
    label: string
  }
  titleIconPrefix?: React.ReactNode
}

export default function PageTitleHeading(props: PageTitleHeadingProps) {
  const { size = 1 } = props

  return (
    <Box
      data-id='PageTitleHeading'
      sx={{
        display: 'grid',
        gap: 0.6,
        mb: '14px',
        position: 'relative',
        ...(props.sx || {}),
      }}
    >
      <Skeleton loading={props.loading}>
        <Box
          data-id='PageTitleHeadingTitle'
          sx={{
            ...(props.titleIconPrefix && {
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }),
          }}
        >
          {props.titleIconPrefix || null}
          <Text
            data-id='PageTitleHeading_title'
            text={props.title}
            tag={`h${size}`}
            sx={{
              color: 'neutral.100',
              fontSize: PageTitleHeading_fontSize.title[size],
              fontWeight: '600',
              ...(props.titleSx || {}),
            }}
          />
        </Box>
      </Skeleton>

      {props.subTitle && (
        <Skeleton loading={props.loading}>
          {typeof props.subTitle === 'string' ? (
            <Text
              data-id='PageTitleHeading_subTitle'
              text={props.subTitle}
              tag='p'
              sx={{
                maxWidth: '600px',
                color: 'neutral.100',
                ...(props.subTitleSx || {}),
              }}
            />
          ) : (
            props.subTitle
          )}
        </Skeleton>
      )}

      {props.link && (
        <Link
          href={props?.link?.href}
          sx={{
            position: 'absolute',
            top: ['0', , '7px'],
            right: '0',
            height: 'fit-content',
          }}
        >
          <Button name={props.link?.label} variant='outlined' sx={{}}>
            {props?.link?.label}
          </Button>
        </Link>
      )}
    </Box>
  )
}

export const PageTitleHeading_fontSize = {
  title: {
    1: ['21px', , '30px'],
    2: ['18px', , '21px'],
    3: ['16px', , '16px'],
    4: ['13px', , '12px'],
  },
  subTitle: {
    1: ['12px', , '16px'],
    2: ['12px', , '14px'],
  },
}
