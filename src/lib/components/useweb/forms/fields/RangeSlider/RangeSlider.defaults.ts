// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type RangeSliderProps } from '@useweb/ui/RangeSlider'

import colors from '../../../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<RangeSliderProps<any>> = {
  styleOverrides: {
    root: {
      '& .MuiSlider-thumb': {
        border: `1px solid ${colors.primary.light}`,
      },

      '& [data-id="RangeSlider_divider"]': {
        color: colors.neutral[100],
      },
    },
  },
}

export default defaults
