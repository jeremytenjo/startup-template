// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type FileInputProps } from '@useweb/ui/FileInput'

import colors from '../../../../theme/tokens/colors.js'
import { themeTokens } from '../../../../theme/tokens/tokens.js'

const defaults: ComponentDefaultsProps<FileInputProps<any>> = {
  styleOverrides: {
    root: {
      '& [data-id="FileInput_Button"]': {
        backgroundColor: colors.neutral[300],
        border: `1px solid ${colors.neutral[300]}`,
        color: colors.neutral[100],

        '&:hover': {
          backgroundColor: colors.neutral[300],
        },
        '&:active': {
          backgroundColor: colors.neutral[300],
        },
        '&:focus': {
          backgroundColor: colors.neutral[300],
        },
      },

      '& img': {
        borderRadius: themeTokens.borderRadius[1],
      },
    },
  },
}

export default defaults
