import React from 'react'
import Form from '@useweb/ui/Form'

import useAuth from '../../../../utils/useAuth/useAuth.js'
import useOnSignUpActions from '../../../../utils/signUp/useOnSignUpActions/useOnSignUpActions.js'

import UserAccessCardSignUpExistingUser from './containers/UserAccessCardSignUpExistingUser/UserAccessCardSignUpExistingUser.js'
import UserAccessCardSignUpLastStep from './containers/UserAccessCardSignUpLastStep/UserAccessCardSignUpLastStep.js'
import UserAccessCardSignUpErrorMessage from './containers/UserAccessCardSignUpErrorMessage/UserAccessCardSignUpErrorMessage.js'

export type UserAccessCardSignUpProps = any

export type UserAccessCardSignUpFormSchema = {
  email: string
  password: string
  username: string
  photoUrl: string
}

export default function UserAccessCardSignUp() {
  const onSignUpAction = useOnSignUpActions()
  const auth = useAuth({
    onSignUp: () => {
      onSignUpAction.onSignUp()
    },
  })

  return (
    <Form<UserAccessCardSignUpFormSchema>
      data-id='UserAccessCardSignUpForm'
      sx={{
        display: 'grid',
        gap: 2,
        width: '100%',
      }}
      onSubmit={({ formValues: formProps }) => {
        auth.signUp.exec({
          emailPasswordData: {
            ...formProps,
          },
        })
      }}
    >
      {auth.user?.id && <UserAccessCardSignUpExistingUser />}
      {!auth.user?.id && <UserAccessCardSignUpLastStep auth={auth} />}

      <UserAccessCardSignUpErrorMessage auth={auth} />
    </Form>
  )
}
