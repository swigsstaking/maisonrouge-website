// Static product data used for SSG prerendering and catalog display
// This ensures product pages render immediately without API calls

const staticProducts = [
  { name: 'Fendant', price: 17, image: '/wines/fendant.jpg', slug: 'fendant', category: 'Vins Blanc' },
  { name: 'Johannisberg', price: 19, image: '/wines/johannisberg.jpg', slug: 'johannisberg', category: 'Vins Blanc' },
  { name: 'Païen / Heida', price: 16, image: '/wines/paien.jpg', slug: 'paien', category: 'Vins Blanc' },
  { name: 'Petite Arvine', price: 26, image: '/wines/petite-arvine.jpg', slug: 'petite-arvine', category: 'Vins Blanc' },
  { name: 'Humagne Blanc', price: 26, image: '/wines/humagne-blanc.jpg', slug: 'humagne-blanc', category: 'Vins Blanc' },
  { name: 'Marsanne', price: 26, image: '/wines/marsanne.jpg', slug: 'marsanne', category: 'Vins Blanc' },
  { name: 'Sion Doux', price: 29, image: '/wines/sion-doux.jpg', slug: 'sion-doux', category: 'Vins Blanc' },
  { name: 'Rosé de Syrah', price: 19, image: '/wines/rose-syrah.jpg', slug: 'rose-de-syrah', category: 'Vin Rosé' },
  { name: 'Gamay', price: 17, image: '/wines/gamay.jpg', slug: 'gamay', category: 'Vins Rouge' },
  { name: 'Pinot Noir', price: 18, image: '/wines/pinot-noir.jpg', slug: 'pinot-noir', category: 'Vins Rouge' },
  { name: 'Humagne Rouge', price: 16, image: '/wines/humagne-rouge.jpg', slug: 'humagne-rouge', category: 'Vins Rouge' },
  { name: 'Syrah', price: 28, image: '/wines/syrah.jpg', slug: 'syrah', category: 'Vins Rouge' },
  { name: 'Cornalin', price: 32, image: '/wines/cornalin.jpg', slug: 'cornalin', category: 'Vins Rouge' },
  { name: 'Merlot', price: 33, image: '/wines/merlot.jpg', slug: 'merlot', category: 'Vins Rouge' },
  { name: 'è boè Brut', price: 44, image: '/wines/e-boe.jpg', slug: 'e-boe', category: 'Créations' },
  { name: 'Torpâ', price: 36, image: '/wines/torpa.jpg', slug: 'torpa', category: 'Créations' },
  { name: 'Lo Grafion', price: 49, image: '/wines/lo-grafion.jpg', slug: 'lo-grafion', category: 'Créations' },
  { name: 'Purple Rain - ÉDITION LIMITÉE', price: 95, image: '/wines/purple-rain.jpg', slug: 'purple-rain', category: 'Créations' },
  { name: 'Lo Terôn', price: 37, image: '/wines/lo-teron.jpg', slug: 'lo-teron', category: 'Créations' },
  { name: 'Gota', price: 95, image: '/wines/gota.jpg', slug: 'gota', category: 'Créations' },
  { name: 'Lo Grafion Réserve', price: 195, image: '/wines/lo-grafion-reserve.jpg', slug: 'lo-grafion-reserve', category: 'Créations' },
  { name: 'Lo Môta', price: 35, image: '/wines/lo-mota.jpg', slug: 'lo-mota', category: 'Créations' },
  { name: 'Valentine', price: 19, image: '/wines/valentine.jpg', slug: 'valentine', category: 'Vins des Apprentis' },
  { name: 'Tire-bouchon', price: 195, image: '/wines/tire-bouchon.jpg', slug: 'tire-bouchon', category: 'Produits Dérivés' },
  { name: 'Huile de pépins de raisin - Lo Grafion', price: 55, image: '/wines/huile-lo-grafion.jpg', slug: 'huile-lo-grafion', category: 'Produits Dérivés' },
  { name: 'Huile de pépins de raisin - Petite Arvine', price: 55, image: '/wines/huile-petite-arvine.jpg', slug: 'huile-petite-arvine', category: 'Produits Dérivés' },
  { name: 'Huile de pépins de raisin - Syrah', price: 55, image: '/wines/huile-syrah.jpg', slug: 'huile-syrah', category: 'Produits Dérivés' },
  { name: 'ISOVIN', price: 95, image: '/wines/isovin.jpg', slug: 'isovin-product', category: 'Produits Dérivés' },
  { name: 'è boè Brut et bouchon à bulle', price: 44, image: '/wines/e-boe-noel.jpg', slug: 'e-boe-noel', category: 'Produits Dérivés' },
];

export default staticProducts;
