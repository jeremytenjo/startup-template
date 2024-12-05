import React from 'react'
import Box, { type BoxProps } from '@useweb/ui/Box'
import { PrismicRichText } from '@prismicio/react'

import linkResolver from '../../utils/linkResolver/linkResolver.js'

export type RichTextProps = { field: any[]; sx?: BoxProps['sx'] }

// https://prismic.io/docs/technologies/prismic-react-v2-migration-guide#convert-html-serializer-function-to-an-object
export default function RichText(props: RichTextProps) {
  return props.field ? (
    <Box
      data-id='RichText'
      sx={{
        ...props.sx,
        '& strong': {
          fontWeight: 'inherit',
        },
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          fontWeight: '600',
          mb: 1,
          fontSize: ['15px', '17px'],
        },
        '& p': {
          fontSize: ['13px', '15px'],
          mb: 2,
          color: 'neutral.150',
          ...props.sx?.['& p'],
        },

        '& a': {
          color: 'primary.light',
          textDecoration: 'underline',
        },
      }}
    >
      <PrismicRichText field={props.field as any} linkResolver={linkResolver} />
    </Box>
  ) : null
}
