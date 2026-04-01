import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Wine, Grape, Timer, Warehouse, Baby, Heart, Building2, ShoppingCart, Check, Filter } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';
const DOMAIN = 'https://maisonrouge.swigs.online';
const VM_CATEGORY_SLUG = 'vieux-millesimes';

const MillesimesAnciens = () => {
  const { t, lang, localePath } = useLanguage();
  const { siteId } = useAuth();
  const { addToCart } = useCart();

  const [filterYear, setFilterYear] = useState('all');
  const [filterWine, setFilterWine] = useState('all');
  const [addedVariants, setAddedVariants] = useState({});

  // Fetch Vieux Millésimes products from API
  const { data: vmProducts = [] } = useQuery({
    queryKey: ['vieux-millesimes', siteId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/products/public?siteId=${siteId || 'maisonrouge'}`);
      if (!res.ok) return [];
      const json = await res.json();
      return (json.data || []).filter(p =>
        p.category?.slug === VM_CATEGORY_SLUG || p.category?.name === 'Vieux Millésimes'
      );
    },
    staleTime: 1000 * 60 * 5,
  });

  // Extract unique years and wine names from IN-STOCK variants only
  const { years, wineNames, hasAnyStock } = useMemo(() => {
    const yearsSet = new Set();
    const namesSet = new Set();
    vmProducts.forEach(p => {
      const wineName = p.name.replace(' - Vieux Millésime', '');
      const inStockVariants = (p.variants || []).filter(v => v.stock > 0);
      if (inStockVariants.length > 0) {
        namesSet.add(wineName);
        inStockVariants.forEach(v => yearsSet.add(v.name));
      }
    });
    return {
      years: [...yearsSet].sort((a, b) => b - a),
      wineNames: [...namesSet].sort(),
      hasAnyStock: yearsSet.size > 0,
    };
  }, [vmProducts]);

  // Flatten variants with parent product info, apply filters
  const filteredVariants = useMemo(() => {
    const list = [];
    vmProducts.forEach(product => {
      const wineName = product.name.replace(' - Vieux Millésime', '');
      if (filterWine !== 'all' && wineName !== filterWine) return;
      (product.variants || []).forEach(variant => {
        if (variant.stock <= 0) return;
        if (filterYear !== 'all' && variant.name !== filterYear) return;
        list.push({ product, variant, wineName });
      });
    });
    // Sort by year desc, then wine name
    list.sort((a, b) => b.variant.name.localeCompare(a.variant.name) || a.wineName.localeCompare(b.wineName));
    return list;
  }, [vmProducts, filterYear, filterWine]);

  const handleAddToCart = (product, variant) => {
    const cartProduct = {
      _id: product._id,
      variantId: variant._id,
      name: `${product.name.replace(' - Vieux Millésime', '')} ${variant.name}`,
      slug: `${product.slug}-${variant.name}`,
      price: { amount: variant.price, currency: 'CHF' },
      image: variant.image || product.images?.[0] || '',
    };
    addToCart(cartProduct, 1);
    setAddedVariants(prev => ({ ...prev, [variant._id]: true }));
    setTimeout(() => setAddedVariants(prev => ({ ...prev, [variant._id]: false })), 2000);
  };

  const conceptCards = [
    { key: 'Naissance', icon: <Baby className="w-8 h-8" /> },
    { key: 'Mariage', icon: <Heart className="w-8 h-8" /> },
    { key: 'Entreprise', icon: <Building2 className="w-8 h-8" /> },
  ];

  const qualiteCards = [
    { key: 'Barrique', icon: <Wine className="w-8 h-8" /> },
    { key: 'Cepages', icon: <Grape className="w-8 h-8" /> },
    { key: 'Conservation', icon: <Timer className="w-8 h-8" /> },
    { key: 'Cave', icon: <Warehouse className="w-8 h-8" /> },
  ];

  // JSON-LD
  const vintageJsonLd = vmProducts.flatMap(p =>
    (p.variants || []).map(v => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${p.name.replace(' - Vieux Millésime', '')} ${v.name} - Maison Rouge`,
      description: p.shortDescription || p.description || '',
      image: p.images?.[0] ? `${DOMAIN}${p.images[0]}` : `${DOMAIN}/logo.jpg`,
      brand: { '@type': 'Brand', name: 'Maison Rouge' },
      offers: {
        '@type': 'Offer',
        price: v.price,
        priceCurrency: 'CHF',
        availability: v.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: { '@type': 'Organization', name: 'Maison Rouge', url: DOMAIN },
      },
      category: 'Vieux Millésimes',
    }))
  );

  return (
    <>
      <SEOHead page="millesimes" />

      <Helmet>
        {vintageJsonLd.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(vintageJsonLd)}
          </script>
        )}
      </Helmet>

      {/* 1. Hero */}
      <section className="relative h-64 md:h-80">
        <img
          src="/banner-small2.jpg"
          alt={t('millesimes.title')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider uppercase font-['Raleway'] mb-3 drop-shadow-lg">
            {t('millesimes.title')}
          </h1>
          <p className="text-base md:text-xl text-white font-light max-w-2xl drop-shadow-md">
            {t('millesimes.heroText')}
          </p>
        </div>
      </section>

      {/* 2. Concept */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-800 text-center mb-4">
            {t('millesimes.conceptTitle')}
          </h2>
          <p className="text-secondary-600 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            {t('millesimes.conceptIntro')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {conceptCards.map(card => (
              <div key={card.key} className="bg-secondary-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-secondary-800 mb-3">
                  {t(`millesimes.concept${card.key}`)}
                </h3>
                <p className="text-secondary-600 text-sm leading-relaxed">
                  {t(`millesimes.concept${card.key}Text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Grille e-commerce des millésimes */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-800 text-center mb-2">
            {t('millesimes.gridTitle')}
          </h2>
          <p className="text-secondary-500 text-center mb-8">
            {t('millesimes.gridSubtitle')}
          </p>

          {/* Filters - only show if there's stock */}
          {hasAnyStock && <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-secondary-400" />
              <select
                value={filterYear}
                onChange={e => setFilterYear(e.target.value)}
                className="bg-white border border-secondary-200 rounded-lg px-4 py-2.5 text-sm text-secondary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">
                  {lang === 'de' ? 'Alle Jahrgänge' : lang === 'en' ? 'All years' : 'Toutes les années'}
                </option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={filterWine}
                onChange={e => setFilterWine(e.target.value)}
                className="bg-white border border-secondary-200 rounded-lg px-4 py-2.5 text-sm text-secondary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">
                  {lang === 'de' ? 'Alle Weine' : lang === 'en' ? 'All wines' : 'Tous les vins'}
                </option>
                {wineNames.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            {(filterYear !== 'all' || filterWine !== 'all') && (
              <button
                onClick={() => { setFilterYear('all'); setFilterWine('all'); }}
                className="text-sm text-primary-600 hover:text-primary-700 underline"
              >
                {lang === 'de' ? 'Filter zurücksetzen' : lang === 'en' ? 'Reset filters' : 'Réinitialiser'}
              </button>
            )}
          </div>}

          {hasAnyStock && (
            <p className="text-center text-sm text-secondary-400 mb-6">
              {filteredVariants.length} {lang === 'de' ? 'Ergebnisse' : lang === 'en' ? 'results' : 'résultats'}
            </p>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredVariants.map(({ product, variant, wineName }) => {
              const isAdded = addedVariants[variant._id];

              return (
                <div
                  key={variant._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative">
                    <div className="bg-secondary-800 text-white text-center py-3">
                      <span className="text-3xl font-bold font-['Raleway']">{variant.name}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-secondary-800 mb-1">{wineName}</h3>
                    <p className="text-xs text-secondary-400 mb-3">
                      {lang === 'de' ? 'Jahrgang' : lang === 'en' ? 'Vintage' : 'Millésime'} {variant.name}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-primary-600">
                        CHF {variant.price}.-
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700">
                        {variant.stock} {lang === 'de' ? 'verfügbar' : lang === 'en' ? 'available' : 'disponible(s)'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product, variant)}
                      className={`w-full py-2.5 rounded-lg font-semibold text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2 ${
                        isAdded
                          ? 'bg-green-600 text-white'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          {t('vins.added')}
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          {t('vins.addToCart')}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredVariants.length === 0 && (
            <div className="text-center py-12">
              <Wine className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
              <p className="text-secondary-500 text-lg mb-2">
                {lang === 'de'
                  ? 'Momentan keine Jahrgänge verfügbar.'
                  : lang === 'en'
                  ? 'No vintages currently available.'
                  : 'Aucun millésime disponible actuellement.'}
              </p>
              <p className="text-secondary-400 text-sm">
                {lang === 'de'
                  ? 'Kontaktieren Sie uns für Anfragen zu bestimmten Jahrgängen.'
                  : lang === 'en'
                  ? 'Contact us for enquiries about specific vintages.'
                  : 'Contactez-nous pour toute demande concernant un millésime particulier.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Qualité / Garde */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-800 text-center mb-2">
            {t('millesimes.qualiteTitle')}
          </h2>
          <p className="text-secondary-500 text-center mb-12">
            {t('millesimes.qualiteSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {qualiteCards.map(card => (
              <div key={card.key} className="flex gap-5 p-6 bg-secondary-50 rounded-xl">
                <div className="flex-shrink-0 w-14 h-14 bg-primary-600 text-white rounded-lg flex items-center justify-center">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                    {t(`millesimes.qualite${card.key}`)}
                  </h3>
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    {t(`millesimes.qualite${card.key}Text`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Storytelling */}
      <section className="py-16 bg-secondary-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 font-['Raleway']">
            {t('millesimes.storyTitle')}
          </h2>
          <div className="space-y-6 text-white/85 text-lg leading-relaxed italic">
            <p>{t('millesimes.storyText1')}</p>
            <p>{t('millesimes.storyText2')}</p>
            <p>{t('millesimes.storyText3')}</p>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t('millesimes.ctaTitle')}
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            {t('millesimes.ctaText')}
          </p>
          <Link
            to={localePath('contact')}
            className="inline-block bg-white text-primary-600 px-10 py-4 rounded-lg font-bold uppercase tracking-wide hover:bg-secondary-100 transition-colors text-lg"
          >
            {t('millesimes.ctaBtn')}
          </Link>
          <p className="mt-6 text-white/70 text-sm">
            {t('millesimes.ctaPhone')}
          </p>
        </div>
      </section>
    </>
  );
};

export default MillesimesAnciens;
