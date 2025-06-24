// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type RatingProps } from '@useweb/ui/Rating'

import colors from '../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<RatingProps> = {
  styleOverrides: {
    root: {
      '& .MuiRating-iconEmpty': {
        color: colors.neutral[250],
      },
      '&[data-id="RatingShortStyle"]': {
        '& svg': {
          color: colors.semantic.warning['100'],
        },
        '& [data-id="RatingShortStyle_rating"]': {
          color: colors.semantic.warning['100'],
        },
        '& [data-id="RatingShortStyle_reviewsAmount"]': {
          color: colors.neutral['200'],
        },
      },
    },
  },
}

export default defaults
