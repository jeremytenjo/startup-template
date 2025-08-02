export type NextRouteHandlerProps = {
  req: Request
  func: (props: { req: Request }) => Promise<any>
}

/**
 * Handles Next.js API route requests and provides standardized error handling
 *
 * @returns Response object with either successful result or error details
 *
 */
export default async function nextRouteHandler(props: NextRouteHandlerProps) {
  try {
    const res = await props.func({ req: props.req })

    return Response.json(res)
  } catch (error: any) {
    return Response.json({
      error: {
        ...error.cause,
        ...error?.error,
      },
    })
  }
}

export type NextRouteHandlerReturn = ReturnType<typeof nextRouteHandler>
