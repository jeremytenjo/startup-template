// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type TableProps } from '@useweb/ui/Table'

import colors from '../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<TableProps> = {
  styleOverrides: {
    root: {
      borderColor: colors.neutral[300],
    },
  },
}

export default defaults
