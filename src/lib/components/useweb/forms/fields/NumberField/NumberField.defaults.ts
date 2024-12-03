// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider.js
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type NumberFieldProps } from '@useweb/ui/NumberField'

import colors from '../../../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<NumberFieldProps<any>> = {
  styleOverrides: {
    root: {
      '& [data-id="NumberField_Inner"]': {
        backgroundColor: colors.neutral[300],
        border: `1px solid ${colors.neutral[300]}`,
        borderRadius: '14px',

        '& input': {
          color: colors.neutral[100],
          '&::placeholder': {
            color: colors.neutral[200],
          },
        },
      },
    },
  },
}

export default defaults
