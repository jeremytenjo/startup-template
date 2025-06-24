// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider.js
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type PillProps } from '@useweb/ui/Pill'

import colors from '../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<PillProps> = {
  styleOverrides: {
    root: {
      borderRadius: '14px',

      '&[data-selected="true"]': {
        backgroundColor: colors.primary.background,
        borderColor: '#00AA6D',
      },

      '&[data-selected="false"]': {
        color: colors.neutral[200],
      },
    },
  },
}

export default defaults
