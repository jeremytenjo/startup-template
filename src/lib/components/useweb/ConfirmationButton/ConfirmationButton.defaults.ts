// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type ConfirmationButtonProps } from '@useweb/ui/ConfirmationButton'

const defaults: ComponentDefaultsProps<ConfirmationButtonProps> = {
  defaultProps: {
    triggerButtonProps: undefined as any,
    fn: undefined as any,
    acceptButtonProps: undefined as any,
    dialogProps: undefined as any,
    cancelButtonProps: {
      variant: 'text',
    },
  },
  styleOverrides: {
    root: {
      '& .dialog_wrapper': {
        border: 'none',
      },
    },
  },
}

export default defaults
