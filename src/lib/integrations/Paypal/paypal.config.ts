const isProduction = () => process.env.NODE_ENV === 'production'

export const paypalConfig = {
  clientId: (p: { isBrowser?: boolean } = {}) => {
    let clientId = isProduction()
      ? process.env.PAYPAL_CLIENT_ID_PRODUCTION
      : process.env.PAYPAL_CLIENT_ID_DEVELOPMENT

    if (p.isBrowser) {
      clientId = isProduction()
        ? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_PRODUCTION
        : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_DEVELOPMENT
    }

    if (!clientId) {
      const prefix = p.isBrowser ? 'NEXT_PUBLIC_' : ''

      throw new Error(
        `process.env.${prefix}PAYPAL_CLIENT_ID_${
          isProduction() ? 'PRODUCTION' : 'DEVELOPMENT'
        } is undefined`,
      )
    }

    return { clientId }
  },

  clientSecret: () => {
    const clientSecret = isProduction()
      ? process.env.PAYPAL_CLIENT_SECRET_PRODUCTION
      : process.env.PAYPAL_CLIENT_SECRET_DEVELOPMENT

    if (!clientSecret) {
      throw new Error(
        `process.env.PAYPAL_CLIENT_SECRET_${
          isProduction() ? 'PRODUCTION' : 'DEVELOPMENT'
        } is undefined`,
      )
    }

    return { clientSecret }
  },

  // https://www.paypal.com/businessmanage/account/aboutBusiness
  partnerId: () => {
    const partnerId = isProduction() ? '6UY49ZD38WQT8' : 'PZ2ND5NCWFZ4Q'

    return { partnerId }
  },

  partnerEmail: () => {
    const partnerEmail = isProduction()
      ? 'cole@socialseed.com'
      : 'cole_test@socialseed.com'

    return { partnerEmail }
  },

  bnCode: () => {
    const bnCode = 'SOCIALSEED_SP_PPCP'

    return { bnCode }
  },
}
