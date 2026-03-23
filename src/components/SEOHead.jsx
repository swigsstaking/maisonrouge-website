import { Helmet } from 'react-helmet-async';
import { useSEO } from '../hooks/useSEO';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from 'react-router-dom';

// Map page keys to their paths in each language
const pagePathMap = {
  home:         { fr: '/',                    en: '/en/',                de: '/de/' },
  vignoble:     { fr: '/vignoble',            en: '/en/vineyard',        de: '/de/weinberg' },
  vins:         { fr: '/vins',                en: '/en/wines',           de: '/de/weine' },
  apprentis:    { fr: '/cuvee-des-apprentis',  en: '/en/apprentice-wines', de: '/de/lehrlingsweine' },
  oenotourisme: { fr: '/oenotourisme',        en: '/en/wine-tourism',    de: '/de/weintourismus' },
  partenaires:  { fr: '/partenaires',         en: '/en/partners',        de: '/de/partner' },
  sponsoring:   { fr: '/sponsoring',          en: '/en/sponsorship',     de: '/de/sponsoring' },
  contact:      { fr: '/contact',             en: '/en/contact',         de: '/de/kontakt' },
  conditions:   { fr: '/conditions-generales', en: '/en/terms',          de: '/de/agb' },
  apropos:      { fr: '/a-propos',            en: '/en/about',           de: '/de/ueber-uns' },
  actualites:   { fr: '/actualites',          en: '/en/news',            de: '/de/aktuelles' },
};

const DOMAIN = 'https://maisonrouge.swigs.online';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Winery',
  'name': 'Maison Rouge',
  'url': 'https://maisonrouge.swigs.online',
  'logo': 'https://maisonrouge.swigs.online/logo.jpg',
  'telephone': '+41273062181',
  'email': 'info@maisonrouge.swigs.online',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Saint-Pierre-de-Clages',
    'addressRegion': 'Valais',
    'addressCountry': 'CH',
  },
  'description': 'Des vins de caractère, élaborés par une équipe soudée et motivée dans le Valais.',
};

const SEOHead = ({ page = 'home' }) => {
  const seo = useSEO(page);
  const siteInfo = useSiteInfo();
  const { lang } = useLanguage();
  const location = useLocation();

  // Get hreflang paths for this page
  const paths = pagePathMap[page] || pagePathMap.home;
  const frPath = paths.fr;
  const enPath = paths.en;
  const dePath = paths.de;

  // Canonical URL based on current language
  const canonicalPath = paths[lang] || paths.fr;
  const canonicalUrl = `${DOMAIN}${canonicalPath}`;

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords?.join(', ')} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.ogTitle || seo.title} />
      <meta property="og:description" content={seo.ogDescription || seo.description} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteInfo.siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.ogTitle || seo.title} />
      <meta name="twitter:description" content={seo.ogDescription || seo.description} />
      <meta name="twitter:image" content={seo.ogImage} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang */}
      <link rel="alternate" hreflang="fr" href={`${DOMAIN}${frPath}`} />
      <link rel="alternate" hreflang="en" href={`${DOMAIN}${enPath}`} />
      <link rel="alternate" hreflang="de" href={`${DOMAIN}${dePath}`} />
      <link rel="alternate" hreflang="x-default" href={`${DOMAIN}${frPath}`} />

      {/* Language */}
      <html lang={lang || 'fr'} />

      {/* JSON-LD Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationJsonLd)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
