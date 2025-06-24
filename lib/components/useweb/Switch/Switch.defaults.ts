// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type SwitchProps } from '@useweb/ui/Switch'

const defaults: ComponentDefaultsProps<SwitchProps<any>> = {
  styleOverrides: {
    root: {},
  },
}

export default defaults
