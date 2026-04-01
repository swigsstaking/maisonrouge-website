import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import BLOG_POSTS from '../data/blogPosts';

const ArticleDetail = () => {
  const { slug } = useParams();
  const { t, localePath } = useLanguage();

  const article = BLOG_POSTS.find((post) => post.slug === slug);

  if (!article) {
    return (
      <>
        <SEOHead page="actualites" />

        {/* Banner */}
        <section className="relative h-32 md:h-48 w-full overflow-hidden">
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

        <section className="container-site py-16 text-center">
          <p className="text-xl text-secondary-700 mb-8">{t('actualites.notFound')}</p>
          <Link
            to={localePath('actualites')}
            className="text-primary-600 uppercase text-sm tracking-wider font-semibold hover:underline"
          >
            {t('actualites.backToList')}
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <SEOHead page="actualites" />

      {/* Banner */}
      <section className="relative h-32 md:h-48 w-full overflow-hidden">
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

      {/* Breadcrumb */}
      <nav className="container-site pt-6 pb-2 max-w-3xl mx-auto">
        <ol className="flex items-center gap-2 text-sm text-secondary-500">
          <li>
            <Link to={localePath('actualites')} className="hover:text-primary-600 transition-colors">
              {t('actualites.title')}
            </Link>
          </li>
          <li>/</li>
          <li className="text-secondary-800 font-medium">{article.title}</li>
        </ol>
      </nav>

      {/* Article Content */}
      <article className="container-site py-8 max-w-3xl mx-auto">
        <h1 className="text-xl uppercase text-primary-600 tracking-wider font-bold mb-4">
          {article.title}
        </h1>

        <div className="w-full overflow-hidden rounded mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {article.content ? (
          <div
            className="text-secondary-700 leading-relaxed prose prose-headings:text-primary-600 prose-headings:uppercase prose-headings:tracking-wider prose-headings:text-base prose-headings:font-bold prose-h3:mt-8 prose-h3:mb-3 prose-ul:my-3 prose-li:my-0.5 prose-p:my-3 prose-a:text-primary-600 max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <div className="text-secondary-700 leading-relaxed space-y-4">
            <p>{article.excerpt}</p>
          </div>
        )}

        <div className="mt-12">
          <Link
            to={localePath('actualites')}
            className="text-primary-600 uppercase text-sm tracking-wider font-semibold hover:underline"
          >
            &larr; {t('actualites.backToList')}
          </Link>
        </div>
      </article>
    </>
  );
};

export default ArticleDetail;
