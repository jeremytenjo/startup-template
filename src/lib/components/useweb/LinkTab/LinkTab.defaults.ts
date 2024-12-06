// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider.js
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type LinkTabProps } from '@useweb/ui/LinkTab'

const defaults: ComponentDefaultsProps<LinkTabProps> = {
  styleOverrides: {
    root: {
      backgroundColor: 'red',
    },
  },
}

export default defaults
