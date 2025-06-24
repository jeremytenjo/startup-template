// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type SelectProps } from '@useweb/ui/Select'

import colors from '../../../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<SelectProps<any, any>> = {
  styleOverrides: {
    root: {
      '& .MuiInputBase-root': {
        backgroundColor: colors.neutral[300],
        border: `1px solid ${colors.neutral[300]}`,
        color: colors.neutral[100],
        borderRadius: '14px',
      },
      '& .MuiNativeSelect-select': {
        '&[disabled]': {
          color: colors.neutral['200'],
          WebkitTextFillColor: colors.neutral['200'],
        },
      },

      '& [data-testid="ArrowDropDownIcon"]': {
        color: colors.neutral[200],
      },
      '& select option.MuiBox-root': {
        backgroundColor: colors.neutral[600],
        color: colors.neutral[100],
        '&:hover, &:active, &:focus': {
          color: colors.neutral[100],
        },
      },
    },
  },
}

export default defaults
