import assert from '@useweb/assert'

import firebaseConfig from '../../../../lib/integrations/Google/Firebase/firebase.config.js'
import { usersCollectionName } from '../../users.config.js'
import type UserSchema from '../../user.schema.js'

import type { FirestoreRestApiGetUserResSchemaSchema } from './FirestoreRestApiGetUserResSchemaSchema/FirestoreRestApiGetUserResSchema.schema.js'

export type GetFirestoreUserWithRestApiProps = { username: string }

export default async function getFirestoreUserWithRestApi(
  props: GetFirestoreUserWithRestApiProps,
) {
  assert<GetFirestoreUserWithRestApiProps>({ props, requiredProps: ['username'] })

  const data = (await fetch(
    `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents:runQuery`,
    {
      method: 'POST',
      body: JSON.stringify({
        // https://firebase.google.com/docs/firestore/reference/rest/v1/StructuredQuery
        structuredQuery: {
          from: [
            {
              collectionId: usersCollectionName,
            },
          ],
          where: {
            fieldFilter: {
              field: {
                fieldPath: 'displayName' satisfies keyof UserSchema,
              },
              op: 'EQUAL',
              value: {
                stringValue: props.username,
              },
            },
          },
          limit: 1,
        },
      }),
    },
  ).then((res) => res.json())) as FirestoreRestApiGetUserResSchemaSchema

  const [user] = data || []

  return { user }
}

export type GetFirestoreUserWithRestApiReturn = ReturnType<
  typeof getFirestoreUserWithRestApi
>
