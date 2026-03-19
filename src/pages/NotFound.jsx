import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
  const { t, localePath } = useLanguage();

  return (
    <>
      <SEOHead page="home" />

      {/* Banner */}
      <section className="relative h-48 md:h-64 w-full overflow-hidden">
        <img
          src="/banner-small1.jpg"
          alt="Page introuvable"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wider font-['Raleway']">
            404
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-32 bg-stone-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-600 uppercase tracking-wider mb-6 font-['Raleway']">
            Page introuvable
          </h2>
          <p className="text-secondary-700 leading-relaxed mb-10 font-['Raleway']">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link
            to={localePath('')}
            className="inline-block px-8 py-3 bg-primary-600 text-white font-semibold uppercase tracking-wider text-sm hover:bg-primary-700 transition-colors font-['Raleway']"
          >
            Retour à l'accueil
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;
