// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type DatePickerProps } from '@useweb/ui/DatePicker'

import colors from '../../../../theme/tokens/colors.js'
import { themeTokens } from '../../../../theme/tokens/tokens.js'

const defaults: ComponentDefaultsProps<DatePickerProps<any>> = {
  styleOverrides: {
    root: {
      '& .MuiFormControl-root': {
        width: '100%',
      },
      '& fieldset': {
        borderRadius: themeTokens.borderRadius[1],
        width: '100%',
      },
      '& input': {
        borderRadius: themeTokens.borderRadius[1],
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
