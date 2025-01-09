import React from 'react'
import Button from '@useweb/ui/Button'
import Dialog from '@useweb/ui/Dialog'
import Form from '@useweb/ui/Form'
import ActionBox from '@useweb/ui/ActionBox'
import TextField from '@useweb/ui/TextField'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import type UserSchema from '../../../../../users/user.schema.js'
import type { AdminSendSystemMessageProps } from '../../adminSendSystemMessage.js'
import useAdminSendSystemMessage from '../../useAdminSendSystemMessage/useAdminSendSystemMessage.js'

export type AdminSendSystemMessageFormProps = {
  user: UserSchema | undefined
  onSent?: () => void
}

type FormSchema = AdminSendSystemMessageProps

export default function AdminSendSystemMessageForm(
  props: AdminSendSystemMessageFormProps,
) {
  const message = useAdminSendSystemMessage({
    onResult() {
      if (props.onSent) {
        props.onSent()
      }
    },
  })

  return (
    <Form<FormSchema>
      onSubmit={({ formValues }) => {
        if (!props.user) {
          throw new Error(`props.user is undefined`, {
            cause: {
              props,
            },
          })
        }

        message.exec({
          user: props.user,
          message: formValues.message,
        })
      }}
    >
      <ActionBox
        data-id='AdminSendSystemMessageForm'
        headerProps={{
          title: `Message to ${props.user?.displayName}`,
        }}
        ctas={
          <>
            <Button name='Send' type='submit' sx={{}} loading={message.loading}>
              Send
            </Button>
          </>
        }
        sx={{}}
        childrenSx={{
          display: 'grid',
          gap: 2,
        }}
      >
        <TextField<FormSchema> name='message' label='Message' multiline rows={10} />
        <ErrorMessage error={message.error} message='Error sending message' />
      </ActionBox>
    </Form>
  )
}

export const AdminSendSystemMessageFormButton = (
  props: AdminSendSystemMessageFormProps,
) => {
  const [openDialog, setOpenDialog] = React.useState(false)

  return (
    <>
      <Button name='Send Admin Message' sx={{}} onClick={() => setOpenDialog(true)}>
        Send Admin Message
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} resetStyles>
        <AdminSendSystemMessageForm
          {...props}
          onSent={() => {
            setOpenDialog(false)

            if (props.onSent) {
              props.onSent()
            }
          }}
        />
      </Dialog>
    </>
  )
}
