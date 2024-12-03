import type React from 'react'

import { interFont } from '../../fonts/fonts.js'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body3: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true
  }
}

export type VariantOptions =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'button'
  | 'caption'
  | 'overline'

const variants = {
  h1: {
    fontWeight: '600',
    fontSize: '22px',
    // https://mui.com/material-ui/customization/typography/#responsive-font-sizes
    '@media (min-width:900px)': {
      fontSize: '25px',
    },
  },
  h2: {
    fontWeight: 300,
    fontSize: '3.75rem',
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontWeight: 400,
    fontSize: '3rem',
    lineHeight: 1.167,
    letterSpacing: '0em',
  },
  h4: {
    fontWeight: 400,
    fontSize: '2.125rem',
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
  },
  h5: {
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: 1.334,
    letterSpacing: '0em',
  },
  h6: {
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
  },
  subtitle1: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    letterSpacing: '0.15px',
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
  },
  body1: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  },
  body3: {
    fontWeight: 400,
    fontSize: '13px',
    letterSpacing: '0.00938em',
    '@media (min-width:900px)': {
      fontSize: '14px',
    },
  },
  button: {
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 2.66,
    letterSpacing: '0.08333em',
    textTransform: 'uppercase' as const,
  },
  sidebarTitle1: {
    fontSize: '15px',
    fontWeight: '700',
    marginBottom: '16px',
  },
  fontFamily: [interFont.style.fontFamily].join(','),
}

const variantNames = Object.keys(variants).filter((variant) => variant !== 'fontFamily')

export { variants, variantNames }

// extend variants types

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    sidebarTitle1: true
  }
}
