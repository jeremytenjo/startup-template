import assert from '@useweb/assert'
import { updateUserData } from '@useweb/firebase/useFirebaseAuth'
import requestGoogleAccountAccessToken from '@useweb/google-identity-service'

import type UserSchema from '../../../../../data/users/user.schema.js'
import logError from '../../../../utils/loggers/logError/logError.js'
import getBasicYoutubeChannelData from '../utils/getYoutubeChannelData/utils/getBasicYoutubeChannelData/getBasicYoutubeChannelData.js'

import getIsUserVerified from './utils/getIsUserVerified/getIsUserVerified.js'

export const youtubeScopes = [
  'https://www.googleapis.com/auth/yt-analytics.readonly',
  'https://www.googleapis.com/auth/youtube.readonly',
]

export type VerifyYoutubeAccountProps = { user: UserSchema }

export default async function verifyYoutubeAccount(props: VerifyYoutubeAccountProps) {
  assert({ props })

  if (!props.user) {
    throw new Error('user is not signed in')
  }

  // 1. get access woken with google idenitty service
  let userGoogleAccount: any = undefined

  try {
    userGoogleAccount = await requestGoogleAccountAccessToken({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      scopes: youtubeScopes,
    })
  } catch (signinWithGooglePopupError: any) {
    if (signinWithGooglePopupError === 'Popup window closed') {
      return null
    } else {
      throw new Error(signinWithGooglePopupError)
    }
  }

  // 2. check if scopes where accpeted
  const grantedYoutubeApisAccess = userGoogleAccount?.tokenResponse
  const grantedScopes = grantedYoutubeApisAccess?.scope?.split(' ') || ''
  const grantedYoutubeAnalyticsAccess = grantedScopes.includes(youtubeScopes[0])
  const grantedYoutubeDataAccess = grantedScopes.includes(youtubeScopes[1])

  // 3. if false, show message feification failed.
  if (
    !grantedYoutubeApisAccess ||
    !grantedYoutubeAnalyticsAccess ||
    !grantedYoutubeDataAccess
  ) {
    throw new Error('Please grant access to your basic Youtube data to continue.')
  }

  // 4. if yes udpate user pulibc data, veriffed creator, youtube bassic data,
  const googleAccessToken = userGoogleAccount?.tokenResponse?.access_token

  if (googleAccessToken) {
    const basicYoutubedata = await getBasicYoutubeChannelData({
      googleAccessToken,
    })

    if (basicYoutubedata?.username) {
      // chech that other user has not already claimed this channel
      const { isUserVerified } = await getIsUserVerified({
        youtubeUsername: basicYoutubedata.username,
      })
      // throw error if user has already claimed this channel
      if (isUserVerified) {
        logError({
          error: 'This Youtube channel has already been claimed.',
          fnName: 'verifyYoutubeAccount',
          metadata: { props },
        })
        throw new Error('This Youtube channel has already been claimed.')
      }

      // Success!!
      await updateUserData({
        uid: props.user.id,
        updatedData: {
          displayName: basicYoutubedata.username,
        },
      })

      return basicYoutubedata
    } else {
      throw new Error('Youtube account not found.')
    }
  } else {
    throw new Error('getPrivateUserData did not return a google access token')
  }
}

export type VerifyYoutubeAccountReturn = ReturnType<typeof verifyYoutubeAccount>
