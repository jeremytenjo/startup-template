// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type AvatarProps } from '@useweb/ui/Avatar'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<AvatarProps> = {
  styleOverrides: {
    root: {
      border: '2px solid transparent',
      borderColor: colors.neutral[300],
    },
  },
}

export default defaults
