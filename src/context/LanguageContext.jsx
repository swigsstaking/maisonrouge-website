import { createContext, useContext, useCallback, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import fr from '../i18n/fr.json';
import en from '../i18n/en.json';
import de from '../i18n/de.json';

const translations = { fr, en, de };

const LanguageContext = createContext(null);

const routeMap = {
  fr: { vignoble: 'vignoble', vins: 'vins', 'cuvee-des-apprentis': 'cuvee-des-apprentis', oenotourisme: 'oenotourisme', partenaires: 'partenaires', sponsoring: 'sponsoring', contact: 'contact', panier: 'panier', connexion: 'connexion', 'mon-compte': 'mon-compte', 'conditions-generales': 'conditions-generales', 'a-propos': 'a-propos', actualites: 'actualites' },
  en: { vignoble: 'vineyard', vins: 'wines', 'cuvee-des-apprentis': 'apprentice-wines', oenotourisme: 'wine-tourism', partenaires: 'partners', sponsoring: 'sponsorship', contact: 'contact', panier: 'cart', connexion: 'login', 'mon-compte': 'my-account', 'conditions-generales': 'terms', 'a-propos': 'about', actualites: 'news' },
  de: { vignoble: 'weinberg', vins: 'weine', 'cuvee-des-apprentis': 'lehrlingsweine', oenotourisme: 'weintourismus', partenaires: 'partner', sponsoring: 'sponsoring', contact: 'kontakt', panier: 'warenkorb', connexion: 'anmelden', 'mon-compte': 'mein-konto', 'conditions-generales': 'agb', 'a-propos': 'ueber-uns', actualites: 'aktuelles' },
};

// Build reverse maps: for each language, map translated slug -> FR key
const reverseRouteMap = {};
for (const lang of Object.keys(routeMap)) {
  reverseRouteMap[lang] = {};
  for (const [frKey, translatedSlug] of Object.entries(routeMap[lang])) {
    reverseRouteMap[lang][translatedSlug] = frKey;
  }
}

function detectLangFromPath(pathname) {
  if (pathname.startsWith('/en/') || pathname === '/en') return 'en';
  if (pathname.startsWith('/de/') || pathname === '/de') return 'de';
  return 'fr';
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Given a current pathname, determine the "FR key" route segments.
 * E.g. /en/wines/fendant -> { lang: 'en', frSegments: ['vins', 'fendant'] }
 */
function parsePath(pathname) {
  const lang = detectLangFromPath(pathname);
  let rest = pathname;

  // Strip language prefix
  if (lang === 'en') rest = pathname.replace(/^\/en\/?/, '/');
  else if (lang === 'de') rest = pathname.replace(/^\/de\/?/, '/');

  // rest is now e.g. "/wines/fendant" or "/" or "/wines"
  const segments = rest.split('/').filter(Boolean);

  if (segments.length === 0) {
    return { lang, frKey: null, extra: [] };
  }

  // The first segment should be a translated route slug
  const firstSegment = segments[0];
  const frKey = reverseRouteMap[lang][firstSegment] || firstSegment;
  const extra = segments.slice(1);

  return { lang, frKey, extra };
}

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const lang = detectLangFromPath(location.pathname);

  // Set lang attribute on <html> for accessibility and SEO
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((newLang) => {
    if (!translations[newLang] || newLang === lang) return;

    const { frKey, extra } = parsePath(location.pathname);

    let newPath;
    if (!frKey) {
      // Home page
      newPath = newLang === 'fr' ? '/' : `/${newLang}`;
    } else {
      const translatedSlug = routeMap[newLang][frKey] || frKey;
      const prefix = newLang === 'fr' ? '' : `/${newLang}`;
      newPath = `${prefix}/${translatedSlug}${extra.length > 0 ? '/' + extra.join('/') : ''}`;
    }

    navigate(newPath);
  }, [lang, location.pathname, navigate]);

  const localePath = useCallback((path) => {
    if (path === undefined || path === null || path === '') {
      return lang === 'fr' ? '/' : `/${lang}`;
    }

    // Split path into segments
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 0) {
      return lang === 'fr' ? '/' : `/${lang}`;
    }

    // Translate the first segment (the route key) using FR key
    const firstSegment = segments[0];
    const translatedFirst = routeMap[lang][firstSegment] || firstSegment;
    const rest = segments.slice(1);

    const prefix = lang === 'fr' ? '' : `/${lang}`;
    return `${prefix}/${translatedFirst}${rest.length > 0 ? '/' + rest.join('/') : ''}`;
  }, [lang]);

  const t = useCallback((key) => {
    const value = getNestedValue(translations[lang], key);
    if (value !== undefined && typeof value === 'string') return value;
    // Fallback to French
    if (lang !== 'fr') {
      const fallback = getNestedValue(translations.fr, key);
      if (fallback !== undefined && typeof fallback === 'string') return fallback;
    }
    // Return the key itself as last resort
    return key;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t, localePath }), [lang, setLang, t, localePath]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
