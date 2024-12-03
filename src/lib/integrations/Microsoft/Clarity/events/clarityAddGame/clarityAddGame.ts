import assert from '@useweb/assert'

import clarity from '../../clarity.js'

const isProduction = process.env.NODE_ENV === 'production'

export type ClarityAddGameProps = { name: string }

export default async function clarityAddGame(props: ClarityAddGameProps) {
  assert({ props })

  if (isProduction) {
    clarity({
      eventName: 'addGame',
      data: [`Game Name: ${props.name}`],
    })
  }
}

export type ClarityAddGameReturn = ReturnType<typeof clarityAddGame>
