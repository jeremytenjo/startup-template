import React from 'react'
import Box from '@useweb/ui/Box'
import Alert from '@useweb/ui/Alert'
import Button from '@useweb/ui/Button'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import Skeleton from '@useweb/ui/Skeleton'
import ActionBox from '@useweb/ui/ActionBox'

import type UserSchema from '../../../../../../../../src/data/users/user.schema.js'
import useAuth from '../../../../../../../../src/data/users/utils/useAuth/useAuth.js'
import PageTitleHeading from '../../../../../../../../src/lib/layouts/PageTitleHeading/PageTitleHeading.js'
import StripeIcon from '../../../../../../../../src/lib/components/icons/StripeIcon.js'
import { islandStyles } from '../../../../../../../../src/theme/UiTheme/commonStyles/islandStyles.js'
import useCreateStripeConnectedAccount from '../../useCreateStripeConnectedAccount/useCreateStripeConnectedAccount.js'
import useGetConnectedAccount from '../../../getConnectedAccount/useGetConnectedAccount/useGetConnectedAccount.js'
import useFinishCreatingConnectedAccount from '../../../finishCreatingConnectedAccount/useFinishCreatingConnectedAccount/useFinishCreatingConnectedAccount.js'

import DeleteStripeAccountCard from './containers/StripeAccountActiveCard/containers/DeleteStripeAccountCard/DeleteStripeAccountCard.js'
import StripeAccountActiveCard from './containers/StripeAccountActiveCard/StripeAccountActiveCard.js'

export type CreateConnectedAccountCardProps = {
  userToCreateAccount: UserSchema
  createStripeAccountSubTitle: string
}

export default function CreateConnectedAccountCard(
  props: CreateConnectedAccountCardProps,
) {
  const auth = useAuth()
  const createConnectedAccount = useCreateStripeConnectedAccount({
    userToCreateAccount: props.userToCreateAccount,
  })
  const connectedAccount = useGetConnectedAccount()
  const finishCreatingConnectedAccount = useFinishCreatingConnectedAccount({
    userToCreateAccount: props.userToCreateAccount,
  })

  if (connectedAccount.get.error) {
    return (
      <ErrorMessage
        error={connectedAccount.get.error}
        message='Error loading Stripe account'
      />
    )
  }

  return (
    <Box data-id='CreateConnectedAccountCard' id='CreateConnectedAccountCard' sx={{}}>
      <PageTitleHeading
        title='Stripe Account'
        titleIconPrefix={
          <StripeIcon
            sx={{
              width: '20px',
            }}
          />
        }
        subTitle='Social Seed uses Stripe to get you paid quickly and keep your personal and payment information secure. Thousands of companies around the world trust Stripe to process payments for their users. Set up a Stripe account to get paid with Social Seed.'
        size={2}
        sx={{ mb: 4 }}
      />
      <Skeleton
        loading={!auth.user?.id || connectedAccount.get.fetching}
        count={4}
        wrapperSx={{
          ...islandStyles,
        }}
      >
        {!auth.user?.stripeConnectedAccountId ? (
          <ActionBox
            data-id='NoConnectedAccountId'
            headerProps={{
              title: 'Create Stripe Account',
              subTitle: props.createStripeAccountSubTitle,
            }}
            singleCTA
            ctas={
              <>
                <Button
                  name='Create Stripe Account'
                  onClick={() => {
                    createConnectedAccount.exec()
                  }}
                  sx={{
                    width: ['100%', 'fit-content'],
                  }}
                  loading={createConnectedAccount.loading}
                  disabled={!props.userToCreateAccount?.id}
                  variant='white'
                >
                  <StripeIcon
                    sx={{
                      width: '20px',
                      mr: '8px',
                    }}
                  />
                  Create a Stripe Account
                </Button>
              </>
            }
            sx={{}}
          >
            <ErrorMessage
              error={createConnectedAccount.error}
              message='Error creating Stripe account'
            />
          </ActionBox>
        ) : (
          <Box data-id='HasConnectedAccount' sx={{}}>
            {connectedAccount.get.firstItem?.[0]?.connectedAccount.details_submitted ? (
              <StripeAccountActiveCard />
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gap: 5,
                }}
              >
                <ActionBox
                  data-id='MissingDetails'
                  headerProps={{
                    title: 'Create Stripe Account',
                    subTitle: props.createStripeAccountSubTitle,
                  }}
                  singleCTA
                  ctas={
                    <>
                      <Button
                        name='CompleteConnectedAccount'
                        sx={{
                          width: ['100%', 'fit-content'],
                        }}
                        loading={finishCreatingConnectedAccount.loading}
                        onClick={() => {
                          finishCreatingConnectedAccount.exec()
                        }}
                        variant='white'
                      >
                        <StripeIcon
                          sx={{
                            width: '20px',
                            mr: '8px',
                          }}
                        />
                        Finish Creating Stripe Account
                      </Button>
                    </>
                  }
                  sx={{}}
                  childrenSx={{
                    display: 'grid',
                    gap: 2,
                  }}
                >
                  <Alert severity='warning' sx={{}}>
                    Misssing details, please complete your Stripe account
                  </Alert>

                  <ErrorMessage
                    error={finishCreatingConnectedAccount.error}
                    message='Error finishing Stripe account'
                  />
                </ActionBox>

                <DeleteStripeAccountCard />
              </Box>
            )}
          </Box>
        )}
      </Skeleton>
    </Box>
  )
}
