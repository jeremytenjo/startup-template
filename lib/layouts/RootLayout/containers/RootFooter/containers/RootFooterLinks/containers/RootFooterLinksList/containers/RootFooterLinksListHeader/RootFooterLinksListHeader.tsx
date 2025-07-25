import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

export type RootFooterLinksListHeaderProps = {
  title: string
}

export default function RootFooterLinksListHeader(props: RootFooterLinksListHeaderProps) {
  return (
    <Box
      data-id='RootFooterLinksListHeader'
      sx={{
        display: 'grid',
        width: '100%',
        height: '23px',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        gridAutoFlow: 'column',
        gridGap: '10px',
      }}
    >
      <Text
        text={props.title}
        sx={{
          color: 'neutral.100',
          fontWeight: 700,
          fontSize: [14, , 16],
          lineHeight: '22.399999618530273px',
          textAlign: 'left',
        }}
      />
    </Box>
  )
}
