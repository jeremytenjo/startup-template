// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type RadioProps } from '@useweb/ui/Radio'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<RadioProps<any>> = {
  styleOverrides: {
    root: {
      '&[data-checked="false"] svg': {
        '& path': {
          fill: colors.neutral[200],
        },
      },
    },
  },
}

export default defaults
