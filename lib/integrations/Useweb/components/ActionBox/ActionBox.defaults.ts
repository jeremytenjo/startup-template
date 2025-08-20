// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type ActionBoxProps } from '@useweb/ui/ActionBox'

import { themeTokens } from '../../theme/tokens/tokens.js'

const defaults: ComponentDefaultsProps<ActionBoxProps> = {
  styleOverrides: {
    root: {
      backgroundColor: themeTokens.colors.neutral[400],
      border: `1px solid transparent`,
      borderRadius: themeTokens.borderRadius[1],
      borderColor: themeTokens.colors.neutral[300],
    },
  },
}

export default defaults
