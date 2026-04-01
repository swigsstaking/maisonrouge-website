import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../hooks/useProducts';

const staticProducts = [
  // Vins Blanc
  { name: 'Fendant', price: '17.00', image: '/wines/fendant.jpg', slug: 'fendant', category: 'Vins Blanc' },
  { name: 'Johannisberg', price: '19.00', image: '/wines/johannisberg.jpg', slug: 'johannisberg', category: 'Vins Blanc' },
  { name: 'Païen / Heida', price: '16.00', image: '/wines/paien.jpg', slug: 'paien', category: 'Vins Blanc' },
  { name: 'Petite Arvine', price: '26.00', image: '/wines/petite-arvine.jpg', slug: 'petite-arvine', category: 'Vins Blanc' },
  { name: 'Humagne Blanc', price: '26.00', image: '/wines/humagne-blanc.jpg', slug: 'humagne-blanc', category: 'Vins Blanc' },
  { name: 'Marsanne', price: '26.00', image: '/wines/marsanne.jpg', slug: 'marsanne', category: 'Vins Blanc' },
  { name: 'Sion Doux', price: '29.00', image: '/wines/sion-doux.jpg', slug: 'sion-doux', category: 'Vins Blanc' },

  // Vin Rosé
  { name: 'Rosé de Syrah', price: '19.00', image: '/wines/rose-syrah.jpg', slug: 'rose-syrah', category: 'Vin Rosé' },

  // Vins Rouge
  { name: 'Gamay', price: '17.00', image: '/wines/gamay.jpg', slug: 'gamay', category: 'Vins Rouge' },
  { name: 'Pinot Noir', price: '18.00', image: '/wines/pinot-noir.jpg', slug: 'pinot-noir', category: 'Vins Rouge' },
  { name: 'Humagne Rouge', price: '16.00', image: '/wines/humagne-rouge.jpg', slug: 'humagne-rouge', category: 'Vins Rouge' },
  { name: 'Syrah', price: '28.00', image: '/wines/syrah.jpg', slug: 'syrah', category: 'Vins Rouge' },
  { name: 'Cornalin', price: '32.00', image: '/wines/cornalin.jpg', slug: 'cornalin', category: 'Vins Rouge' },
  { name: 'Merlot', price: '33.00', image: '/wines/merlot.jpg', slug: 'merlot', category: 'Vins Rouge' },

  // Créations
  { name: 'é boé Brut', price: '44.00', image: '/wines/e-boe.jpg', slug: 'e-boe', category: 'Créations' },
  { name: 'Torpa', price: '36.00', image: '/wines/torpa.jpg', slug: 'torpa', category: 'Créations' },
  { name: 'Lo Grafion', price: '49.00', image: '/wines/lo-grafion.jpg', slug: 'lo-grafion', category: 'Créations' },
  { name: 'Purple Rain - ÉDITION LIMITÉE', price: '95.00', image: '/wines/purple-rain.jpg', slug: 'purple-rain', category: 'Créations' },
  { name: 'Lo Teron', price: '37.00', image: '/wines/lo-teron.jpg', slug: 'lo-teron', category: 'Créations' },
  { name: 'Gota', price: '95.00', image: '/wines/gota.jpg', slug: 'gota', category: 'Créations' },
  { name: 'Lo Grafion Réserve', price: '195.00', image: '/wines/lo-grafion-reserve.jpg', slug: 'lo-grafion-reserve', category: 'Créations' },
  { name: 'Lo Mota', price: '35.00', image: '/wines/lo-mota.jpg', slug: 'lo-mota', category: 'Créations' },

  // Vins des Apprentis
  { name: 'Valentine', price: '19.00', image: '/wines/valentine.jpg', slug: 'valentine', category: 'Vins des Apprentis' },

  // Produits Dérivés
  { name: 'Tire-bouchon', price: '195.00', image: '/wines/tire-bouchon.jpg', slug: 'tire-bouchon', category: 'Produits Dérivés' },
  { name: 'Huile de pépins de raisin - Lo Grafion', price: '55.00', image: '/wines/huile-lo-grafion.jpg', slug: 'huile-lo-grafion', category: 'Produits Dérivés' },
  { name: 'Huile de pépins de raisin - Petite Arvine', price: '55.00', image: '/wines/huile-petite-arvine.jpg', slug: 'huile-petite-arvine', category: 'Produits Dérivés' },
  { name: 'Huile de pépins de raisin - Syrah', price: '55.00', image: '/wines/huile-syrah.jpg', slug: 'huile-syrah', category: 'Produits Dérivés' },
  { name: 'ISOVIN', price: '95.00', image: '/wines/isovin.jpg', slug: 'isovin', category: 'Produits Dérivés' },
  { name: 'é boé Brut et bouchon à bulle', price: '44.00', image: '/wines/e-boe-noel.jpg', slug: 'e-boe-noel', category: 'Produits Dérivés' },
];

const categoryKeys = {
  'Vins Blanc': 'vinsFilter.vinsBlanc',
  'Vin Rosé': 'vinsFilter.vinRose',
  'Vins Rouge': 'vinsFilter.vinsRouge',
  'Créations': 'vinsFilter.creations',
  'Vins des Apprentis': 'vinsFilter.vinsApprentis',
  'Produits Dérivés': 'vinsFilter.produitsDerives',
};

const categoryValues = [
  'Vins Blanc',
  'Vin Rosé',
  'Vins Rouge',
  'Créations',
  'Vins des Apprentis',
  'Produits Dérivés',
];

const Vins = () => {
  const siteInfo = useSiteInfo();
  const { addToCart } = useCart();
  const { t, localePath } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedSlug, setAddedSlug] = useState(null);
  const apiProducts = useProducts();

  // Use API products if available, fallback to static
  const products = apiProducts.length > 0 ? apiProducts.map(p => ({
    name: p.name,
    price: typeof p.price === 'object' ? p.price.amount?.toFixed(2) : p.price,
    image: p.images?.[0] || p.image,
    slug: p.slug,
    category: p.category,
    _id: p._id,
  })) : staticProducts;

  const shopProducts = products.filter((p) => p.category !== 'Vieux Millésimes');

  const filteredProducts =
    activeCategory === 'all'
      ? shopProducts
      : shopProducts.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEOHead page="vins" />

      {/* Banner */}
      <section className="relative h-48 md:h-64 w-full overflow-hidden">
        <img
          src="/banner-small1.jpg"
          alt={t('vins.title')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wider font-['Raleway']">
            {t('vins.title')}
          </h1>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            aria-label="Filtrer par catégorie"
            className="w-full md:w-auto border border-gray-300 rounded px-4 py-2 text-sm font-['Raleway'] text-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
          >
            <option value="all">{t('vins.filter.all')}</option>
            {categoryValues.map((cat) => (
              <option key={cat} value={cat}>
                {t(categoryKeys[cat])}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {filteredProducts.map((product) => (
              <Link
                key={product.slug}
                to={localePath(`vins/${product.slug}`)}
                className="flex flex-row items-center border-b border-gray-200 p-4 hover:bg-white transition-colors duration-200"
              >
                {/* Product Image */}
                <div className="w-2/5 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-40 object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="w-3/5 pl-4 flex flex-col justify-center">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-secondary-800 font-['Raleway'] mb-2">
                    {product.name}
                  </h2>
                  <p className="text-primary-600 font-bold font-['Raleway'] mb-3">
                    CHF {product.price}
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product, 1);
                      setAddedSlug(product.slug);
                      setTimeout(() => setAddedSlug(null), 2000);
                    }}
                    className={`text-sm uppercase font-bold py-2.5 px-4 transition-colors duration-200 font-['Raleway'] self-start ${
                      addedSlug === product.slug
                        ? 'bg-green-600 text-white'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {addedSlug === product.slug ? t('vins.added') : t('vins.addToCart')}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Vins;
