import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Alert from '@useweb/ui/Alert'
import ActionBox from '@useweb/ui/ActionBox'
import ConfirmationButton from '@useweb/ui/ConfirmationButton'

import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import useAuth from '../../../../../../data/users/utils/useAuth/useAuth.js'
import miscFunctionsClient from '../../../../../../../firebaseFunctions/src/miscFunctions/miscFunctions.client.js'
import type { API_DeactivateAccountProps } from '../../../../../../../firebaseFunctions/src/miscFunctions/routes/deactivateAccount/deactivateAccount.js'

export default function SettingsAccountPageDeactivateAccount() {
  const auth = useAuth()

  return (
    <ActionBox
      data-id='SettingsAccountPageDeactivateAccount'
      headerProps={{
        title: 'Deactivate Account',
        subTitle:
          'Deactivating your account will disable your account and remove your profile from the platform.',
      }}
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
              },
              onError({ error }) {
                logError({
                  error,
                  fnName: 'SettingsAccountPageDeactivateAccount',
                  metadata: {},
                })
              },
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
