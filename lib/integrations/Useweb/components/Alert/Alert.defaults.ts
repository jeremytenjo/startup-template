// https://mui.com/customization/theme-components/#global-style-overrides
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type AlertProps } from '@useweb/ui/Alert'

import colors from '../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<AlertProps> = {
  styleOverrides: {
    root: {
      borderRadius: '16px',
      backgroundColor: colors.neutral[600],
      border: `1px solid ${colors.neutral[300]}`,
      backdropFilter: 'blur(12px) saturate(0.9)',
      fontSize: '13px',
      alignItems: 'start',
      '&[data-severity="success"], &[data-severity="success"]  svg:first-child': {
        color: '#b8f9bb !important',
      },
      '&[data-severity="warning"], &[data-severity="warning"] svg:first-child ': {
        color: '#ffe4bc',
      },
      '&[data-severity="info"], &[data-severity="info"] svg:first-child': {
        color: '#bae9ff',
      },
      '&[data-severity="error"], &[data-severity="error"] svg:first-child': {
        color: '#ff9494',
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
