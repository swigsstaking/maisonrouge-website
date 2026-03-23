import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import productTranslations from '../data/productTranslations.json';
import staticProducts from '../data/staticProducts.js';

const KNOWN_KEYS_BY_LANG = {
  fr: ['Cépage', 'Robe', 'Nez', 'Bouche', 'Alcool', 'Température de service', 'Conservation', 'Elevage', 'Élevage', 'Appellation', 'Accords gourmands', 'Allergènes', 'Millésime'],
  en: ['Grape variety', 'Colour', 'Nose', 'Palate', 'Alcohol', 'Serving temperature', 'Ageing potential', 'Ageing', 'Appellation', 'Food pairing', 'Allergens', 'Vintage'],
  de: ['Rebsorte', 'Farbe', 'Nase', 'Gaumen', 'Alkohol', 'Serviertemperatur', 'Lagerfähigkeit', 'Ausbau', 'Appellation', 'Speisenempfehlung', 'Allergene', 'Jahrgang'],
};

function parseDescription(description, lang = 'fr') {
  if (!description) return { intro: '', details: [] };

  const KNOWN_KEYS = KNOWN_KEYS_BY_LANG[lang] || KNOWN_KEYS_BY_LANG.fr;
  const lines = description.split('\n');
  const intro = [];
  const details = [];
  let foundFirstKey = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const matchedKey = KNOWN_KEYS.find(
      (key) => trimmed.startsWith(key + ' :') || trimmed.startsWith(key + ':')
    );

    if (matchedKey) {
      foundFirstKey = true;
      const separatorIndex = trimmed.indexOf(':');
      const value = trimmed.substring(separatorIndex + 1).trim();
      details.push({ key: matchedKey, value });
    } else if (!foundFirstKey) {
      intro.push(trimmed);
    } else {
      // Continuation of last detail or standalone text
      if (details.length > 0) {
        details[details.length - 1].value += ' ' + trimmed;
      }
    }
  }

  return { intro: intro.join(' '), details };
}

const ProductDetail = () => {
  const { slug } = useParams();
  const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';
  const siteInfo = useSiteInfo();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { t, localePath, lang } = useLanguage();
  const [added, setAdded] = useState(false);

  // Static product data (renders immediately for SSG)
  const staticProduct = staticProducts.find(p => p.slug === slug);

  // API data (loads async for cart/enhanced features)
  const { data: apiProduct } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/products/public/${slug}?siteId=maisonrouge`);
      if (!res.ok) throw new Error('Product not found');
      const json = await res.json();
      return json.data;
    },
  });

  // Merge: static data for immediate render, API data for cart features
  const product = apiProduct || (staticProduct ? {
    ...staticProduct,
    price: { amount: staticProduct.price, currency: 'CHF' },
    images: [staticProduct.image],
  } : null);

  if (!product) {
    return (
      <>
        <SEOHead page="vins" />
        {/* Banner */}
        <section className="relative h-32 md:h-48 w-full overflow-hidden">
          <img
            src="/banner-small1.jpg"
            alt={t('product.notFound')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </section>
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
          <h2 className="text-2xl font-bold text-secondary-800 font-['Raleway'] mb-4">
            {t('product.notFound')}
          </h2>
          <p className="text-secondary-600 font-['Raleway'] mb-6">
            {t('product.notFoundText')}
          </p>
          <Link
            to={localePath('vins')}
            className="bg-primary-600 text-white uppercase text-sm font-bold tracking-wider py-2 px-6 hover:bg-primary-700 transition-colors duration-200 font-['Raleway']"
          >
            {t('product.backLink')}
          </Link>
        </div>
      </>
    );
  }

  const translatedDesc = productTranslations[product.slug]?.[lang];
  const descriptionToUse = translatedDesc || product.description;
  const { intro, details } = parseDescription(descriptionToUse, lang);
  const mainImage = product.images?.[0];

  return (
    <>
      <SEOHead page="vins" />

      {/* Banner */}
      <section className="relative h-32 md:h-48 w-full overflow-hidden">
        <img
          src="/banner-small1.jpg"
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </section>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-secondary-600 font-['Raleway']">
          <Link to={localePath('vins')} className="hover:text-primary-600 transition-colors">
            {t('product.backToWines')}
          </Link>
          <span>/</span>
          <span className="text-secondary-800">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Left Column - Image */}
            <div className="w-full md:w-5/12 flex items-start justify-center sticky top-24">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full object-contain"
                />
              ) : (
                <div className="w-full h-80 bg-stone-100 flex items-center justify-center text-secondary-400 font-['Raleway']">
                  {t('product.noImage')}
                </div>
              )}
            </div>

            {/* Right Column - Info */}
            <div className="w-full md:w-7/12">
              <h1 className="text-xl font-bold text-secondary-800 uppercase tracking-wide font-['Raleway'] mb-4">
                {product.name}
              </h1>

              {intro && (
                <p className="italic text-secondary-600 font-['Raleway'] text-sm mb-6 leading-relaxed">
                  {intro}
                </p>
              )}

              {/* Structured Details */}
              {details.length > 0 && (
                <dl className="space-y-3 mb-8">
                  {details.map((detail, index) => (
                    <div key={index}>
                      <dt className="text-xs font-bold uppercase tracking-wider text-primary-600 font-['Raleway']">
                        {detail.key}
                      </dt>
                      <dd className="text-sm text-secondary-700 font-['Raleway'] mt-0.5">
                        {detail.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* Divider */}
              <hr className="border-gray-200 mb-6" />

              {/* Price */}
              <p className="text-2xl font-bold text-secondary-900 font-['Raleway'] mb-1">
                CHF {product.price?.amount?.toFixed(2)}
              </p>
              {product.price?.unit && (
                <p className="text-xs text-secondary-500 font-['Raleway'] mb-6">
                  {t('product.content')} : {product.price.unit}
                </p>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-secondary-700 font-['Raleway']">{t('product.quantity')}</span>
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-secondary-700 hover:bg-gray-100 transition-colors font-['Raleway'] text-lg"
                    aria-label="Diminuer la quantité"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    aria-label="Quantité"
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val >= 1) setQuantity(val);
                    }}
                    className="w-14 h-10 text-center border-x border-gray-300 text-sm font-['Raleway'] text-secondary-800 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-secondary-700 hover:bg-gray-100 transition-colors font-['Raleway'] text-lg"
                    aria-label="Augmenter la quantité"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  addToCart(product, quantity);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className={`w-full md:w-auto uppercase text-sm font-bold tracking-wider py-3 px-10 transition-colors duration-200 font-['Raleway'] ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {added ? t('product.added') : t('product.addToCart')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
