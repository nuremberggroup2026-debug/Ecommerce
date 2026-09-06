

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar'],

  defaultLocale: 'en',

  localePrefix: 'never',

  localeDetection: true,
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 60 * 60 * 24 * 365
  },

  alternateLinks: true
});
