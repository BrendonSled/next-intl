import {cache} from 'react';
import getConfig from './getConfig';
import getLocaleFromHeader from './getLocaleFromHeader';

let hasWarned = false;

const getTimeZone = cache(async (opts?: {locale: string}) => {
  if (!opts?.locale && !hasWarned) {
    hasWarned = true;
    console.warn(`
Calling \`getTimeZone\` without a locale is deprecated. Please update the call:

// app/[locale]/layout.tsx
export async function generateMetadata({params}) {
  const t = await getTimeZone({locale: params.locale});

  // ...
}

Learn more: https://next-intl-docs.vercel.app/docs/next-13/server-components#using-internationalization-outside-of-components
`);
  }

  const locale = opts?.locale || getLocaleFromHeader();
  const config = await getConfig(locale);
  return config.timeZone;
});

export default getTimeZone;