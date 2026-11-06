// Handles only the bare "/" route: negotiates the visitor's language from
// Accept-Language and 302-redirects to the matching /<lang> home. Explicit
// /<lang> URLs never hit this function; the static "/ -> /de" rule in
// _redirects is the fallback if this function doesn't run.

// Swiss German (/gsw) is never picked automatically: "gsw" and "de-CH" both
// land on /de, and the dialect is only used when chosen in the menu.
const LANGS = ['en', 'de', 'fr', 'it', 'rm'];
const DEFAULT_LANG = 'de';

function pickLang(acceptLanguage) {
  if (!acceptLanguage) return DEFAULT_LANG;
  for (const part of acceptLanguage.split(',')) {
    const code = part.split(';')[0].trim().slice(0, 2).toLowerCase();
    if (LANGS.includes(code)) return code;
  }
  return DEFAULT_LANG;
}

export function onRequest(context) {
  const lang = pickLang(context.request.headers.get('accept-language'));
  const url = new URL(context.request.url);
  url.pathname = `/${lang}`;
  const headers = { Location: url.toString() };
  // _headers rules don't reach Function responses, so keep pages.dev out of the index here too.
  if (url.hostname.endsWith('.pages.dev')) headers['X-Robots-Tag'] = 'noindex';
  return new Response(null, { status: 302, headers });
}
