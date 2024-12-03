export const tiktokApiConfig = {
  redirectUri:
    'https://us-central1-startup-template-main.cloudfunctions.net/tiktokAuthRedirectUri',
  clientKey: () => {
    if (!process.env.TIKTOK_CLIENT_KEY) {
      throw new Error('TIKTOK_CLIENT_KEY is undefined')
    }

    return process.env.TIKTOK_CLIENT_KEY
  },
  clientSecret: () => {
    if (!process.env.TIKTOK_CLIENT_SECRET) {
      throw new Error('TIKTOK_CLIENT_SECRET is undefined')
    }

    return process.env.TIKTOK_CLIENT_SECRET
  },
}
