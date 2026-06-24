// Cloudflare Pages Function for the bare "/" route only.
// Negotiates the visitor's language from Accept-Language and 302-redirects to
// the matching /<lang> home. Explicit /<lang> URLs never hit this function, so
// they are always respected (important for SEO and shareable links).
// Falls back to the default language; the static `/ -> /en` rule in _redirects
// covers the case where Functions are unavailable.

const LANGS = ['en', 'de', 'fr', 'it', 'rm'];
const DEFAULT_LANG = 'en';

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
  return Response.redirect(url.toString(), 302);
}
