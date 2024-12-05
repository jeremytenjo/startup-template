import React from 'react'
import Head from 'next/head'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import appConfig from '../../../../app.config.js'
import getFirestoreUserWithRestApi from '../../../data/users/queries/getFirestoreUserWithRestApi/getFirestoreUserWithRestApi.js'
import type { FirestoreRestApiGetUserResSchemaSchema } from '../../../data/users/queries/getFirestoreUserWithRestApi/FirestoreRestApiGetUserResSchemaSchema/FirestoreRestApiGetUserResSchema.schema.js'
import UserPage from '../../../pagesContent/User/pages/UserPage.js'

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{
  props: {
    user: FirestoreRestApiGetUserResSchemaSchema['0'] | null
  }
}> {
  if (process?.env?.NODE_ENV !== 'production') {
    return {
      props: {
        user: null,
      },
    }
  }

  const displayName = context.params?.displayName as string | undefined

  if (!displayName) {
    return {
      props: {
        user: null,
      },
    }
  }

  let user = {} as FirestoreRestApiGetUserResSchemaSchema['0'] | null

  try {
    const fetchedUserRes = await getFirestoreUserWithRestApi({
      username: displayName,
    })

    user = fetchedUserRes.user || null
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      user,
    },
  }
}

export default function UserPublicPageIndex(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const userUrl = props.user?.document?.fields?.displayName?.stringValue
    ? `${appConfig.siteInfo.domain}/creator/${props.user?.document?.fields?.displayName?.stringValue}`
    : ''
  const title = `${props.user?.document?.fields?.displayName?.stringValue} | ${appConfig.siteInfo.title}`
  const description = props.user?.document?.fields?.bio?.stringValue || 'No Bio'
  const userPhoto = props.user?.document?.fields?.photoURL?.stringValue || ''

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='title' content={title} />
        <meta property='og:title' content={title} />
        <meta property='twitter:title' content={title} />

        <meta name='description' content={description} />
        <meta property='og:description' content={description} />
        <meta property='twitter:description' content={description} />

        <meta property='og:image' content={userPhoto} />
        <meta property='twitter:image' content={userPhoto} />

        <meta property='og:image:alt' content={title} />

        <meta property='twitter:card' content='summary' />
        <meta property='twitter:site' content={appConfig.siteInfo.title} />

        <meta property='og:type' content='website' />

        <meta property='og:url' content={userUrl} />
        <link rel='canonical' href={userUrl} />
      </Head>

      <UserPage />
    </>
  )
}
