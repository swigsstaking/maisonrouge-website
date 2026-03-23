import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Home, Wine, Phone } from 'lucide-react';

const NotFound = () => {
  const { t, localePath } = useLanguage();

  return (
    <>
      <SEOHead page="home" />

      {/* Banner */}
      <section className="relative h-48 md:h-64 w-full overflow-hidden">
        <img
          src="/banner-small1.jpg"
          alt="404"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider font-['Raleway']">
            404
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-600 uppercase tracking-wider mb-4 font-['Raleway']">
            {t('notFound.title')}
          </h2>
          <p className="text-secondary-600 leading-relaxed mb-10 font-['Raleway']">
            {t('notFound.text')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={localePath('')}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-semibold uppercase tracking-wider text-sm hover:bg-primary-700 transition-colors font-['Raleway']"
            >
              <Home size={18} />
              {t('notFound.home')}
            </Link>
            <Link
              to={localePath('vins')}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary-600 text-primary-600 font-semibold uppercase tracking-wider text-sm hover:bg-primary-600 hover:text-white transition-colors font-['Raleway']"
            >
              <Wine size={18} />
              {t('notFound.wines')}
            </Link>
            <Link
              to={localePath('contact')}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-secondary-400 text-secondary-600 font-semibold uppercase tracking-wider text-sm hover:bg-secondary-600 hover:text-white transition-colors font-['Raleway']"
            >
              <Phone size={18} />
              {t('notFound.contact')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
