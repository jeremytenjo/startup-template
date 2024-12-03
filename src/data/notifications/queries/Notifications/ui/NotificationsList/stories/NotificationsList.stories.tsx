//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import NotificationsListStubs from '../../../../../notifications.stubs.js'
import NotificationsList from '../NotificationsList.js'
import NotificationsListData_ from '../NotificationsListData/NotificationsListData.js'
import NotificationsListEmptyData_ from '../NotificationsListEmptyData/NotificationsListEmptyData.js'
import NotificationsListLoading_ from '../NotificationsListLoading/NotificationsListLoading.js'
import NotificationsListError_ from '../NotificationsListError/NotificationsListError.js'

export default {
  title: 'data/notifications/queries/Notifications/ui/NotificationsList',
  parameters: {
    signInAs: 'creator1',
  },
}

// full example
export const NotificationsListExample = {
  render: () => {
    return (
      <>
        <NotificationsList />
      </>
    )
  },
}

// data
export const NotificationsListWithData = {
  render: () => {
    return (
      <>
        <NotificationsListData_ {...commonProps} data={NotificationsListStubs} />
      </>
    )
  },
}

// empty data
export const NotificationsListEmptyData = {
  render: () => {
    return (
      <>
        <NotificationsListEmptyData_ {...commonProps} />
      </>
    )
  },
}

// loading
export const NotificationsListLoading = {
  render: () => {
    return (
      <>
        <NotificationsListLoading_ {...commonProps} />
      </>
    )
  },
}

// error
export const NotificationsListError = {
  render: () => {
    return (
      <>
        <NotificationsListError_
          {...commonProps}
          error={new Error('NotificationsList failed')}
        />
      </>
    )
  },
}

const commonProps = {
  exec: () => null,
}
