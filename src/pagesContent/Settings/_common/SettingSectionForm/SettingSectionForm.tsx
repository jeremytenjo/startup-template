import React from 'react'
import type { FormProps } from '@useweb/ui/Form'
import Form, { useFormContext } from '@useweb/ui/Form'
import type { ActionBoxProps } from '@useweb/ui/ActionBox'
import ActionBox from '@useweb/ui/ActionBox'
import Button from '@useweb/ui/Button'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import Skeleton from '@useweb/ui/Skeleton'

export type SettingSectionFormProps<FormSchema> = {
  onSubmit: FormProps<FormSchema>['onSubmit']
  title: ActionBoxProps['title']
  children: any
  loading: boolean
  disabled: boolean
  error: any
  actionBoxProps?: Partial<ActionBoxProps>
  defaultValues?: FormProps<FormSchema>['defaultValues']
  'data-id'?: string
  sx?: FormProps<FormSchema>['sx']
  leftCtas?: any
  rightCtas?: any
  submitButtonText?: string
  forceEnableSubmitButton?: boolean
  errorMessage?: string
  loadingCtas?: boolean
  disableMainCta?: boolean
}

export default function SettingSectionForm<FormSchema>(
  props: SettingSectionFormProps<FormSchema>,
) {
  return (
    <Form
      data-id={props['data-id'] || 'SettingSectionForm'}
      onSubmit={props.onSubmit}
      defaultValues={props.defaultValues}
    >
      <ActionBox
        {...(props.actionBoxProps || {})}
        singleCTA={props.actionBoxProps?.singleCTA}
        sx={{
          ...(props.sx || {}),
        }}
        headerProps={{
          title: props.title,
          sx: { borderBottom: '1px solid', borderColor: 'neutral.300', mb: 2 },
        }}
        ctas={
          <Skeleton
            loading={props.loadingCtas}
            sx={{
              width: '120px',
            }}
          >
            <CTAS
              disabled={props.disabled}
              loading={props.loading}
              leftCtas={props.leftCtas}
              rightCtas={props.rightCtas}
              submitButtonText={props.submitButtonText}
              forceEnableSubmitButton={props.forceEnableSubmitButton}
              disableMainCta={props.disableMainCta}
            />
          </Skeleton>
        }
      >
        {props.children}

        <ErrorMessage
          error={props.error}
          sx={{
            mt: 2,
          }}
          message={
            props.errorMessage || 'Error updating settings. Please try again later.'
          }
        />
      </ActionBox>
    </Form>
  )
}

type CTASProps = {
  leftCtas: SettingSectionFormProps<any>['leftCtas']
  rightCtas: SettingSectionFormProps<any>['rightCtas']
  loading: SettingSectionFormProps<any>['loading']
  disabled: SettingSectionFormProps<any>['disabled']
  submitButtonText?: string
  forceEnableSubmitButton?: boolean
  disableMainCta: boolean | undefined
}

const CTAS = (props: CTASProps) => {
  const formContext = useFormContext()

  return (
    <>
      {props.leftCtas || null}
      {!props.disableMainCta && (
        <Button
          name='Save'
          type='submit'
          loading={props.loading}
          variant={props.submitButtonText?.includes('Cancel') ? 'severe' : 'green'}
          disabled={
            (props.disabled || !formContext.formState.isDirty) &&
            !props.forceEnableSubmitButton
          }
          sx={{}}
        >
          {props.submitButtonText || 'Save'}
        </Button>
      )}
      {props.rightCtas || null}
    </>
  )
}
