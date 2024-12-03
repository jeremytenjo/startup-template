import React, { useEffect } from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Form, { useFormContext } from '@useweb/ui/Form'
import { useRouter } from 'next/router'
import Select from '@useweb/ui/Select'

import selectDefaults from '../../useweb/forms/fields/Select/Select.defaults.js'

const selectDefaultStyles: any = selectDefaults?.styleOverrides

export type RouterLinkedSelectProps = {
  label: string
  options: { label: string; value: string }[]
  controlledValue?: string | number
  defaultValue: () => string
  onChange: (props: { value: any }) => any
  onRouteChange?: (props: { url: string }) => any
  sx?: BoxProps['sx']
}

export default function RouterLinkedSelect(props: RouterLinkedSelectProps) {
  const router = useRouter()

  const handleOnRouteChange = (url) => {
    props.onRouteChange && props.onRouteChange({ url })
  }

  useEffect(() => {
    if (props.onRouteChange) {
      router.events.on('routeChangeComplete', handleOnRouteChange)

      return () => {
        router.events.off('routeChangeComplete', handleOnRouteChange)
      }
    }
  }, [props.onRouteChange])

  return (
    <>
      {!router.isReady && (
        <Box
          sx={{
            mb: '20px',
            height: '47px',
            ...selectCommonStyles,
            ...(selectDefaultStyles?.root || {}),
          }}
        />
      )}

      {router.isReady && (
        <Form
          onSubmit={() => null}
          sx={{
            width: '100%',
            ...(props.sx || {}),
          }}
          defaultValues={{
            select: props.defaultValue(),
          }}
        >
          <Fields {...props} />
        </Form>
      )}
    </>
  )
}

const Fields = (props: RouterLinkedSelectProps) => {
  const formContext = useFormContext()
  const selectFieldName = 'select'

  useEffect(() => {
    if (props.controlledValue) {
      formContext.setValue(selectFieldName, props.controlledValue)
    }
  }, [props.controlledValue])

  return (
    <Select
      name={selectFieldName}
      onChange={props.onChange}
      placeholder={props.label}
      options={props.options}
      sx={{
        ...selectCommonStyles,
      }}
    />
  )
}

const selectCommonStyles = {
  width: ['100%', , '220px'],
  '&.MuiInputBase-root': {
    backgroundColor: 'neutral.600',
  },
}
