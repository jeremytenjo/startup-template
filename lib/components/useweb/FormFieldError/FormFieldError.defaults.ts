// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type FormFieldErrorProps } from '@useweb/ui/FormFieldError'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<FormFieldErrorProps> = {
  styleOverrides: {
    root: {
      color: colors.semantic.error[200],
    },
  },
}

export default defaults
