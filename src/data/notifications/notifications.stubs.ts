import date from '@useweb/date'

import type NotificationSchema from './notification.schema.js'

const NotificationsStubs: NotificationSchema[] = [
  {
    id: '1',
    receiverUid: 'creator2',
    senderUid: 'developer1',
    imageUrl: 'https://i.pravatar.cc/300',
    title: 'Anna Srzand sent you a message',
    sentDate: Date.parse(date('2023-01-01').toISOString()),
    message: 'Hello this is a message',
    seen: false,
    href: '/',
    ctas: [
      {
        label: 'Reply',
        href: '/messages/direct-conversation-1',
      },
    ],
    jobId: 'pending-creator-approval-job-1',
  },
  {
    id: '99',
    receiverUid: 'developer1',
    senderUid: 'creator2',
    imageUrl: 'https://i.pravatar.cc/300',
    title: 'Anna Srzand sent you a message',
    sentDate: Date.parse(date('2023-01-01').toISOString()),
    message: 'Hello this is a message',
    seen: false,
    href: '/',
    ctas: [
      {
        label: 'Reply',
        href: '/messages/direct-conversation-1',
      },
    ],
    jobId: 'pending-creator-approval-job-1',
  },
  {
    id: '2',
    receiverUid: 'creator2',
    senderUid: 'developer1',
    imageUrl: 'https://i.pravatar.cc/301',
    title: 'Philip sent you a message',
    sentDate: Date.parse(date('2023-01-01').toISOString()),
    message:
      'You are such a hard worker and it shows in everything you do. Keep up the great work!',
    seen: true,
    ctas: [
      {
        label: 'Reply',
        href: '/messages/direct-conversation-1',
      },
    ],
  },
  {
    id: '3',
    receiverUid: 'developer1',
    senderUid: 'developer1',
    imageUrl: 'https://i.pravatar.cc/301',
    title: 'Philip sent you a message',
    sentDate: Date.parse(date('2023-01-01').toISOString()),
    message:
      'You are such a hard worker and it shows in everything you do. Keep up the great work!',
    seen: true,
    ctas: [
      {
        label: 'Reply',
        href: '/messages/direct-conversation-1',
      },
    ],
  },
]

export default NotificationsStubs
