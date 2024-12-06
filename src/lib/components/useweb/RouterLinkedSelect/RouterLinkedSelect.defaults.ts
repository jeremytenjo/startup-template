// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider.js
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type RouterLinkedSelectProps } from '@useweb/ui/RouterLinkedSelect'

const defaults: ComponentDefaultsProps<RouterLinkedSelectProps> = {
  styleOverrides: {
    root: {
      backgroundColor: 'red',
    },
  },
}

export default defaults
