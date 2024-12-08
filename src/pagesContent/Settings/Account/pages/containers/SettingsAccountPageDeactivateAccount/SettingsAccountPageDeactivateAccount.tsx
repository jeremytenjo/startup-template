import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Alert from '@useweb/ui/Alert'
import ActionBox from '@useweb/ui/ActionBox'
import ConfirmationButton from '@useweb/ui/ConfirmationButton'
import { deleteUser } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'

import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import useAuth from '../../../../../../data/users/utils/useAuth/useAuth.js'
import { db } from '../../../../../../lib/integrations/Google/Firebase/firebase.js'
import { usersCollectionName } from '../../../../../../data/users/users.config.js'

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
            data-id='Name'
            fn={{
              fn: async () => {
                // delete auth
                if (!auth.auth.currentUser) {
                  throw new Error('auth.auth.currentUser is undefined')
                }
                await deleteUser(auth.auth.currentUser)

                // delete user doc
                await deleteDoc(doc(db, usersCollectionName, auth.auth.currentUser.uid))
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
