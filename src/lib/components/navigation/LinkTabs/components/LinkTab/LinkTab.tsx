import React from 'react'
import Link, { type LinkProps } from '@useweb/ui/Link'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import type { NextRouter } from 'next/router'
import { useRouter } from 'next/router'
import { paramCase } from 'change-case'
import { replaceSlugsWithQueries } from '@useweb/ui/Link'
import Skeleton from '@useweb/ui/Skeleton'

export type LinkTabProps<MetadataSchema = any> = {
  label: string
  labelOverride?: string
  hrefOverride?: string
  disabled?: boolean
  urlBase?: string
  isExact?: boolean
  dynamicHref?: LinkProps['dynamicHref']
  quantity?: number | string
  labelPrefix?: any
  preventRedirect?: boolean
  controlledValue?: string | number
  isActiveFn?: (props: { href: string; pathname: string }) => { isActive: boolean }
  isDefaultFn?: (props: { router: NextRouter }) => { isDefault: boolean }
  onChange?: (props: { value: string }) => any
  sx?: LinkProps['sx']
  shallow?: boolean
  loading?: boolean
  overrideSelectOptionValue?: string
  metadata?: MetadataSchema
  forceInactive?: (p: { pathname: string }) => {
    isInactive: boolean
  }
}

export default function LinkTab(props: LinkTabProps) {
  const href = cleanLink({
    label: props.label,
    hrefOverride: props.hrefOverride,
    urlBase: props.urlBase,
  })

  const router = useRouter()

  let isActive = props.isActiveFn
    ? props.isActiveFn({
        href,
        pathname: router.pathname,
      })?.isActive
    : router.pathname.includes(href)

  if (props.isExact) {
    isActive = (props.hrefOverride || href) === router.pathname
  }

  if (props.controlledValue) {
    isActive = props.controlledValue === href
  }

  if (props?.dynamicHref?.pathname === router?.pathname) {
    isActive = true
  }

  if (
    props?.forceInactive &&
    props?.forceInactive({
      pathname: router.pathname,
    }).isInactive
  ) {
    isActive = false
  }

  return (
    <Link
      data-id='LinkTab'
      data-is-active={isActive}
      onClick={(e) => {
        if (props.preventRedirect) {
          e.preventDefault()
        }

        if (props.onChange) {
          props.onChange({
            value: cleanLink({
              ...props,
            }),
          })
        }
      }}
      sx={{
        display: 'flex',
        alignContent: 'start',
        // height: '43px',
        width: '100%',
        backgroundColor: isActive ? 'neutral.350' : 'neutral.600',
        gridAutoFlow: 'column',
        alignItems: 'center',
        transition: '0.3s',
        color: isActive ? 'neutral.100' : 'neutral.200',
        cursor: isActive ? 'default' : 'pointer',
        p: '8px 12px',
        ...(props.sx || {}),

        ...(props.disabled
          ? {
              pointerEvents: 'none',
              opacity: '0.3',
            }
          : {}),

        ...(props.loading
          ? {
              minWidth: '100px',
              pointerEvents: 'none',
              backgroundColor: 'neutral.600',
              color: 'neutral.100',
            }
          : {}),

        '&:hover': {
          bgcolor: 'neutral.300',
          color: 'neutral.100',
          ...(props.sx?.['&:hover'] || {}),
        },
      }}
      href={href}
      dynamicHref={props.dynamicHref}
      shallow={Boolean(props.shallow)}
    >
      {props.loading ? null : props.labelPrefix || null}
      <Skeleton loading={props.loading}>
        <Text
          tag='p'
          text={props.labelOverride || props.label}
          sx={{
            fontWeight: 600,
            fontSize: [13, , 14],
            lineHeight: '20px',
            textAlign: 'left',
            whiteSpace: 'nowrap',
            ml: props.labelPrefix ? 1 : 0,
          }}
        />
      </Skeleton>
      {props.quantity !== undefined && (
        <Box
          data-id='quantity'
          sx={{
            backgroundColor: 'neutral.200',
            fontSize: '12px',
            borderRadius: '14px',
            width: '25px',
            height: '25px',
            fontWeight: 'bold',
            ml: 1,
            color: 'neutral.100',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {props.quantity}
        </Box>
      )}
    </Link>
  )
}

export const cleanLink = (cleanLinkProps: LinkTabProps) => {
  const base = cleanLinkProps.urlBase ? `/${cleanLinkProps.urlBase}/` : ''

  let href = `${base}${cleanLinkProps.hrefOverride || paramCase(cleanLinkProps.label)}`

  if (cleanLinkProps.dynamicHref) {
    href = replaceSlugsWithQueries({ dynamicHref: cleanLinkProps.dynamicHref })
  }

  href = href.replaceAll('//', '/')

  return href
}
