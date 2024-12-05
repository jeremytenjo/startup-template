import React from 'react'

import DefaultHeadTags from '../../../lib/components/head/DefaultHeadTags/DefaultHeadTags.js'
import UserPage from '../../../pagesContent/User/pages/UserPage.js'

// Use to navigate to a creator without SSR
export default function UserPublicPageIndex() {
  return (
    <>
      <DefaultHeadTags />
      <UserPage />
    </>
  )
}
