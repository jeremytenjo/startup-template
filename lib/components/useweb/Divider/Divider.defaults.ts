// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type DividerProps } from '@useweb/ui/Divider'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<DividerProps> = {
  styleOverrides: {
    root: {
      backgroundColor: colors.neutral[300],
      borderColor: colors.neutral[300],
    },
  },
}

export default defaults
