// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type DrawerProps } from '@useweb/ui/Drawer'

import colors from '../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<DrawerProps> = {
  styleOverrides: {
    root: {
      '& .MuiPaper-root': {
        backgroundColor: colors.neutral[400],
        color: colors.neutral[100],
      },
    },
  },
}

export default defaults
