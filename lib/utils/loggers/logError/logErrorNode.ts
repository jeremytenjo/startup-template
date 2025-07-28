import nodePhError from '../../../integrations/PostHog/events/node/nodePhError/nodePhError.js'

const isProd = process.env.NODE_ENV === 'production'

export type LogErrorNodeProps = {
  error: Error | string
  fnName: string
  fatal?: boolean
  metadata: any
  ignoreErrorIf?: (props: { e: string }) => {
    ignore: boolean
  }
  supressConsoleLogs?: boolean
}

export default function logErrorNode(props: LogErrorNodeProps) {
  const errorMessage =
    props.error instanceof Error ? String(props.error) : String(props.error)
  const cause = props.error as any

  if (
    props.ignoreErrorIf &&
    props.ignoreErrorIf({
      e: errorMessage,
    }).ignore
  ) {
    console.error(`ignored error - ${props.fnName} - `, errorMessage)
    return
  }

  if (!props.supressConsoleLogs) {
    console.log('')
    console.log(props.fnName)
    console.log(errorMessage)
    cause?.cause && console.log('metadata', cause?.cause as any)
    props.metadata && console.log('metadata', props.metadata)
  }

  if (isProd) {
    nodePhError({
      fnName: props.fnName,
      description: errorMessage,
      metadata: props.metadata,
    })
  }
}

export type LogErrorNodeReturn = ReturnType<typeof logErrorNode>
