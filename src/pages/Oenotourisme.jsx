import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Oenotourisme = () => {
  const siteInfo = useSiteInfo();
  const { t, localePath } = useLanguage();

  const tarifs = [
    {
      title: t('oenotourisme.tarif1.title'),
      duration: t('oenotourisme.tarif1.duration'),
      price: t('oenotourisme.tarif1.price'),
    },
    {
      title: t('oenotourisme.tarif2.title'),
      duration: t('oenotourisme.tarif2.duration'),
      price: t('oenotourisme.tarif2.price'),
    },
    {
      title: t('oenotourisme.tarif3.title'),
      duration: t('oenotourisme.tarif3.duration'),
      price: t('oenotourisme.tarif3.price'),
    },
  ];

  return (
    <>
      <SEOHead page="oenotourisme" />

      {/* Banner */}
      <section className="relative h-64 md:h-80">
        <img
          src="/batiment.jpg"
          alt={t('oenotourisme.title')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider uppercase font-['Raleway']">
            {t('oenotourisme.title')}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-bold uppercase text-primary-600 tracking-wide mb-3">
            {t('oenotourisme.title')}
          </h2>
          <p className="text-lg font-medium text-secondary-800 mb-8">
            {t('oenotourisme.subtitle')}
          </p>

          <div className="space-y-6 text-secondary-700 leading-relaxed mb-16">
            <p>{t('oenotourisme.text1')}</p>
            <p>{t('oenotourisme.text2')}</p>
            <p>{t('oenotourisme.text3')}</p>
            <p>{t('oenotourisme.text4')}</p>
          </div>

          {/* Tarifs */}
          <h2 className="text-base font-bold uppercase text-primary-600 tracking-wide mb-8">
            {t('oenotourisme.tarifs')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {tarifs.map((tarif, index) => (
              <div
                key={index}
                className="bg-white border border-secondary-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-secondary-800 mb-2">{tarif.title}</h3>
                {tarif.duration && (
                  <p className="text-sm text-secondary-500 mb-4">{tarif.duration}</p>
                )}
                <p className="text-xl font-bold text-primary-600">{tarif.price}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to={localePath('contact')}
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold uppercase tracking-wide hover:bg-primary-700 transition-colors"
            >
              {t('oenotourisme.cta')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Oenotourisme;
