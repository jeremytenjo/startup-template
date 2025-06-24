// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type PhoneInputProps } from '@useweb/ui/PhoneInput'

import colors from '../../../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<PhoneInputProps<any>> = {
  styleOverrides: {
    root: {
      '& [class="PhoneInput"], [class="PhoneInput PhoneInput--focus"]': {
        backgroundColor: colors.neutral[300],
        border: `1px solid ${colors.neutral[300]}`,
        borderRadius: '14px',

        '& [class="PhoneInput--focus"]': {
          backgroundColor: colors.neutral[300],
        },

        '& [class="PhoneInput--disabled"]': {
          backgroundColor: colors.neutral[500],
        },

        '& input, textarea': {
          color: colors.neutral[100],
          '&::placeholder': {
            color: colors.neutral[200],
          },
        },
      },
    },
  },
}

export default defaults
