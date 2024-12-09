import React from 'react'
import Box from '@useweb/ui/Box'

import BillingStripeAccountPageLayout from '../layouts/BillingStripeAccountPageLayout/BillingStripeAccountPageLayout.js'
import CreateConnectedAccountCard from '../../../../../../../../firebaseFunctions/src/miscFunctions/routes/stripe/createConnectedAccount/ui/CreateConnectedAccountCard/CreateConnectedAccountCard.js'
import useAuth from '../../../../../../../data/users/utils/useAuth/useAuth.js'

export default function BillingStripeAccountPage() {
  const auth = useAuth()

  return (
    <BillingStripeAccountPageLayout>
      <Box data-id='BillingStripeAccountPage' sx={{}}>
        <CreateConnectedAccountCard
          createStripeAccountSubTitle='Create a Stripe account to receive payments.'
          userToCreateAccount={auth.user}
        />
      </Box>
    </BillingStripeAccountPageLayout>
  )
}
