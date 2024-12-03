import React from 'react'
import Box from '@useweb/ui/Box'
import type { TextProps } from '@useweb/ui/Text'
import Text from '@useweb/ui/Text'
import Image from '@useweb/ui/Image'

import { PageTitleHeading_fontSize } from '../../../layouts/PageTitleHeading/PageTitleHeading.js'

type GradientsEnum = 'purple' | 'orange' | 'blue' | 'green'

export type InfoBannerProps = {
  icon: string
  title: string
  titleProps?: Omit<TextProps, 'text'>
  subTitle: string
  subTitleProps?: Omit<TextProps, 'text'>
  children?: any
  leftGradientIcon: GradientsEnum
  rightGradientIcon: GradientsEnum
}

export default function InfoBanner(props: InfoBannerProps) {
  return (
    <Box
      data-id='InfoBanner'
      sx={{
        position: 'relative',
        backgroundColor: 'neutral.600',
        border: '1px solid',
        borderColor: 'neutral.300',
        width: '100%',
        borderRadius: '32px',
        p: '15px',
        py: ['20px', '30px'],
        alignItems: 'center',
        display: 'grid',
        overflow: 'hidden',
        gridTemplateColumns: [, , props.children ? 'fit-content(100%) 1fr' : '1fr'],
        justifyContent: ['center', , 'normal'],
        zIndex: -1,
        gap: [, , '20px', '120px'],
      }}
    >
      <Image
        data-id='InfoBanner_LeftGradient'
        src={`/images/gradients/gradient-${props.leftGradientIcon}.png`}
        alt={`alt`}
        width={220}
        height={220}
        sx={{
          position: 'absolute',
          bottom: '-133px',
          width: 620,
          height: 620,
          left: '-100px',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      <Image
        data-id='InfoBanner_RightGradient'
        src={`/images/gradients/gradient-${props.rightGradientIcon}.png`}
        alt={`alt`}
        width={200}
        height={200}
        sx={{
          position: 'absolute',
          right: '-180px',
          width: '620px',
          height: '580px',
          bottom: '-283px',
          pointerEvents: 'none',
        }}
      />
      <Box
        data-id='Left'
        sx={{
          display: 'grid',
          gap: '20px',
          gridAutoFlow: 'column',
          gridTemplateColumns: [, , '190px 1fr'],
          justifySelf: ['center', , 'start'],
        }}
      >
        <Box
          data-id='InfoBanner_Image'
          sx={{
            position: 'relative',
            display: ['none', , 'block'],
          }}
        >
          {props.icon ? (
            <Image
              src={props.icon}
              alt={`alt`}
              width={800}
              unoptimized
              height={800}
              sx={{
                position: 'absolute',
                left: -30,
                bottom: -130,
                width: 240,
                height: 240,
              }}
            />
          ) : null}
        </Box>

        <Box
          data-id='Center'
          sx={{
            alignSelf: 'center',
          }}
        >
          {/* Title */}
          <Text
            text={props.title}
            tag='p'
            {...props.titleProps}
            sx={{
              fontSize: PageTitleHeading_fontSize.title[1],
              fontWeight: '600',
              lineHeight: '1',
              mb: 1,
              position: 'relative',
              zIndex: 2,
              textAlign: ['center', , 'left'],
              ...(props.titleProps?.sx || {}),
            }}
          />
          {/* SubTitle */}
          <Text
            text={props.subTitle}
            tag='p'
            {...props.subTitleProps}
            sx={{
              fontWeight: 500,
              position: 'relative',
              zIndex: 2,
              textAlign: ['center', , 'left'],
              ...(props.subTitleProps?.sx || {}),
            }}
          />
        </Box>
      </Box>

      {/* Children */}
      {props.children && (
        <Box
          data-id='Children'
          sx={{
            zIndex: 2,
          }}
        >
          {props.children}
        </Box>
      )}
    </Box>
  )
}
