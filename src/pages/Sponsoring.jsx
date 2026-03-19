import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { useLanguage } from '../context/LanguageContext';

const sponsorKeys = [
  { key: 'jumpingSion', image: '/sponsors/jumping-sion.jpg' },
  { key: 'lucieMoreillon', image: '/sponsors/lucie-moreillon.jpg' },
  { key: 'fcConthey', image: '/sponsors/fc-conthey.jpg' },
  { key: 'rallyeValais', image: '/sponsors/rallye-valais.jpg' },
  { key: 'spas', image: '/sponsors/spas.png' },
];

const galleryImages = [
  '/gallery/gallery1.jpg',
  '/gallery/gallery2.jpg',
  '/gallery/gallery3.jpg',
  '/gallery/gallery4.jpg',
  '/gallery/gallery5.jpg',
];

const Sponsoring = () => {
  const siteInfo = useSiteInfo();
  const { t } = useLanguage();

  return (
    <>
      <SEOHead page="sponsoring" />

      {/* Banner */}
      <section className="relative h-64 md:h-80">
        <img
          src="/banner-small1.jpg"
          alt={t('sponsoring.title')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider uppercase font-['Raleway']">
            {t('sponsoring.title')}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-bold uppercase text-primary-600 tracking-wide mb-3">
            {t('sponsoring.heading')}
          </h2>
          <p className="text-lg font-medium text-secondary-800 mb-12 uppercase">
            {t('sponsoring.subtitle')}
          </p>

          <div className="space-y-0">
            {sponsorKeys.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start gap-6 py-8 border-b border-secondary-200 last:border-b-0"
              >
                <div className="flex-shrink-0 w-full md:w-1/4">
                  <img
                    src={item.image}
                    alt={t(`sponsoring.${item.key}.name`)}
                    loading="lazy"
                    className="max-w-[235px] w-full object-cover rounded"
                  />
                </div>
                <div className="w-full md:w-3/4">
                  <h3 className="text-lg font-bold text-secondary-800 mb-2">{t(`sponsoring.${item.key}.name`)}</h3>
                  {t(`sponsoring.${item.key}.description`) && (
                    <p className="text-secondary-700 leading-relaxed">{t(`sponsoring.${item.key}.description`)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Gallery */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            {galleryImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Gallery ${index + 1}`}
                loading="lazy"
                className="w-20 h-20 object-cover rounded grayscale"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Sponsoring;
