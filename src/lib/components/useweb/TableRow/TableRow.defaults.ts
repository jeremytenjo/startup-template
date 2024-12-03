// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type TableRowProps } from '@useweb/ui/TableRow'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<TableRowProps> = {
  styleOverrides: {
    root: {
      border: 'none',
      borderRadius: '25px',
      backgroundColor: colors.neutral[350],

      '&[data-is-header="true"]': {
        backgroundColor: 'transparent',

        '& h4': {
          color: colors.neutral[200],
        },
      },
    },
  },
}

export default defaults
