import React from 'react'
import Box from '@useweb/ui/Box'

import BillingStripeAccountPageLayout from '../layouts/BillingStripeAccountPageLayout/BillingStripeAccountPageLayout.js'
import CreateConnectedAccountCard from '../../../../../../../../firebaseFunctions/src/miscFunctions/routes/stripe/createConnectedAccount/ui/CreateConnectedAccountCard/CreateConnectedAccountCard.js'

export default function BillingStripeAccountPage() {
  return (
    <BillingStripeAccountPageLayout>
      <Box data-id='BillingStripeAccountPage' sx={{}}>
        <CreateConnectedAccountCard />
      </Box>
    </BillingStripeAccountPageLayout>
  )
}
