import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  // firebase entry
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `${fileName}.firebase.ts`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import type { Response } from 'express'
import type { Request } from 'firebase-functions/v2/https'

import logFirebaseCloudFunctionError from '../utils/logFirebaseCloudFunctionError/logFirebaseCloudFunctionError.js'

import ${nameCamelCase} from './${nameCamelCase}.js'

export type ${namePascalCase}FirebaseProps = {
  req: Request
  res: Response
}

export default async function ${nameCamelCase}Firebase(
  props: ${namePascalCase}FirebaseProps,
) {
  props.res.set('Access-Control-Allow-Origin', '*')

  try {
    let payload = {} as any

    try {
      payload = JSON.parse(props.req.body)
    } catch (e) {
      payload = props.req.body
    }

    const data = await ${nameCamelCase}(payload)

    props.res.status(200).json({ data, error: undefined })
  } catch (error: any) {
    logFirebaseCloudFunctionError({
      fnName: '${nameCamelCase}',
      description: error,
      metadata: error?.cause,
    })

    props.res.status(500).json({
      error: error.toString(),
    })
  }
}
`
    },
  },

  // index
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `${fileName}.ts`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `
      import * as gameListingsSupabaseWebhookFirebaseHttpFunction from '../../../src/data/gameListings/webhooks/gameListingsSupabaseWebhook/consumers/firebaseHttpFunction/gameListingsSupabaseWebhook.firebaseHttpFunction.js'

export type ${namePascalCase}Props = {
  route: string
  payload: any
}

export default async function ${nameCamelCase}(
  props: ${namePascalCase}Props,
) {
  if (props.route === gameListingsSupabaseWebhookFirebaseHttpFunction.routeId) {
    try {
      return await gameListingsSupabaseWebhookFirebaseHttpFunction.default({
        payload: props.payload,
      })
       } catch (error: any) {
         throw new Error(${'`'}$${'{'}gameListingsSupabaseWebhookFirebaseHttpFunction.routeId} - ${'${error}`'}, {
           cause: error?.cause,
         })
       }
  }

  throw new Error(${'`'}Route doesn't exist - ${'${props.route}`'}), {
    cause: {
      props,
    },
  })
}

export type ${namePascalCase}Return = any
`
    },
  },

  // client
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `${fileName}.client.ts`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import { googleCloudFunction } from '@useweb/firebase/useFirebaseFunction'
import firebaseConfig from '@/src/lib/integrations/Google/Firebase/firebase.config'

import type {
  ${namePascalCase}Props,
  ${namePascalCase}Return,
} from './${nameCamelCase}.js'

export default async function ${nameCamelCase}Client(
  props: ${namePascalCase}Props,
) {
  const res = await googleCloudFunction<
    ${namePascalCase}Props,
    {
      data: ${namePascalCase}Return
    }
  >({
    name: '${nameCamelCase}',
    firebase: {
      firebaseConfig: firebaseConfig,
      envIsDev: process.env.NODE_ENV === 'development',
    },
    options: {
      payload: props,
    },
  })

  return res
}
`
    },
  },
]

const firebaseHttpFunctionEntry: SuperCodeGeneratorTemplateSchema = {
  type: 'Firebase HTTP Function - Entry',
  files,
}

export default firebaseHttpFunctionEntry
