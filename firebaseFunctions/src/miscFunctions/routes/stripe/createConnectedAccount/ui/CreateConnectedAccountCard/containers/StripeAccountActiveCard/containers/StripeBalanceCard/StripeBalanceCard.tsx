import React from 'react'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import ActionBox from '@useweb/ui/ActionBox'
import Button from '@useweb/ui/Button'
import Box from '@useweb/ui/Box'
import Link from '@useweb/ui/Link'
import Text from '@useweb/ui/Text'

import StripeBalanceItem from '../../../../../../../../../../../../src/lib/integrations/Stripe/ui/StripeBalanceItem/StripeBalanceItem.js'
import AvailableBalanceIcon from '../../../../../../../../../../../../src/lib/components/icons/AvailableBalanceIcon.js'
import PendingBalanceIcon from '../../../../../../../../../../../../src/lib/components/icons/PendingBalanceIcon.js'
import StripeIcon from '../../../../../../../../../../../../src/lib/components/icons/StripeIcon.js'
import useGetStripeBalance from '../../../../../../../getStripeBalance/useGetStripeBalance/useGetStripeBalance'
import useGetStripeConnectedAccountDashboardLink from '../../../../../../../getStripeConnectedAccountDashboardLink/useGetStripeConnectedAccountDashboardLink/useGetStripeConnectedAccountDashboardLink'

export default function StripeBalanceCard() {
  const stripeBalance = useGetStripeBalance()
  const stripeAccountDashboardLink = useGetStripeConnectedAccountDashboardLink()

  const error = stripeBalance.get.error || stripeAccountDashboardLink.get.error
  const loading = Boolean(
    stripeBalance.get.fetching || stripeAccountDashboardLink.get.fetching,
  )

  if (error) {
    return (
      <ErrorMessage
        error={error}
        message='Error loading your balance, please refresh and try again.'
      />
    )
  }

  return (
    <ActionBox
      data-id='StripeBalanceCard'
      headerProps={{
        title: 'Balance',
        subTitle:
          'Your current balance. Funds are automatically transferred to your bank account every 7 days.',
      }}
      title='Withdraw funds and view transaction history in your Stripe account.'
      singleCTA
      ctas={
        <>
          <Link
            href={
              stripeAccountDashboardLink.get?.firstItem?.[0]?.dashboardLink?.url || ''
            }
            newTab
          >
            <Button
              name='Save'
              type='submit'
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
              disabled={
                !stripeAccountDashboardLink.get?.firstItem?.[0]?.dashboardLink?.url
              }
              loading={loading}
              variant='white'
            >
              <StripeIcon
                sx={{
                  width: '20px',
                  mr: '8px',
                }}
              />
              <Text
                text={`Go to Stripe Account`}
                tag='p'
                sx={{
                  fontWeight: '600',
                }}
              />
            </Button>
          </Link>
        </>
      }
    >
      <Box
        data-id='Wrapper'
        sx={{
          display: 'grid',
          gap: 2,
          gridAutoFlow: [, 'column'],
          width: 'fit-content',
        }}
      >
        <StripeBalanceItem
          title='Available Balance'
          icon={<AvailableBalanceIcon />}
          amountCents={
            stripeBalance.get.firstItem?.[0]?.balance?.available?.[0]?.amount || 0
          }
          currency={
            stripeBalance.get.firstItem?.[0]?.balance?.available?.[0]?.currency || ''
          }
          disclaimer='Funds that are available to be transferred or paid out immediately.'
        />
        <StripeBalanceItem
          title='Pending Balance'
          icon={<PendingBalanceIcon />}
          amountCents={
            stripeBalance.get.firstItem?.[0]?.balance?.pending?.[0]?.amount || 0
          }
          currency={
            stripeBalance.get.firstItem?.[0]?.balance?.pending?.[0]?.currency || ''
          }
          disclaimer='Funds that are not yet available to be transferred or paid out.'
        />
      </Box>
    </ActionBox>
  )
}
