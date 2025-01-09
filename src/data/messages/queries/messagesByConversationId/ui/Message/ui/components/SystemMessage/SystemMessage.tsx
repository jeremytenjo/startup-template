import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'
import date from '@useweb/date'
import List from '@useweb/ui/List'

import type { MessageUiProps } from '../../MessageUi.js'
import type CtaSchema from '../../../../../../../../_commonSchemas/CtaSchema/Cta.schema.js'
import useAuth from '../../../../../../../../users/utils/useAuth/useAuth.js'
import LogoIcon from '../../../../../../../../../lib/components/icons/LogoIcon.js'

import useIsSystemMessageComponentOutdated from './utils/useIsSystemMessageComponentOutdated/useIsSystemMessageComponentOutdated.js'

export default function SystemMessage(props: MessageUiProps) {
  const components = props.systemMessageProps?.components

  return (
    <Box
      data-id='SystemMessage'
      sx={{
        display: 'grid',
        alignItems: 'center',
        gap: ['9px', , '12px'],
        mb: '40px',
        width: '100%',
      }}
    >
      <Box
        data-id='Top'
        sx={{
          display: 'grid',
          alignItems: 'center',
          width: '100%',
          gap: '10px',
          gridAutoFlow: ['row', 'column'],
        }}
      >
        <Box
          data-id='Left'
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {props.isTheBloxMarketMessage ? (
            <LogoIcon />
          ) : (
            <Box
              data-id='Point'
              sx={{
                bgcolor: '#FFA800',
                width: '10px',
                height: '10px',
                borderRadius: '3px',
                border: '1px solid #ffd47e',
              }}
            />
          )}

          <Text
            text={props.title || props.body}
            tag='p'
            sx={{
              fontWeight: '600',
              color: 'neutral.100',
              fontSize: '13px',
            }}
          />
        </Box>

        <Text
          text={date(props.sentDate).format('MMM D, YYYY h:mm a.')}
          sx={{
            fontSize: ['10px', '11px'],
            color: 'neutral.150',
            textAlign: [, , 'end'],
          }}
        />
      </Box>

      {props.moreText && (
        <Text
          text={props.moreText}
          tag='p'
          sx={{
            color: 'neutral.100',
            fontSize: ['13px', '16px'],
          }}
        />
      )}

      {props.ctas && !props.systemMessageProps?.hideCtas && (
        <List<CtaSchema>
          data={props.ctas || []}
          listItemKeyName='label'
          horizontalFullWidth
          ListItemComponent={({ itemData: cta }) => {
            return (
              <Link
                href={cta?.href}
                sx={{
                  width: 'fit-content',
                }}
              >
                <Button
                  name='MessageCta'
                  variant='green'
                  size='small'
                  sx={{
                    width: 'fit-content',
                    fontSize: '13px',
                  }}
                >
                  {cta?.label}
                </Button>
              </Link>
            )
          }}
          sx={{
            gap: 2,
          }}
        />
      )}
    </Box>
  )
}
