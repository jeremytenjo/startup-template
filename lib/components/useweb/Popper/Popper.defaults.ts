// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type PopperProps } from '@useweb/ui/Popper'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<PopperProps> = {
  styleOverrides: {
    root: {
      color: colors.neutral[600],
    },
  },
}

export default defaults
