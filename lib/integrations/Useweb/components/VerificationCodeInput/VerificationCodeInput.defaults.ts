// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type VerificationCodeInputProps } from '@useweb/ui/VerificationCodeInput'

import colors from '../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<VerificationCodeInputProps> = {
  styleOverrides: {
    root: {
      '& .VerificationCodeInput_lib': {
        width: 'fit-content !important',

        '& > div': {
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          width: 'fit-content !important',

          '& input': {
            backgroundColor: colors.neutral[600],
            borderRadius: '16px',
            border: '1px solid transparent',
            borderColor: colors.neutral[300],
            color: colors.neutral[100],
            width: '43px !important',
            height: '43px !important',

            '&:focus': {
              borderColor: colors.primary.light,
              caretColor: colors.primary.light,
            },
          },
        },
      },
    },
  },
}

export default defaults
