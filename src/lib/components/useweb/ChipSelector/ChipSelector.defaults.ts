// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type ChipSelectorProps } from '@useweb/ui/ChipSelector'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<ChipSelectorProps<any>> = {
  defaultProps: {
    name: 'chipselector',
    chipProps: {
      variant: 'outlined',
    },
  },
  styleOverrides: {
    root: {
      borderRadius: '16px',
      backgroundColor: colors.neutral[400],
      color: colors.neutral[100],
      '& .MuiInputBase-root': {
        borderColor: colors.neutral[300],
      },
      '& fieldset.MuiOutlinedInput-notchedOutline[aria-hidden="true"]': {
        borderColor: colors.neutral[300],
      },
      '&:hover': {
        '&& fieldset': {
          borderColor: colors.neutral[300],
        },
      },
      '& .text-placeholder': {
        color: colors.neutral[200],
      },
      '& [data-testid="ArrowDropDownIcon"]': {
        color: colors.neutral[200],
      },
      '& .MuiChip-root': {
        borderColor: colors.neutral[250],
        color: colors.neutral[100],
      },
    },
  },
}

export default defaults
