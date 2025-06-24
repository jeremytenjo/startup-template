const keyName = 'recentlyLoggedIn'

export const getRecentlyLoggedInSessionStorage = () => {
  return sessionStorage.getItem(keyName)
}

export const setRecentlyLoggedInSessionStorage = () => {
  return sessionStorage.setItem(keyName, 'true')
}
