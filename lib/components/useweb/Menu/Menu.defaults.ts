// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type MenuProps } from '@useweb/ui/Menu'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<MenuProps> = {
  styleOverrides: {
    root: {
      '& .MuiPaper-root': {
        background: colors.neutral[600],
        color: colors.neutral[100],
        border: `1px solid ${colors.neutral[300]}`,
        boxShadow: '0px 9px 38px rgba(0, 0, 0, 0.06)',
        borderRadius: '7px',
        filter: 'none',
        '&::before': {
          display: 'none',
        },
      },
    },
  },
}

export default defaults
