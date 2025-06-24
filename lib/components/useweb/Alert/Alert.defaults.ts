// https://mui.com/customization/theme-components/#global-style-overrides
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type AlertProps } from '@useweb/ui/Alert'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<AlertProps> = {
  styleOverrides: {
    root: {
      borderRadius: '16px',
      backgroundColor: colors.neutral[600],
      border: `1px solid ${colors.neutral[300]}`,
      backdropFilter: 'blur(12px) saturate(0.9)',
      fontSize: '13px',
      alignItems: 'start',
      '&[data-severity="success"]': {
        color: '#b8f9bb',
      },
      '&[data-severity="warning"]': {
        color: '#ffe4bc',
      },
      '&[data-severity="info"]': {
        color: '#bae9ff',
      },
      '&[data-severity="error"]': {
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
