// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type ActionBoxCtasProps } from '@useweb/ui/ActionBoxCtas'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<ActionBoxCtasProps> = {
  styleOverrides: {
    root: {
      backgroundColor: colors.neutral[500],
      borderTop: `1px solid ${colors.neutral[300]}`,
      borderBottomLeftRadius: '32px',
      borderBottomRightRadius: '32px',
    },
  },
}

export default defaults
