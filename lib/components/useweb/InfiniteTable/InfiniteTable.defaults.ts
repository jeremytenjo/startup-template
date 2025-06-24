// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type InfiniteTableProps } from '@useweb/ui/InfiniteTable'

const defaults: ComponentDefaultsProps<InfiniteTableProps<any>> = {
  styleOverrides: {
    root: {
      '& [data-id="Table"]': {
        border: 'none',
      },

      '& [data-is-header="false"]': {
        mb: 2,
      },
    },
  },
}

export default defaults
