// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type FormFieldHeaderProps } from '@useweb/ui/FormFieldHeader'

import colors from '../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<FormFieldHeaderProps> = {
  styleOverrides: {
    root: {
      '& [data-id="FormFieldHeader_label"]': {
        color: colors.neutral['150'],
        fontWeight: '500',
      },
      '& [data-id="FormFieldHeader_hint"]': {
        color: colors.neutral['150'],
      },
    },
  },
}

export default defaults
