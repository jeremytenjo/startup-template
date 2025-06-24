import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import FormFieldHeader from '@useweb/ui/FormFieldHeader'
import Skeleton from '@useweb/ui/Skeleton'

import InfoDisclaimer from '../InfoDisclaimer/InfoDisclaimer.js'

export type InfoItemProps = {
  title: string
  disclaimer?: string
  text?: string
  children?: any
  textSx?: BoxProps['sx']
  loading?: boolean
}

export default function InfoItem(props: InfoItemProps) {
  return (
    <Box data-id='InfoItem' sx={{}}>
      <FormFieldHeader
        label={props.title}
        labelSx={{
          fontSize: '11px',
        }}
        labelRightIcon={
          props.disclaimer ? (
            <InfoDisclaimer
              id={props.title?.replaceAll(' ', '')}
              disclaimer={<Text text={props.disclaimer} />}
            />
          ) : undefined
        }
        sx={{
          mb: '4px',
          '& [data-id="FormFieldHeader_label"]': {
            color: 'neutral.200',
          },
        }}
      />

      <Skeleton loading={props.loading}>
        <>
          {props.text ? (
            <Text
              text={props.text}
              tag='p'
              sx={{
                fontSize: '12px',
                ...(props.textSx || {}),
              }}
            />
          ) : null}

          {props.children || null}
        </>
      </Skeleton>
    </Box>
  )
}
