// https://mui.com/customization/theme-components/#global-style-overrides
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type AlertProps } from '@useweb/ui/Alert'

import colors from '../../theme/tokens/colors.js'
import { themeTokens } from '../../theme/tokens/tokens.js'

const defaults: ComponentDefaultsProps<AlertProps> = {
  styleOverrides: {
    root: {
      borderRadius: themeTokens.borderRadius[1],
      backgroundColor: colors.neutral[100],
      border: `1px solid ${colors.neutral[200]}`,
      backdropFilter: 'blur(12px) saturate(0.9)',
      fontSize: '13px',
      alignItems: 'start',
      '&[data-severity="success"], &[data-severity="success"]': {
        '& svg:first-of-type': {
          color: '#b8f9bb !important',
        },
      },
      '&[data-severity="warning"], &[data-severity="warning"]': {
        '& svg:first-of-type': {
          color: '#ffe4bc',
        },
      },
      '&[data-severity="info"], &[data-severity="info"]': {
        '& svg:first-of-type': {
          color: '#bae9ff',
        },
      },
      '&[data-severity="error"], &[data-severity="error"]': {
        '& svg:first-of-type': {
          color: themeTokens.colors.semantic.error[100],

          '& p': {
            color: themeTokens.colors.semantic.error[100],
          },
        },
      },
      '&[data-has-title="false"]': {
        '& .MuiAlert-message': {
          transform: 'translateY(1.3px)',
        },
      },
    },
  },
}

export default defaults
