// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type SectionHeaderProps } from '@useweb/ui/SectionHeader'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<SectionHeaderProps> = {
  styleOverrides: {
    root: {
      color: colors.neutral[100],
      '& p': {
        color: colors.neutral[150],
      },
    },
  },
}

export default defaults
