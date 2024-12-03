import React, { useState } from 'react'

import logError from '../../../../../utils/loggers/logError/logError.js'

import LaunchEmailSubmitUi from './LaunchEmailSubmitUi/LaunchEmailSubmit.ui.js'

export default function LaunchEmailSubmit() {
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = async ({ email }) => {
    const payload = {
      email,
    }

    try {
      const data = await fetch('api/addToEmailList', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      })
      const res = await data.json()
      if (res.success) {
        setIsSuccess(true)
      } else {
        logError({
          error: res.error,
          fnName: 'LaunchEmailSubmit onSubmit',
          metadata: {},
        })
        setIsSuccess(false)
      }
    } catch (error: any) {
      console.error(error)
    } finally {
      setShowSnackbar(true)
    }
  }

  return (
    <LaunchEmailSubmitUi
      onSubmit={onSubmit}
      successMessage='Email added successfully!'
      errorMessage='Error adding email. please try again'
      showSnackbar={showSnackbar}
      isSuccess={isSuccess}
      onClose={() => setShowSnackbar(false)}
    />
  )
}
