// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type DatePickerProps } from '@useweb/ui/DatePicker'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<DatePickerProps<any>> = {
  styleOverrides: {
    root: {
      '& .MuiFormControl-root': {
        width: '100%',
      },
      '& fieldset': {
        borderRadius: '16px',
        width: '100%',
      },
      '& input': {
        borderRadius: '16px',
        backgroundColor: colors.neutral[300],
        borderColor: `${colors.neutral[300]} !important`,
      },
      '& .MuiFormLabel-root': {
        display: 'none',
      },
    },
  },
}

export default defaults
