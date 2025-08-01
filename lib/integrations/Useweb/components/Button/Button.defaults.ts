// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type ButtonProps } from '@useweb/ui/Button'
import type { BoxProps } from '@useweb/ui/Box'

import colors from '../../theme/tokens/colors.js'
import { themeTokens } from '../../theme/tokens/tokens.js'

// variants

// sizes
export const buttonVariantSmallStyles: BoxProps['sx'] = {
  height: 'fit-content',
  lineHeight: '1.4',
  padding: '7px 16px',
  fontSize: '12px',
  transition: '0.2s',
}

// colors
const primaryVariantStyles = {
  color: colors.neutral[100],
  backgroundColor: colors.primary.main,
  border: '1px solid transparent',
  borderColor: colors.primary.light,
  '&:hover, &:active, &:focus': {
    boxShadow: 'none',
    backgroundColor: colors.primary.main,
  },
}

const secondaryVariantStyles = {
  color: colors.semantic.warning['dark'],
  backgroundColor: colors.semantic.warning[100],
  border: '1px solid transparent',
  borderColor: colors.semantic.warning['100'],
  '&:hover, &:active, &:focus': {
    boxShadow: 'none',
    backgroundColor: colors.semantic.warning['100'],
  },
}

export const severeVariantStyles = {
  color: colors.neutral[100],
  backgroundColor: colors.semantic.error[100],
  border: '1px solid transparent',
  borderColor: colors.semantic.error[200],
  '&:hover, &:active, &:focus': {
    boxShadow: 'none',
    backgroundColor: colors.semantic.error[100],
  },
}

const greyVariantStyles = {
  color: colors.neutral['200'],
  backgroundColor: colors.neutral['350'],
  border: '1px solid transparent',
  borderColor: colors.neutral['300'],
  '&:hover, &:active, &:focus': {
    boxShadow: 'none',
    backgroundColor: colors.neutral['300'],
  },
}

const whiteVariantStyles = {
  color: colors.neutral[600],
  backgroundColor: colors.neutral[100],
  border: '1px solid transparent',
  borderColor: colors.neutral[100],
  '&:hover, &:active, &:focus': {
    boxShadow: 'none',
    backgroundColor: colors.neutral[100],
  },
}

const outlinedBase = {
  color: colors.neutral[150],
  border: '1px solid transparent',
  borderColor: colors.neutral[250],
  backgroundColor: colors.neutral[500],
  '&:hover': {
    border: '1px solid transparent',
    borderColor: colors.neutral[250],
    backgroundColor: colors.neutral[500],
  },
}

export const loadMoreVariantStyles = {
  ...primaryVariantStyles,
  margin: '0 auto',
  width: 'fit-content !important',
  display: 'block',
}

const textVariantStyles = {
  color: colors.neutral[100],
  border: '1px solid transparent',
  borderColor: colors.neutral[300],
  '&:hover': {
    border: '1px solid transparent',
    borderColor: colors.neutral[300],
  },
}

const defaults: ComponentDefaultsProps<ButtonProps> = {
  defaultProps: {
    variant: 'primary',
    name: 'default name',
    size: 'small',
  },
  styleOverrides: {
    root: {
      borderRadius: themeTokens.borderRadius[1],
      fontWeight: '600',
      boxShadow: 'none',
      width: '100%',
      textTransform: 'none' as const,
      '&.Mui-disabled': {
        color: `${colors.neutral[200]} !important`,
        backgroundColor: `${colors.neutral[300]} !important`,
        border: 'transparent !important',
      },
      '&:hover, &:active, &:focus': {
        boxShadow: 'none',
        filter: 'brightness(0.9)',
      },
    },
  },
  variants: [
    // outlined
    {
      props: {
        variant: 'outlined',
      },
      style: {
        ...outlinedBase,
      },
    },
    {
      props: {
        variant: 'outlined',
        size: 'small',
      },
      style: {
        ...outlinedBase,
        ...buttonVariantSmallStyles,
      },
    },
    // Severe
    {
      props: {
        variant: 'severe',
      },
      style: {
        ...severeVariantStyles,
      },
    },
    {
      props: {
        variant: 'severe',
        size: 'small',
      },
      style: {
        ...severeVariantStyles,
        ...buttonVariantSmallStyles,
      },
    },

    // white
    {
      props: {
        variant: 'white',
      },
      style: {
        ...whiteVariantStyles,
      },
    },
    {
      props: {
        variant: 'white',
        size: 'small',
      },
      style: {
        ...whiteVariantStyles,
        ...buttonVariantSmallStyles,
      },
    },

    // primary
    {
      props: {
        variant: 'primary',
      },
      style: {
        ...primaryVariantStyles,
      },
    },
    {
      props: {
        variant: 'primary',
        size: 'small',
      },
      style: {
        ...primaryVariantStyles,
        ...buttonVariantSmallStyles,
      },
    },

    // secondary
    {
      props: {
        variant: 'secondary',
      },
      style: {
        ...secondaryVariantStyles,
      },
    },
    {
      props: {
        variant: 'secondary',
        size: 'small',
      },
      style: {
        ...secondaryVariantStyles,
        ...buttonVariantSmallStyles,
      },
    },

    // grey
    {
      props: {
        variant: 'grey',
      },
      style: {
        ...greyVariantStyles,
      },
    },
    {
      props: {
        variant: 'grey',
        size: 'small',
      },
      style: {
        ...greyVariantStyles,
        ...buttonVariantSmallStyles,
      },
    },

    // text
    {
      props: {
        variant: 'text',
      },
      style: {
        ...textVariantStyles,
      },
    },
    {
      props: {
        variant: 'text',
        size: 'small',
      },
      style: {
        ...textVariantStyles,
        ...buttonVariantSmallStyles,
      },
    },

    // loadMore
    {
      props: {
        variant: 'loadMore',
      },
      style: {
        ...loadMoreVariantStyles,
      },
    },
    {
      props: {
        variant: 'loadMore',
        size: 'small',
      },
      style: {
        ...loadMoreVariantStyles,
        ...buttonVariantSmallStyles,
      },
    },
  ],
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true
    secondary: true
    white: true
    severe: true
    grey: true
    loadMore: true
  }
}

export default defaults
