// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type EmptyMessageProps } from '@useweb/ui/EmptyMessage'

import colors from '../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<EmptyMessageProps> = {
  styleOverrides: {
    root: {
      '& [data-id="EmptyMessageTitle"]': {
        color: colors.neutral[100],
      },
      '& [data-id="EmptyMessageSubTitle"]': {
        color: colors.neutral[100],
      },
    },
  },
}

export default defaults
