import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Menu from '@useweb/ui/Menu'
import { capitalCase } from 'change-case'

import type UserSchema from '../../../../data/users/user.schema.js'
import CheckIcon from '../../icons/CheckIcon.js'
import CaretDown from '../../icons/CaretDown/CaretDown.js'

export type StatusColumnHeaderProps = {
  currentUser: UserSchema | undefined
  filterStatus: string[]
  onFilterStatusChange: (p: { filterStatus: any[] }) => void
  itemStatusArray: any[]
}

export default function StatusColumnHeader(props: StatusColumnHeaderProps) {
  const onStatusSelect = (p: { status: string }) => {
    const updatedStatuses = props.filterStatus?.includes(p.status)
      ? props.filterStatus?.filter((status) => status !== p.status)
      : [...(props.filterStatus || []), p.status]

    props.onFilterStatusChange({
      filterStatus: updatedStatuses,
    })
  }

  return (
    <Menu
      id='StatusColumnHeader'
      items={props.itemStatusArray.map((status) => {
        return (
          <StatusItem
            key={status.status}
            onClick={() =>
              onStatusSelect({
                status: status.status,
              })
            }
            status={status.status}
            selected={props.filterStatus?.includes(status.status)}
            statusSx={status.sx}
          />
        )
      })}
      sx={{
        '& .MuiPopover-root .MuiPaper-root': {
          maxHeight: 'none !important',
          backgroundColor: 'red',
        },
      }}
      triggerComponent={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            cursor: 'pointer',
          }}
        >
          <Text text={'Status'} tag='h4' sx={{}} />

          <Box
            data-id='Length'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Text
              text={`${props.filterStatus?.length || props.itemStatusArray.length}/${
                props.itemStatusArray.length
              }`}
              tag='p'
              sx={{
                backgroundColor: 'neutral.100',
                borderRadius: '100px',
                p: '2px 7px',
                userSelect: 'none',
              }}
            />
            <CaretDown />
          </Box>
        </Box>
      }
    />
  )
}

const StatusItem = (props: {
  status: string
  selected: boolean
  statusSx: any
  onClick: () => void
}) => {
  return (
    <Box
      data-id='StatusItem'
      onClick={props.onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        height: '40px',
        cursor: 'pointer',
        userSelect: 'none',
        px: 1,
        '&:hover': {
          backgroundColor: 'neutral.400',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '10px',
            height: '10px',
            backgroundColor: 'white',
            border: '1px solid',
            borderColor: 'red',
            borderRadius: '50%',
            mr: '8px',
            ...(props.statusSx || {}),
          }}
        />
        <Text text={capitalCase(props.status)} tag='p' sx={{}} />
      </Box>
      <CheckIcon
        sx={{
          visibility: props.selected ? 'visible' : 'hidden',
        }}
      />
    </Box>
  )
}
