export const parseStringBoolean = (props: {
  value: string | boolean | undefined | null
  backupValue: any
}) => {
  if (props.value === 'true') return true
  if (props.value === 'false') return false

  return props.backupValue
}

export const parseEmptyString = (props: {
  value: any
  backupValue: any
  isNumber?: boolean
}) => {
  if (props.isNumber && isNaN(props.value)) {
    return props.backupValue
  }

  if (props.value === '' || props.value === undefined) return props.backupValue

  return props.value
}
