import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Vignoble = () => {
  const siteInfo = useSiteInfo();
  const { t, localePath } = useLanguage();

  return (
    <>
      <SEOHead page="vignoble" />

      {/* Page Banner */}
      <section className="relative h-48 md:h-64 w-full overflow-hidden">
        <img
          src="/banner-small1.jpg"
          alt="Vignoble Maison Rouge"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wider font-['Raleway']">
            {t('vignoble.title')}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-600 uppercase tracking-wider mb-10 font-['Raleway']">
            {t('vignoble.title')}
          </h2>

          <div className="space-y-6 text-gray-700 leading-relaxed font-['Raleway']">
            <p>
              {t('vignoble.text1')}
            </p>

            <p>
              {t('vignoble.text2')}
            </p>

            <p>
              {t('vignoble.text3')}
            </p>

            <p>
              {t('vignoble.text4')}
            </p>
          </div>

          <div className="mt-12">
            <Link
              to={localePath('vins')}
              className="inline-block text-primary-600 font-semibold uppercase tracking-wider text-sm border-b-2 border-primary-600 pb-1 hover:text-primary-800 hover:border-primary-800 transition-colors font-['Raleway']"
            >
              {t('vignoble.cta')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Vignoble;
