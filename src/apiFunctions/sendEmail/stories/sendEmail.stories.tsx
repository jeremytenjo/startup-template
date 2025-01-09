import React from 'react'
import AsyncTester from '@useweb/async-tester'

import sendEmail, { type SendEmailProps } from '../sendEmail.client.js'

const args: SendEmailProps = {
  to: ['thebloxmarketwebmaster@gmail.com'],
  from: 'testing',
  subject: 'Subject',
  template: {
    props: {
      title: 'name',
      receiverName: 'Cole Tucker',
      body: 'body',
      ctas: [
        {
          href: 'href',
          label: 'label',
        },
      ],
    },
  },
}

export default {
  title: 'Cloud Functions/next/sendEmail',
  args,
  parameters: {
    signInAs: false,
  },
}

const fetcher = async (args: SendEmailProps) => {
  const data = await sendEmail(args)

  return data
}

export const Test = (args: SendEmailProps) => {
  return (
    <AsyncTester<
      any,
      {
        payload: SendEmailProps
      }
    >
      // if using triggerComponent change to async(fnArgs)=> fetcher(fnArgs)
      fn={async () => fetcher(args)}
      autoExec
    />
  )
}

// Commnet out email not send in dev message in sendEmail.raw.ts
export const FromServer = (args: SendEmailProps) => {
  return (
    <AsyncTester<
      any,
      {
        payload: SendEmailProps
      }
    >
      // if using triggerComponent change to async(fnArgs)=> fetcher(fnArgs)
      fn={async () => {
        return await sendEmail({
          ...args,
          nextApiProps: {
            forceProduction: true,
            fetchFn: fetch,
            isExternalCall: true,
          },
        })
      }}
      autoExec
    />
  )
}
