import logError from '../../../../../lib/utils/loggers/logError/logError.js'

// https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
export const validatePassword = (p: string) => {
  const errors: string[] = []
  if (p.length < 6) {
    errors.push('Your password must be at least 6 characters')
  }
  if (p.search(/[a-z]/i) < 0) {
    errors.push('Your password must contain at least one letter.')
  }
  if (p.search(/[0-9]/) < 0) {
    errors.push('Your password must contain at least one digit.')
  }
  if (errors.length > 0) {
    return { isValid: false, message: errors.join('\n') }
  }
  return { isValid: true }
}

export const getFirebaseErrorMessage = ({ error }) => {
  const stringError = String(error)
  logError({
    error: stringError,
    fnName: 'getFirebaseErrorMessage',
    metadata: {},
  })

  if (
    stringError.includes('FirebaseError: Firebase: Error (auth/email-already-in-use).')
  ) {
    return 'Email taken, please try a new email.'
  }

  if (
    stringError.includes(
      'Firebase: Password should be at least 6 characters (auth/weak-password).',
    )
  ) {
    return 'Password should be at least 6 characters.'
  }

  if (stringError.includes('username taken, please try a different one')) {
    return 'Username taken, please try a different one or sign in.'
  }

  return 'Error creating account, please refresh the page and try again.'
}
