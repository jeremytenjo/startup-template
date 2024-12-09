import React from 'react'
import Text from '@useweb/ui/Text'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import ActionBox from '@useweb/ui/ActionBox'
import ConfirmationButton from '@useweb/ui/ConfirmationButton'

import useDeleteStripeAccount from '../../../../../../../deleteStripeAccount/utils/useDeleteStripeAccount/useDeleteStripeAccount.js'
import useAuth from '../../../../../../../../../data/users/utils/useAuth/useAuth.js'
import useStripeBalance from '../../../../../../../getStripeBalance/utils/useStripeBalance/useStripeBalance.js'
import CantDeleteStripeAccountAlert from '../../../../../../../../../lib/integrations/Stripe/ui/CantDeleteStripeAccountAlert/CantDeleteStripeAccountAlert.js'

export default function DeleteStripeAccountCard() {
  // use hooks to get data
  const data = 'DeleteStripeAccountCard'

  return <DeleteStripeAccountCardUi data={data} loading={false} error={false} />
}

export type DeleteStripeAccountCardUiProps = {
  data: any
  loading: boolean
  error: any
}

export function DeleteStripeAccountCardUi(props: DeleteStripeAccountCardUiProps) {
  const auth = useAuth()

  const deleteStripeAccount = useDeleteStripeAccount({
    user: auth.user,
  })
  const stripeBalance = useStripeBalance({
    connectedAccountId: auth.user?.stripeConnectedAccountId || undefined,
  })
  const availableBalance = stripeBalance.get.firstItem?.balance.available?.[0]
  const pendingBalance = stripeBalance.get.firstItem?.balance.pending?.[0]
  const hasBalance =
    !stripeBalance.get.fetching &&
    (availableBalance?.amount !== 0 || pendingBalance?.amount !== 0)

  if (deleteStripeAccount.error || stripeBalance.get.error) {
    return (
      <ErrorMessage
        error={props.error}
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
                    text={
                      auth.user?.accountType === 'developer'
                        ? `You will not be able to accept advertisement offers if you delete your stripe account. Are you sure you want to delete your account?`
                        : `You won't be able to accept sponsorships if you delete your account. Are you sure you want to delete your account?`
                    }
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
        text={
          auth.user?.accountType === 'developer'
            ? `You will not be able to accept advertisement offers if you delete your stripe account.`
            : `You won't be able to accept sponsorships if you delete your account.`
        }
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
