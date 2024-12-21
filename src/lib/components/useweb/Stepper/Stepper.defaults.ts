// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type StepperProps } from '@useweb/ui/Stepper'

import colors from '../../../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<StepperProps> = {
  styleOverrides: {
    root: {
      '& [data-id="Stepper_label"]': {
        color: colors.neutral[100],
      },
      '& .MuiStepLabel-horizontal svg': {
        color: colors.primary.main,
        // only border svg on mobile, otherwise it has a dark inner border on desktop
        '@media screen and (max-width: 900px)': {
          border: `1px solid ${colors.primary.light}`,
          borderRadius: '50%',
        },
      },
      '& .MuiStepLabel-horizontal.Mui-disabled svg': {
        color: colors.neutral[600],
        border: `1px solid ${colors.neutral[300]}`,
        borderRadius: '50%',
      },

      // Active step
      '& [data-id="Stepper"][data-active="true"]': {
        '& .MuiStepIcon-text': {
          fill: colors.neutral[600],
        },
      },
      // No active step
      '& [data-id="Stepper"][data-active="false"]': {
        '& .MuiStepIcon-text': {
          fill: colors.neutral[100],
        },
      },
    },
  },
}

export default defaults
