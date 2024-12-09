import React from 'react'
import Text from '@useweb/ui/Text'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import ActionBox from '@useweb/ui/ActionBox'
import ConfirmationButton from '@useweb/ui/ConfirmationButton'

import useAuth from '../../../../../../../../../../../../src/data/users/utils/useAuth/useAuth.js'
import CantDeleteStripeAccountAlert from '../../../../../../../../../../../../src/lib/integrations/Stripe/ui/CantDeleteStripeAccountAlert/CantDeleteStripeAccountAlert.js'
import useMiscFunctionsPersist from '../../../../../../../../../utils/useMiscFunctionsPersist/useMiscFunctionsPersist.js'
import type { API_GetStripeBalanceProps } from '../../../../../../../getStripeBalance/getStripeBalance.js'
import type { API_DeleteStripeAccountProps } from '../../../../../../../deleteStripeAccount/deleteStripeAccount.js'
import { useMiscFunctionsClient } from '../../../../../../../../../utils/useMiscFunctionsClient/useMiscFunctionsClient'

export default function DeleteStripeAccountCard() {
  const auth = useAuth()

  // TODO fix useMiscFunctionsClient and useMiscFunctions name convention
  const deleteStripeAccount = useMiscFunctionsClient<API_DeleteStripeAccountProps>({
    api: {
      route: 'routes/deleteStripeAccount',
      payload: {
        connectedAccountId: auth.user?.stripeConnectedAccountId || '',
      },
    },
  })

  const stripeBalance = useMiscFunctionsPersist<API_GetStripeBalanceProps>({
    currentUser: auth.user,
    id: auth.user?.stripeConnectedAccountId || undefined,
    api: {
      route: 'routes/getStripeBalance',
      payload: {
        connectedAccountId: auth.user?.stripeConnectedAccountId || '',
      },
    },
  })

  const availableBalance = stripeBalance.get.firstItem?.[0]?.balance.available?.[0]
  const pendingBalance = stripeBalance.get.firstItem?.[0]?.balance.pending?.[0]
  const hasBalance =
    !stripeBalance.get.fetching &&
    (availableBalance?.amount !== 0 || pendingBalance?.amount !== 0)

  if (deleteStripeAccount.error || stripeBalance.get.error) {
    return (
      <ErrorMessage
        error={deleteStripeAccount.error || stripeBalance.get.error}
        message='Error loading, please refresh and try again.'
      />
    )
  }

  return (
    <ActionBox
      data-id='DeleteStripeAccountCard'
      headerProps={{
        title: 'Delete Stripe Account',
      }}
      singleCTA
      ctas={
        <>
          <ConfirmationButton
            fn={{
              fn: deleteStripeAccount.exec,
            }}
            triggerButtonProps={{
              name: 'DeleteStripeAccountCard',
              label: 'Delete Stripe Account',
              loading: stripeBalance.get.fetching || deleteStripeAccount.loading,
              disabled: hasBalance || deleteStripeAccount.loading,
            }}
            acceptButtonProps={{
              acceptText: 'Delete Stripe Account',
            }}
            dialogProps={{
              title: 'Delete Stripe Account',
              children: (
                <>
                  <Text
                    text={`You will not be able to receive money if you delete your account. Are you sure you want to delete your account?`}
                    tag='p'
                    sx={{}}
                  />
                </>
              ),
            }}
          />
        </>
      }
      sx={{}}
    >
      <Text
        text={`You will not be able to accept offers if you delete your account.`}
        variant='body3'
        tag='p'
        sx={{
          color: 'neutral.100',
        }}
      />

      {hasBalance && (
        <CantDeleteStripeAccountAlert
          availableBalanceCents={availableBalance}
          pendingBalanceCents={pendingBalance}
          sx={{
            mt: 2,
          }}
        />
      )}
    </ActionBox>
  )
}
