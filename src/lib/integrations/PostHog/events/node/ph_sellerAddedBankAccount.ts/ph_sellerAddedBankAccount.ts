import assert from '@useweb/assert'

import nodePostHog from '../../../nodePostHog/nodePostHog.js'
import type UserSchema from '../../../../../../data/users/user.schema.js'

export type PH_SellerAddedBankAccountProps = {
  source: 'stripe'
  user: UserSchema
}

export default function ph_sellerAddedBankAccount(props: PH_SellerAddedBankAccountProps) {
  assert<PH_SellerAddedBankAccountProps>({
    props,
    requiredProps: ['source', 'user'],
  })

  nodePostHog({
    eventName: 'seller_added_bank_account',
    data: {
      source: props.source,
      metadata: {
        ...props,
      },
    },
  })
}

export type PH_SellerAddedBankAccountReturn = ReturnType<typeof ph_sellerAddedBankAccount>
