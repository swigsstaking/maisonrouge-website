import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';

const BLOG_POSTS = [
  // Recettes
  { title: "Filet mignon aux champignons", slug: "filet-mignon", image: "/blog/filet-mignon.jpg", category: "recettes", excerpt: "Plat délicieux à base de viande fondante, de champignons des bois et d'oignons du potager." },
  { title: "Poisson à la crème", slug: "poisson-creme", image: "/blog/poisson-creme.jpg", category: "recettes", excerpt: "Une recette à base de poisson à la crème." },
  { title: "Rôti de cerf aux airelles", slug: "roti-cerf", image: "/blog/roti-cerf.jpg", category: "recettes", excerpt: "Recette automnale: un rôti de cerf aux airelles accompagné de vins rouges." },
  { title: "Magret de canard aux figues", slug: "magret-figues", image: "/blog/magret-figues.jpg", category: "recettes", excerpt: "Une recette automnale de circonstance en cette période de chasse." },
  { title: "Velouté châtaigne-foie gras à l'Humagne Blanc", slug: "veloute-chataigne", image: "/blog/veloute-chataigne.jpg", category: "recettes", excerpt: "Entrée chic mariant châtaigne, foie gras et Humagne Blanc." },
  { title: "Magret de canard au Cornalin", slug: "magret-cornalin", image: "/blog/magret-cornalin.jpg", category: "recettes", excerpt: "Cuisinez un magret de canard au Cornalin pour les fêtes." },
  { title: "Feuilleté de volaille à l'Humagne Blanc", slug: "feuillete-volaille", image: "/blog/feuillete-volaille.jpg", category: "recettes", excerpt: "Recette simple en apéritif ou en entrée." },
  { title: "Truffes choco - Sion doux", slug: "truffes-choco", image: "/blog/truffes-choco.jpg", category: "recettes", excerpt: "Recette incontournable de Noël : les truffes au chocolat." },
  { title: "Panna Cotta framboise à l'Humagne Rouge", slug: "panna-cotta", image: "/blog/panna-cotta.jpg", category: "recettes", excerpt: "Dessert frais qui enchantera vos convives avec notre Humagne Rouge." },
  { title: "Risotto del mar au Païen", slug: "risotto-paien", image: "/blog/risotto.jpg", category: "recettes", excerpt: "Recette associant notre vin blanc Païen avec les produits de la mer." },
  { title: "Vin chaud au Merlot", slug: "vin-chaud", image: "/blog/vin-chaud.jpg", category: "recettes", excerpt: "Vin chaud parfumé aux épices de Noël, à savourer au coin du feu." },
  { title: "Dinde farcie au Pinot Noir de Sierre", slug: "dinde-pinot", image: "/blog/dinde-pinot.jpg", category: "recettes", excerpt: "La dinde de Noël revisitée avec une sauce au Pinot noir de Sierre." },
  // Événements
  { title: "Oenotourisme", slug: "oenotourisme-blog", image: "/blog/oenotourisme.jpg", category: "evenements", excerpt: "Envie de découvrir nos vins ? Visiter nos vignobles et nos caves ?" },
  // Vins / Millésimes
  { title: "Millésime 2016", slug: "millesime-2016", image: "/blog/millesime-2016.jpg", category: "vins", excerpt: "Retour sur le millésime 2016, une année marquée par des conditions climatiques contrastées." },
  { title: "Millésime 2015", slug: "millesime-2015", image: "/blog/millesime-2015.jpg", category: "vins", excerpt: "Le millésime 2015, un grand cru solaire aux arômes généreux." },
  { title: "Millésime 2014", slug: "millesime-2014", image: "/blog/millesime-2014.jpg", category: "vins", excerpt: "Le millésime 2014, une année d'élégance et de fraîcheur." },
  { title: "Millésime 2013", slug: "millesime-2013", image: "/blog/millesime-2013.jpg", category: "vins", excerpt: "Le millésime 2013, un millésime tardif aux tanins soyeux." },
  { title: "Millésime 2012", slug: "millesime-2012", image: "/blog/millesime-2012.jpg", category: "vins", excerpt: "Le millésime 2012, une récolte équilibrée et prometteuse." },
  { title: "Millésime 2011", slug: "millesime-2011", image: "/blog/millesime-2011.jpg", category: "vins", excerpt: "Le millésime 2011, une année précoce aux rendements maîtrisés." },
  { title: "Millésime 2010", slug: "millesime-2010", image: "/blog/millesime-2010.jpg", category: "vins", excerpt: "Le millésime 2010, un millésime classique du Valais." },
  { title: "Millésime 2009", slug: "millesime-2009", image: "/blog/millesime-2009.jpg", category: "vins", excerpt: "Le millésime 2009, une année solaire d'une grande richesse aromatique." },
  { title: "Millésime 2008", slug: "millesime-2008", image: "/blog/millesime-2008.jpg", category: "vins", excerpt: "Le millésime 2008, une année fraîche aux vins structurés et fins." },
  { title: "Millésime 2007", slug: "millesime-2007", image: "/blog/millesime-2007.jpg", category: "vins", excerpt: "Le millésime 2007, un cru précoce aux notes fruitées intenses." },
  { title: "Vintage 2006", slug: "millesime-2006", image: "/blog/millesime-2006.jpg", category: "vins", excerpt: "Le millésime 2006, une année chaude aux vins concentrés et puissants." },
  { title: "Millésime 2005", slug: "millesime-2005", image: "/blog/millesime-2005.jpg", category: "vins", excerpt: "Le millésime 2005, un grand millésime d'exception pour le Valais." },
  { title: "Millésime 2004", slug: "millesime-2004", image: "/blog/millesime-2004.jpg", category: "vins", excerpt: "Le millésime 2004, une année de caractère aux vins bien charpentés." },
];

const CATEGORIES = ['all', 'recettes', 'evenements', 'vins'];

const Actualites = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = activeCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === activeCategory);

  const categoryLabelMap = {
    all: 'actualites.filterAll',
    recettes: 'actualites.filterRecettes',
    evenements: 'actualites.filterEvenements',
    vins: 'actualites.filterVins',
  };

  return (
    <>
      <SEOHead page="actualites" />

      {/* Page Banner */}
      <section className="relative h-48 md:h-64 w-full overflow-hidden">
        <img
          src="/banner-small1.jpg"
          alt="Actualités Maison Rouge"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-widest uppercase">
            {t('actualites.title')}
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container-site py-12 md:py-16 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-4">
          {t('actualites.intro1')}
        </h2>
        <p className="text-secondary-600 mb-2">
          {t('actualites.intro2')}
        </p>
        <p className="text-secondary-600">
          {t('actualites.intro3')}
        </p>
      </section>

      {/* Category Filter */}
      <section className="container-site pb-8">
        <div className="flex justify-center">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="border border-secondary-300 rounded px-4 py-2 text-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {t(categoryLabelMap[cat])}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Blog Post Grid */}
      <section className="container-site pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-t"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h2 className="font-bold text-secondary-800 hover:text-primary-600 transition-colors mb-2 text-lg">
                  {post.title}
                </h2>
                <p className="text-sm text-secondary-600 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <span className="text-primary-600 text-sm uppercase font-semibold tracking-wide cursor-pointer hover:underline">
                  {t('actualites.readMore')}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Actualites;
