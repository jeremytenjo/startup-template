// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider.js
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type InfiniteListProps } from '@useweb/ui/InfiniteList'

import { loadMoreVariantStyles } from '../Button/Button.defaults.js'

const defaults: ComponentDefaultsProps<InfiniteListProps<any>> = {
  styleOverrides: {
    root: {
      '& [data-id="InfiniteList_LoadMoreButton"]': {
        ...loadMoreVariantStyles,
        mt: 2,
      },
    },
  },
}

export default defaults
