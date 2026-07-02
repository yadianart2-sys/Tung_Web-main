import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const BASE_URL = 'https://tungcoin.com';
const OG_IMAGE = 'https://photos.pinksale.finance/file/pinksale-logo-upload/1779894309304-a76860620da420652c14230ae807e126.png';

const SITE_TITLE = 'TUNG - The Sahur Meme Coin of Falco-X';
const SITE_DESC = 'WAKE UP. BUY TUNG. Earn 3% passive dividends automatically. Auto-burn deflationary meme coin on BNB Chain. Powered by Falco-X.';

const META = {
  '/': {
    en: { title: `${SITE_TITLE} | Best BNB Chain Meme Coin 2026`, desc: SITE_DESC },
    es: { title: `TUNG - La Meme Coin del Sahur de Falco-X | Mejor Meme Coin BNB Chain 2026`, desc: 'DESPIERTA. COMPRA TUNG. Gana 3% de dividendos pasivos automáticamente. Token deflacionario con auto-quema en BNB Chain.' },
  },
};

export default function SEO({ page = '/', customTitle, customDesc, customImage }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en';
  const pathname = window.location.pathname;

  const localized = (META[page] || META['/'])[lang];
  const title = customTitle || localized.title;
  const description = customDesc || localized.desc;
  const image = customImage || OG_IMAGE;
  const url = `${BASE_URL}${pathname}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hreflang="en" href={`${BASE_URL}/`} />
      <link rel="alternate" hreflang="es" href={`${BASE_URL}/es/`} />
      <link rel="alternate" hreflang="x-default" href={`${BASE_URL}/`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url,
        publisher: { '@type': 'Organization', name: 'TUNG', url: BASE_URL },
      })}</script>
    </Helmet>
  );
}
