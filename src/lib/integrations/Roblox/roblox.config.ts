export type RobloxAPITokenSchema =
  `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_${string}`

export const robloxConfig = {
  socialSeedRobloxGroup: '',
  socialSeedRobloxGroupID: undefined,
  // https://create.roblox.com/dashboard/credentials?activeTab=OAuthTab
  clientId: '',
  clientSecret: () => {
    const robloxClientSecret = process.env.ROBLOX_CLIENT_SECRET

    if (!robloxClientSecret) {
      throw new Error('process.env.ROBLOX_CLIENT_SECRET is undefined')
    }

    return {
      robloxClientSecret,
    }
  },
}
