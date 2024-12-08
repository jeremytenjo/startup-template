// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider.js
import { type ComponentDefaultsProps } from '@useweb/ui-theme'

const defaults: ComponentDefaultsProps<any> = {
  styleOverrides: {
    root: {
      zIndex: 999999,
      backgroundColor: 'rgba(26, 38, 50, 0.9)',
      border: '1px solid',
      borderColor: 'neutral.300',
      backdropFilter: 'blur(22px) saturate(0.9)',
      borderRadius: '14px',
      width: '360px',
      margin: '0 auto',

      '& .MuiTypography-root': {
        color: 'neutral.100',
      },

      '& .MuiPaper-root': {
        border: 'none !important',
        background: 'transparent !important',
      },
    },
  },
}

export default defaults
