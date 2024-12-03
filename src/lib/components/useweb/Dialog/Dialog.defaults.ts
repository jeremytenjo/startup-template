// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type DialogProps } from '@useweb/ui/Dialog'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<DialogProps> = {
  styleOverrides: {
    root: {
      '& .MuiPaper-root': {
        borderRadius: '32px',
        boxShadow: '0px 9px 38px rgba(0, 0, 0, 0.06)',
        minWidth: [, '360px'],
        backgroundColor: colors.neutral[500],
      },
      '& .dialog_wrapper': {
        color: colors.neutral[100],
        borderColor: colors.neutral[300],
        backgroundColor: colors.neutral[600],
        '& p.MuiTypography-root': {
          fontSize: '12px',
        },
      },
      '& .dialog_header': {
        color: colors.neutral[100],
        '& p.MuiTypography-root': {
          fontWeight: '600',
          fontSize: '16px',
          color: colors.neutral[100],
        },
        '& [data-testid="XsmallIcon"]': {
          color: colors.neutral[100],
        },
      },
      '& .MuiDialog-scrollPaper': {
        background: 'rgb(0 0 0 / 33%)',
        backdropFilter: 'blur(7px) saturate(150%)',
      },
      '& .dialog_ctas': {
        backgroundColor: colors.neutral[500],
        borderTop: `1px solid ${colors.neutral[300]}`,
      },
    },
  },
}

export default defaults
