import type NavLinkSchema from './NavLink.schema.js'

export const navLinks = {
  home: {
    label: 'Home',
    url: `/`,
  } satisfies NavLinkSchema,

  access: {
    signIn: {
      label: 'Sign In',
      url: `/access/sign-in`,
    } satisfies NavLinkSchema,
    signUp: {
      label: 'Sign Up',
      url: `/access/sign-up`,
    } satisfies NavLinkSchema,
    resetPassword: {
      label: 'Reset Password',
      url: `/access/reset-password`,
    } satisfies NavLinkSchema,
  },

  profile: {
    label: 'Profile',
    url: `/user/:displayName`,
  } satisfies NavLinkSchema,

  user: {
    label: 'User',
    url: (p: { displayName: string }) => {
      return `/user/${p.displayName}`
    },
  },

  faq: {
    label: 'FAQ',
    url: `/faq`,
  } satisfies NavLinkSchema,

  tos: {
    label: 'Terms of Service',
    url: `/terms-of-service`,
  } satisfies NavLinkSchema,

  privacyPolicy: {
    label: 'Privacy Policy',
    url: `/privacy-policy`,
  } satisfies NavLinkSchema,

  settings: {
    settings: {
      label: 'Settings',
      url: `/settings`,
    } satisfies NavLinkSchema,
  },

  mailto: {
    label: 'Mail',
    url: 'mailto:info@startup-template.com',
  } satisfies NavLinkSchema,

  socialLinks: {
    discord: {
      label: 'Discord',
      url: 'https://discord.gg/startup-template',
    } satisfies NavLinkSchema,
  },
}
