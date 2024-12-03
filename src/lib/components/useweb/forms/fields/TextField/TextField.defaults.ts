// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type TextFieldProps } from '@useweb/ui/TextField'

import colors from '../../../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<TextFieldProps<any>> = {
  defaultProps: {
    name: 'TextField',
  },
  styleOverrides: {
    root: {
      '& [data-id="textfield_inner"]': {
        backgroundColor: colors.neutral[300],
        border: `1px solid ${colors.neutral[300]}`,
        borderRadius: '14px',
      },
      '& input, textarea': {
        color: colors.neutral[100],
        '&::placeholder': {
          color: colors.neutral[200],
        },
      },

      '& [data-id="Textfield_MaxWords"]': {
        mt: 1,
        fontWeight: 'bold',
        color: colors.neutral[150],
      },
    },
  },
}

export default defaults
