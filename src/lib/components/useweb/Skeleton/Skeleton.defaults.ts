// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type SkeletonProps } from '@useweb/ui/Skeleton'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<SkeletonProps> = {
  defaultProps: {
    children: undefined as any,
    loading: undefined as any,
    baseColor: colors.neutral[400],
    highlightColor: colors.neutral[300],
  },
}

export default defaults
