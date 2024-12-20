import React from 'react'
import Form from '@useweb/ui/Form'
import Text from '@useweb/ui/Text'
import Link from '@useweb/ui/Link'

import type {
  SignUpFormEmailPasswordDataSchema,
  SignUpFormGoogleDataSchema,
} from '../../../../utils/useAuth/useAuth.js'
import useAuth from '../../../../utils/useAuth/useAuth.js'
import useOnSignUpActions from '../../../../utils/signUp/useOnSignUpActions/useOnSignUpActions.js'
import { Island } from '../../../../../../theme/UiTheme/commonStyles/islandStyles.js'
import { navLinks } from '../../../../../navLinks/utils/useNavLinks/useNavLinks.js'

import UserAccessCardSignUpExistingUser from './containers/UserAccessCardSignUpExistingUser/UserAccessCardSignUpExistingUser.js'
import UserAccessCardSignUpLastStep from './containers/UserAccessCardSignUpLastStep/UserAccessCardSignUpLastStep.js'
import UserAccessCardSignUpErrorMessage from './containers/UserAccessCardSignUpErrorMessage/UserAccessCardSignUpErrorMessage.js'
import UserAccessCardSignUpAknowledgmentAcknowledgment from './containers/UserAccessCardSignUpAknowledgmentAcknowledgment/UserAccessCardSignUpAknowledgmentAcknowledgment.js'

export type UserAccessCardSignUpProps = {
  onSignUp?: () => void
}

export type UserAccessCardSignUpFormSchema = SignUpFormEmailPasswordDataSchema &
  SignUpFormGoogleDataSchema

export default function UserAccessCardSignUp(props: UserAccessCardSignUpProps) {
  const onSignUpAction = useOnSignUpActions()
  const auth = useAuth({
    onSignUp: () => {
      onSignUpAction.onSignUp()

      if (props.onSignUp) {
        props.onSignUp()
      }
    },
  })

  return (
    <>
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
        {!auth.user?.id && (
          <>
            <UserAccessCardSignUpLastStep auth={auth} />
          </>
        )}
        <UserAccessCardSignUpErrorMessage auth={auth} />
        <UserAccessCardSignUpAknowledgmentAcknowledgment />
      </Form>

      <Island
        sx={{
          mt: '50px',
          textAlign: 'center',
          backgroundColor: 'neutral.400',
        }}
      >
        <Text text={`Already have an account? `} tag='span' sx={{}} />
        <Link href={navLinks.access.signIn.url}>
          <Text
            text={`Sign in`}
            tag='span'
            sx={{
              fontWeight: 600,
            }}
          />
        </Link>
      </Island>
    </>
  )
}
