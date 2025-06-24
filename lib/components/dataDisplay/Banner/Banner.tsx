import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import type { ButtonProps } from '@useweb/ui/Button'
import Button from '@useweb/ui/Button'
import Link from '@useweb/ui/Link'

import { Island } from '../../../integrations/Useweb/theme/UiTheme/commonStyles/islandStyles.jsx'
import type { PageTitleHeadingProps } from '../../../layouts/PageTitleHeading/PageTitleHeading.js'
import PageTitleHeading from '../../../layouts/PageTitleHeading/PageTitleHeading.js'

export type BannerProps = {
  ['data-id']: string
  sx?: BoxProps['sx']
  innerSx?: BoxProps['sx']
  left: {
    title: PageTitleHeadingProps
    link?: {
      href: string
      label: string
      buttonProps?: ButtonProps
    }
    content?: any
    gradient?: {
      color: string
    }
    sx?: BoxProps['sx']
  }
  right: {
    content: any
    sx?: BoxProps['sx']
  }
}

export default function Banner(props: BannerProps) {
  return (
    <Box
      data-id={props['data-id']}
      data-id-unique='Banner'
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        ...props?.sx,
      }}
    >
      <Island
        data-id='Banner_Inner'
        sx={{
          width: '100%',
          maxWidth: '1170px',
          alignItems: 'center',
          display: 'grid',
          px: '32px',
          py: [2, 3],
          backgroundColor: 'neutral.600',
          borderWidth: '2px',
          position: 'relative',
          overflow: 'hidden',
          ...props?.innerSx,
        }}
      >
        {props.left?.gradient && (
          <Box
            data-id='Banner_LeftGradient'
            sx={{
              width: '346px',
              height: '236px',
              flexShrink: '0',
              borderRadius: '346px',
              position: 'absolute',
              filter: 'blur(100px)',
              top: '-80px',
              left: '10px',
              zIndex: '1',
              background: props.left?.gradient?.color,
            }}
          />
        )}

        <Box
          data-id='Left'
          sx={{
            position: 'relative',
            zIndex: '2',
            ...props?.left?.sx,
          }}
        >
          <PageTitleHeading
            {...props?.left?.title}
            subTitleSx={{
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '600',
              color: 'neutral.200',
              maxWidth: '420px',
              ...props.left?.title?.subTitleSx,
            }}
            sx={{
              ...(!props.left?.link
                ? {
                    mb: 0,
                  }
                : {}),
            }}
          />

          {props.left?.link && (
            <Link href={props.left?.link.href}>
              <Button
                name={props.left?.link.label}
                {...props.left?.link?.buttonProps}
                sx={{
                  width: ['100%', '303px'],
                  ...props.left?.link?.buttonProps?.sx,
                }}
              >
                {props.left?.link?.label}
              </Button>
            </Link>
          )}

          {props.left?.content || null}
        </Box>

        <Box
          data-id='Right'
          sx={{
            position: 'absolute',
            right: '0',
            ...props?.right?.sx,
          }}
        >
          {props.right?.content || null}
        </Box>
      </Island>
    </Box>
  )
}
