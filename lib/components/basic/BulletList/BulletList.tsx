import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import List from '@useweb/ui/List'
import Text from '@useweb/ui/Text'
import FormFieldHeader from '@useweb/ui/FormFieldHeader'

export type BulletListProps = {
  list: string[]
  sx?: BoxProps['sx']
  titleSx?: BoxProps['sx']
  title?: string
}

export default function BulletList(props: BulletListProps) {
  return (
    <>
      {props.title && (
        <FormFieldHeader
          label={props.title}
          sx={{
            my: 2,
            ...(props.titleSx || {}),
          }}
        />
      )}

      <List<string>
        data={props.list || []}
        ListItemComponent={({ itemData }) => {
          return (
            <Box sx={{}}>
              <Text
                text={`- ${itemData}`}
                sx={{
                  fontSize: ['12px', '14px'],
                }}
              />
            </Box>
          )
        }}
        sx={{
          gap: 1,
          ...(props.sx || {}),
        }}
      />
    </>
  )
}
