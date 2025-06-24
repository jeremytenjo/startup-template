// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider.js
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type LinkTabsProps } from '@useweb/ui/LinkTabs'

const defaults: ComponentDefaultsProps<LinkTabsProps> = {
  styleOverrides: {
    root: {},
  },
}

export default defaults
