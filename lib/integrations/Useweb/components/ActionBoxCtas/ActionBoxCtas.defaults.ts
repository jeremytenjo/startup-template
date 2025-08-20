// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type ActionBoxCtasProps } from '@useweb/ui/ActionBoxCtas'

import { themeTokens } from '../../theme/tokens/tokens.js'

const defaults: ComponentDefaultsProps<ActionBoxCtasProps> = {
  styleOverrides: {
    root: {
      backgroundColor: themeTokens.colors.neutral[500],
      borderTop: `1px solid ${themeTokens.colors.neutral[300]}`,
      borderBottomLeftRadius: themeTokens.borderRadius[1],
      borderBottomRightRadius: themeTokens.borderRadius[1],
    },
  },
}

export default defaults
