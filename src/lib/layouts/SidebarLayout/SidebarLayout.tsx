import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Image from '@useweb/ui/Image'
import type { LinkTabsProps } from '@useweb/ui/LinkTabs'
import LinkTabs from '@useweb/ui/LinkTabs'

import { islandStyles } from '../../../theme/UiTheme/commonStyles/islandStyles.js'

export type SidebarLayoutProps = {
  children: any
  sidebarComponent: any
  underLinksContent?: any
  navLinks?: LinkTabsProps
  navLinksAffixComponent?: any
  hideSidebarOnMobile?: boolean
  sx?: BoxProps['sx']
  sidebarSx?: BoxProps['sx']
  contentSx?: BoxProps['sx']
  banner?: {
    src: string
    loading: boolean
  }
  plainContentStyles?: boolean
  reverseSidebarPosition?: boolean
}

const bannerHeight = '180px'

export default function SidebarLayout(props: SidebarLayoutProps) {
  return (
    <Box
      data-id='SidebarLayout'
      sx={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: [, , '300px 1fr'],

        ...(props.reverseSidebarPosition && {
          gridTemplateColumns: [, , '1fr 300px'],
          gridTemplateAreas: [
            '"SidebarLayout_ContentWrapper" "SidebarLayout_Sidebar"',
            ,
            '"SidebarLayout_ContentWrapper SidebarLayout_Sidebar"',
          ],
        }),

        ...((props.sx ?? {}) as any),
      }}
    >
      {/* Banner */}
      {props.banner?.src ? (
        <Image
          data-id='SidebarLayout_Banner'
          src={props.banner.src}
          alt={`SidebarLayout_Banner`}
          width={1200}
          height={1200}
          sx={{
            width: '100vw',
            objectFit: 'cover',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: bannerHeight,
            zIndex: '-1',
            overflow: 'hidden',
            borderBottom: '1px solid',
            borderBottomColor: 'neutral.300',
          }}
        />
      ) : props.banner ? (
        <Box
          data-id='EmtpyBanner'
          sx={{
            width: '100vw',
            objectFit: 'cover',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: bannerHeight,
            zIndex: '-1',
            overflow: 'hidden',
            backgroundColor: 'neutral.600',
            borderBottom: '1px solid',
            borderBottomColor: 'neutral.300',
          }}
        ></Box>
      ) : null}

      {/* Sidebar */}
      <Box
        data-id='SidebarLayout_Sidebar'
        sx={{
          maxWidth: [, , '600px'],
          m: '0 auto',
          ...islandStyles,
          borderRadius: '32px',
          display: [props.hideSidebarOnMobile ? 'none' : 'block', , 'block'],

          ...(props.reverseSidebarPosition && {
            gridArea: 'SidebarLayout_Sidebar',
          }),

          ...((props.sidebarSx ?? {}) as any),
        }}
      >
        {props.sidebarComponent}
      </Box>

      {/* Content */}
      <Box
        data-id='SidebarLayout_ContentWrapper'
        sx={{
          display: 'grid',
          gap: 2,
          alignContent: 'start',

          ...(props.reverseSidebarPosition && {
            gridArea: 'SidebarLayout_ContentWrapper',
          }),

          ...(props.banner ? { mt: [, , bannerHeight] } : {}),
        }}
      >
        {/* Tabs */}
        {props.navLinks && (
          <Box
            data-id='SidebarLayout_TabsWrapper'
            sx={{
              mb: [1, 0],
            }}
          >
            {!props.navLinksAffixComponent ? (
              Boolean(props.navLinks?.links?.length) && <LinkTabs {...props.navLinks} />
            ) : (
              <Box
                data-id='NavLinkTop'
                sx={{
                  display: 'grid',
                  width: '100%',
                  gridTemplateColumns: '1fr auto',
                  gap: 2,
                  alignItems: 'center',
                }}
              >
                {Boolean(props.navLinks?.links?.length) && (
                  <LinkTabs {...props.navLinks} />
                )}

                {props.navLinksAffixComponent || null}
              </Box>
            )}
          </Box>
        )}

        {/* Uner Link Content */}
        {props.underLinksContent || null}

        {/* Page Content */}
        <Box
          data-id='SidebarLayout_Content'
          sx={{
            ...islandStyles,
            ...(props.plainContentStyles
              ? {
                  backgroundColor: 'transparent',
                  border: 'none',
                  p: 0,
                }
              : {}),
            ...((props.contentSx ?? {}) as any),
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  )
}
