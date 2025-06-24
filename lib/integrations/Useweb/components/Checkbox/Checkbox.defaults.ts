// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type CheckboxProps } from '@useweb/ui/Checkbox'

import colors from '../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<CheckboxProps<any>> = {
  styleOverrides: {
    root: {
      '& [data-id="Checkbox_uncheckedIcon"]': {
        fill: colors.neutral[250],
        '& rect': {
          stroke: colors.neutral[250],
        },
      },

      '& [data-id="Checkbox_checkedIcon"]': {
        fill: colors.primary.background,
        '& rect': {
          stroke: colors.primary.main,
        },
      },
    },
  },
}

export default defaults
