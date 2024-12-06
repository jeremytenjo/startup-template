import React from 'react'
import List from '@useweb/ui/List'
import type { BoxProps } from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Box from '@useweb/ui/Box'
import { useRouter } from 'next/router'
import useMediaQuery from '@useweb/ui/useMediaQuery'

import RouterLinkedSelect from '../../basic/RouterLinkedSelect/RouterLinkedSelect.js'

import type { LinkTabProps } from './components/LinkTab/LinkTab.js'
import LinkTab, { cleanLink } from './components/LinkTab/LinkTab.js'

export type LinkTabsProps<LinksMetadata = any> = {
  links: LinkTabProps<LinksMetadata>[]
  urlBase?: string | undefined
  isActiveFn?: LinkTabsListProps['isActiveFn']
  title?: string
  sx?: BoxProps['sx']
  selectSx?: BoxProps['sx']
  linksSx?: BoxProps['sx']
  preventRedirect?: boolean
  preventRouterLinkedSelectRedirect?: boolean
  controlledValue?: string | number
  onChange?: (props: { value: string }) => any
  onRouterLinkedSelectChange?: (props: { value: string }) => any
  shallow?: boolean
  routerLinkedSelectControlledValue?: string | undefined
}

export default function LinkTabs(props: LinkTabsProps) {
  const isMobile = useMediaQuery({ size: 'md', type: 'down' })
  const isTablet = useMediaQuery({ size: 'md', type: 'up' })
  const router = useRouter()

  const linkSelectOptions = props.links.map((c) => {
    return {
      label: c.label.charAt(0).toUpperCase() + c.label.slice(1),
      value: c.overrideSelectOptionValue || cleanLink({ ...c, urlBase: props.urlBase }),
      dynamicHref: c.dynamicHref,
      isDefaultFn: c.isDefaultFn,
    }
  })

  return (
    <Box
      data-id='LinkTabs'
      sx={{
        position: 'relative',
        zIndex: '2',
      }}
    >
      {isMobile.matches && (
        <Box
          component={'section'}
          sx={{
            pb: '20px',
            mb: '-20px',
          }}
        >
          <RouterLinkedSelect
            label='Link Tabs Select'
            options={linkSelectOptions}
            sx={props.selectSx || {}}
            controlledValue={
              props.routerLinkedSelectControlledValue || props.controlledValue
            }
            onChange={({ value }) => {
              if (!props.preventRedirect && !props.preventRouterLinkedSelectRedirect) {
                router.push(value, undefined, {
                  shallow: Boolean(props.shallow),
                })
              }

              if (props.onRouterLinkedSelectChange) {
                props.onRouterLinkedSelectChange({ value })
              }

              if (props.onChange) {
                props.onChange({ value })
              }
            }}
            defaultValue={() => {
              if (router.pathname) {
                let defaultV =
                  String(
                    cleanLink({
                      dynamicHref: {
                        pathname: router.pathname,
                        query: router.query,
                      },
                      label: router.pathname.replace(`/${props.urlBase}`, ''),
                      urlBase: props.urlBase,
                    }),
                  ) || linkSelectOptions[0].value

                linkSelectOptions.forEach((o) => {
                  if (o.isDefaultFn) {
                    const isDefault = o.isDefaultFn({ router })?.isDefault

                    if (isDefault) {
                      defaultV = o.value
                    }
                  }
                })

                return defaultV
              }

              return linkSelectOptions[0].value
            }}
          />
        </Box>
      )}

      {isTablet.matches && (
        <Box sx={{}}>
          <LinkTabsList
            links={props.links}
            isActiveFn={props.isActiveFn}
            sx={props.sx}
            urlBase={props.urlBase}
            preventRedirect={props.preventRedirect}
            onChange={props.onChange}
            controlledValue={props.controlledValue}
            linksSx={props.linksSx}
            shallow={props.shallow}
          />
        </Box>
      )}

      {props.title && (
        <Text
          text={props.title}
          tag='p'
          sx={{
            mb: 2,
          }}
        />
      )}
    </Box>
  )
}

export type LinkTabsListProps = {
  links: LinkTabsProps['links']
  urlBase: LinkTabsProps['urlBase']
  isActiveFn?: LinkTabProps['isActiveFn']
  sx?: BoxProps['sx']
  linksSx?: BoxProps['sx']
  preventRedirect?: LinkTabsProps['preventRedirect']
  onChange?: LinkTabsProps['onChange']
  controlledValue?: LinkTabsProps['controlledValue']
  shallow?: boolean
  'data-id'?: string
}

export const LinkTabsList = (props: LinkTabsListProps) => {
  return (
    <List<LinkTabProps>
      data-id={props['data-id'] || 'LinkTabsList'}
      listItemKeyName='label'
      data={(props.links as any) || []}
      sx={{
        filter: 'drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05))',
        border: '1px solid transparent',
        borderColor: 'neutral.300',
        width: 'fit-content',
        borderRadius: '8px',

        '& li:first-of-type a': {
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
        },

        '& li:last-of-type a': {
          borderTopRightRadius: '8px',
          borderBottomRightRadius: '8px',
          borderRightColor: 'neutral.600',
        },

        ...(props.sx || {}),
      }}
      horizontalFullWidth
      ListItemComponent={({ itemData }) => {
        return (
          <LinkTab
            isActiveFn={props.isActiveFn}
            sx={props.linksSx}
            {...itemData}
            urlBase={props.urlBase}
            preventRedirect={props.preventRedirect}
            onChange={props.onChange}
            controlledValue={props.controlledValue}
            shallow={props.shallow}
          />
        )
      }}
    />
  )
}
