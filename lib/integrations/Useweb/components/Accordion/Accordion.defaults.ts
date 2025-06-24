// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider.js
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type AccordionProps } from '@useweb/ui/Accordion'

import colors from '../../theme/tokens/colors.js'

const defaults: ComponentDefaultsProps<AccordionProps> = {
  styleOverrides: {
    root: {
      backgroundColor: colors.neutral['500'],
      color: colors.neutral['100'],
      borderRadius: '32px !important',
      boxShadow: 'none',
      padding: '5px 30px',

      '& [data-id="Accordion_Header"]': {
        fontSize: ['14px', '16px'],
        fontWeight: 'bold',
        color: colors.neutral['100'],
        position: 'relative',
        pr: '50px',
        py: '15px',

        '&::after': {
          content: '""',
          position: 'absolute',
          width: '40px',
          height: '40px',
          right: 0,
          top: 0,
          bottom: 0,
          margin: 'auto',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='39' height='39' rx='15.5' fill='%2324272E'/%3E%3Crect x='0.5' y='0.5' width='39' height='39' rx='15.5' stroke='%23292C33'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.4697 18.2802C16.1768 18.5731 16.1768 19.048 16.4697 19.3409L18.9393 21.8105C19.5251 22.3963 20.4749 22.3963 21.0607 21.8105L23.5303 19.3409C23.8232 19.048 23.8232 18.5731 23.5303 18.2802C23.2374 17.9873 22.7626 17.9873 22.4697 18.2802L20 20.7499L17.5303 18.2802C17.2374 17.9873 16.7626 17.9873 16.4697 18.2802Z' fill='%23B6C1D1'/%3E%3C/svg%3E%0A")`,
        },

        '&[data-open="true"]': {
          '&::after': {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='39' height='39' rx='15.5' fill='%2324272E'/%3E%3Crect x='0.5' y='0.5' width='39' height='39' rx='15.5' stroke='%23292C33'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.4697 21.7198C16.1768 21.4269 16.1768 20.952 16.4697 20.6591L18.9393 18.1895C19.5251 17.6037 20.4749 17.6037 21.0607 18.1895L23.5303 20.6591C23.8232 20.952 23.8232 21.4269 23.5303 21.7198C23.2374 22.0127 22.7626 22.0127 22.4697 21.7198L20 19.2501L17.5303 21.7198C17.2374 22.0127 16.7626 22.0127 16.4697 21.7198Z' fill='%23515C6D'/%3E%3C/svg%3E ")`,
          },
        },
      },

      '& [data-id="Accordion_Content"]': {
        fontWeight: '400',
        color: colors.neutral['100'],
        fontSize: ['13px', '15px'],
        pb: '20px',
      },
    },
  },
}

export default defaults
