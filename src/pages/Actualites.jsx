import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import BLOG_POSTS from '../data/blogPosts';

const CATEGORIES = ['all', 'recettes', 'evenements', 'vins'];

const Actualites = () => {
  const { t, localePath } = useLanguage();
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
            aria-label="Filtrer par catégorie"
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
                <Link to={localePath(`actualites/${post.slug}`)} className="block">
                  <h2 className="font-bold text-secondary-800 hover:text-primary-600 transition-colors mb-2 text-lg">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-secondary-600 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <Link to={localePath(`actualites/${post.slug}`)} className="text-primary-600 text-sm uppercase font-semibold tracking-wide hover:underline">
                  {t('actualites.readMore')}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Actualites;
