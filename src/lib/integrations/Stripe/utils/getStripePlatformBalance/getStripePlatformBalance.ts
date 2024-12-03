import getStripe from '../getStripe/getStripe.js'

export default async function getStripePlatformBalance() {
  const { stripe } = getStripe()
  const platformBalanceRes = await stripe.balance.retrieve()

  const platformAvailableBalance = platformBalanceRes.available?.find(
    (a) => a.currency === 'usd',
  )?.amount

  if (!platformAvailableBalance) {
    throw new Error('No available USD balance found in platform balance response', {
      cause: {
        platformBalanceRes,
      },
    })
  }

  return { platformAvailableBalance, platformBalanceRes }
}

export type GetStripePlatformBalanceReturn = ReturnType<typeof getStripePlatformBalance>
