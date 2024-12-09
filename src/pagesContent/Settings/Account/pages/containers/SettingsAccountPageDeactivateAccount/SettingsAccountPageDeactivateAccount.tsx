import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Alert from '@useweb/ui/Alert'
import ActionBox from '@useweb/ui/ActionBox'
import ConfirmationButton from '@useweb/ui/ConfirmationButton'
import useSnackbar from '@useweb/ui/Snackbar'
import { useRouter } from 'next/router'

import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import useAuth from '../../../../../../data/users/utils/useAuth/useAuth.js'
import miscFunctionsClient from '../../../../../../../firebaseFunctions/src/miscFunctions/miscFunctions.client.js'
import type { API_DeactivateAccountProps } from '../../../../../../../firebaseFunctions/src/miscFunctions/routes/users/deactivateAccount/deactivateAccount.js'

export default function SettingsAccountPageDeactivateAccount() {
  const auth = useAuth()
  const snackbar = useSnackbar()
  const router = useRouter()

  return (
    <ActionBox
      data-id='SettingsAccountPageDeactivateAccount'
      headerProps={{
        title: 'Deactivate Account',
        subTitle:
          'Deactivating your account will disable your account and remove your profile from the platform.',
      }}
      singleCTA
      ctas={
        <>
          <ConfirmationButton<any, any>
            data-id='SettingsAccountPageDeactivateAccountConfirmationButton'
            fn={{
              fn: async () => {
                await miscFunctionsClient<API_DeactivateAccountProps>({
                  api: {
                    route: 'routes/deactivateAccount',
                    payload: {
                      uid: auth.user.id,
                    },
                  },
                })

                snackbar.show({
                  message: 'Sorry to see you go.',
                })

                auth.signOut()

                router.push('/')
              },
              onError({ error }) {
                logError({
                  error,
                  fnName: 'SettingsAccountPageDeactivateAccount',
                  metadata: {},
                })
              },
            }}
            customErrorComponent={(p) => {
              let errorMessage = 'Error deactivating account. Please try again.'

              if (String(p.error).includes('requires-recent-login')) {
                errorMessage =
                  'Please sign out and sign in again to deactivate your account.'
              }

              return (
                <Alert
                  severity='warning'
                  sx={{
                    mt: 3,
                  }}
                >
                  <Text text={errorMessage} tag='p' sx={{}} />
                </Alert>
              )
            }}
            triggerButtonProps={{
              name: 'Deactivate',
              label: 'Deactivate',
            }}
            acceptButtonProps={{
              acceptText: 'Deactivate',
            }}
            dialogProps={{
              title: 'Deactivate',
              children: (
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                  }}
                >
                  <Text
                    text={`Are you sure you want to deactivate your account?`}
                    tag='p'
                    sx={{}}
                  />
                  <Alert severity='error'>
                    <Text
                      text={`Warning: This action is not reversible. Please be certain.`}
                      tag='p'
                      sx={{}}
                    />
                  </Alert>
                </Box>
              ),
            }}
          />
        </>
      }
      sx={{}}
    >
      {null}
    </ActionBox>
  )
}
