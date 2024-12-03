import useAsync, { type UseAsyncProps } from '@useweb/use-async'

import sendNotificationFn, { type SendNotificationProps } from '../sendNotification.js'

type UseSendNotificationProps = Omit<UseAsyncProps, 'fn'>

export default function useSendNotification(props = {} as UseSendNotificationProps) {
  const sendNotification = useAsync<SendNotificationProps, any>({
    fn: sendNotificationFn,
    ...props,
  })

  return sendNotification
}
