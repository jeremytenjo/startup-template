import assert from '@useweb/assert'

import clarity from '../../clarity.js'

const isProduction = process.env.NODE_ENV === 'production'

export type ClarityErrorProps = {
  functionName: string
  errorMessage: string
  fatal?: boolean
}

export default async function clarityError(props: ClarityErrorProps) {
  assert({ props, requiredProps: ['functionName', 'errorMessage'] })

  if (isProduction) {
    clarity({
      eventName: 'error',
      data: [
        `Function Name: ${props.functionName}`,
        `Description: ${props.errorMessage}`,
        `Fatal: ${props.fatal}`,
      ],
    })
  }
}

export type ClarityErrorReturn = ReturnType<typeof clarityError>
