import useAsync, { type UseAsyncProps } from '@useweb/use-async'
import useSnackbar from '@useweb/ui/Snackbar'

import adminSendSystemMessageFn, {
  type AdminSendSystemMessageProps,
  type AdminSendSystemMessageReturn,
} from '../adminSendSystemMessage.js'

import logError from '@/src/lib/utils/loggers/logError/logError'

type UseAdminSendSystemMessageProps = Omit<
  UseAsyncProps<any, Awaited<AdminSendSystemMessageReturn>>,
  'fn'
>

export default function useAdminSendSystemMessage(
  props: UseAdminSendSystemMessageProps = {},
) {
  const snackbar = useSnackbar()
  const adminSendSystemMessage = useAsync<
    AdminSendSystemMessageProps,
    Awaited<ReturnType<typeof adminSendSystemMessageFn>>
  >({
    fn: async (p) => {
      const data = await adminSendSystemMessageFn(p)

      snackbar.show({
        message: 'Message sent',
        severity: 'success',
      })

      return data
    },
    onError({ error, fnProps }) {
      logError({
        error,
        fnName: 'useAdminSendSystemMessage',
        metadata: { props, fnProps },
      })
    },
    ...props,
  })

  return adminSendSystemMessage
}
