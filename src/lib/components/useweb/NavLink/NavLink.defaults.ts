// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type NavLinkProps } from '@useweb/ui/NavLink'

const defaults: ComponentDefaultsProps<NavLinkProps> = {
  defaultProps: {
    href: '/',
    isActiveColor: 'neutral.100',
    isInactiveColor: 'neutral.200',
  },
}

export default defaults
