export default async function getRobloxGetXcsrfToken() {
  // This will never actually sign you out because an X-CSRF-TOKEN isn't provided, only received. REQUIRES https.
  const res = await fetch('https://auth.roblox.com/v2/logout', {
    method: 'POST',
    headers: {
      cookie: `.ROBLOSECURITY=${process.env.ROBLOX_API_TOKEN};`,
    },
  })

  const xcsrfToken = res.headers.get('x-csrf-token')

  if (xcsrfToken) {
    return { xcsrfToken }
  } else {
    throw new Error('Did not receive X-CSRF-TOKEN', {
      cause: {
        headers: res.headers.entries(),
        xcsrfToken,
      },
    })
  }
}

export type GetRobloxGetXcsrfTokenReturn = ReturnType<typeof getRobloxGetXcsrfToken>
