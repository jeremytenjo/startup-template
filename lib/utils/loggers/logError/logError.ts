import phError from '../../../integrations/PostHog/events/browser/ph_error/phError.js'

const isProd = process.env.NODE_ENV === 'production'

export type LogErrorProps = {
  error: Error | string
  fnName: string
  fatal?: boolean
  metadata: any
  ignoreErrorIf?: (props: { e: string }) => {
    ignore: boolean
  }
  supressConsoleLogs?: boolean
}

export default async function logError(props: LogErrorProps) {
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
    phError({
      fnName: props.fnName,
      description: errorMessage,
      fatal: props.fatal,
      metadata: props.metadata,
    })
  }
}

export type LogErrorReturn = ReturnType<typeof logError>
