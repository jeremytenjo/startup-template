// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type ActionBoxProps } from '@useweb/ui/ActionBox'

import colors from '../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<ActionBoxProps> = {
  styleOverrides: {
    root: {
      backgroundColor: colors.neutral[400],
      border: `1px solid ${colors.neutral[300]}`,
      borderRadius: '14px',
    },
  },
}

export default defaults
