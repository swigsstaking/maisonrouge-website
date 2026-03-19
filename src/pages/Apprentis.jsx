import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { useLanguage } from '../context/LanguageContext';

const apprentices = [
  {
    name: '«Julie»',
    edition: 'LO CHAÏ EDITION 2019',
    vineyard: '/apprentis/apprenti-julie.jpg',
    bottle: '/apprentis/lo-chai-julie.png',
    portrait: '/apprentis/profil-julie.jpg',
  },
  {
    name: '«Sébastien»',
    edition: 'LO CHAÏ EDITION 2018',
    vineyard: '/apprentis/apprenti-sebastien.jpg',
    bottle: '/apprentis/lo-chai-sebastien.png',
    portrait: '/apprentis/profil-sebastien.jpg',
  },
  {
    name: '«ANTHONY»',
    edition: 'LO CHAÏ EDITION 2015',
    vineyard: '/apprentis/apprenti-anthony.jpg',
    bottle: '/apprentis/lo-chai-anthony.png',
    portrait: '/apprentis/profil-anthony.jpg',
  },
  {
    name: '«VALENTINE»',
    edition: 'LO CHAÏ EDITION 2015',
    vineyard: '/apprentis/apprenti-valentine.jpg',
    bottle: '/apprentis/lo-chai-valentine.png',
    portrait: '/apprentis/profil-valentine.jpg',
  },
  {
    name: '«GUILLAUME»',
    edition: 'LO CHAÏ EDITION 2009',
    vineyard: '/apprentis/apprenti-guillaume.jpg',
    bottle: '/apprentis/lo-chai-guillaume.png',
    portrait: '/apprentis/profil-guillaume.jpg',
  },
  {
    name: '«GABRIEL»',
    edition: 'LO CHAÏ EDITION 2006',
    vineyard: '/apprentis/apprenti-gabriel.jpg',
    bottle: '/apprentis/lo-chai-gabriel.png',
    portrait: '/apprentis/profil-gabriel.jpg',
  },
];

const Apprentis = () => {
  const siteInfo = useSiteInfo();
  const { t } = useLanguage();

  return (
    <>
      <SEOHead page="apprentis" />

      {/* Banner */}
      <section className="relative h-48 md:h-64">
        <img
          src="/banner-small1.jpg"
          alt={t('apprentis.title')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider uppercase font-['Raleway']">
            {t('apprentis.title')}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-bold uppercase text-primary-600 tracking-wider mb-3">
            {t('apprentis.title')}
          </h2>
          <h2 className="text-lg font-medium text-secondary-800 mb-8">
            {t('apprentis.subtitle')}
          </h2>
          <p className="text-secondary-700 leading-relaxed mb-12">
            {t('apprentis.text')}
          </p>

          <h2 className="text-lg font-medium text-secondary-800 mb-10">
            {t('apprentis.discover')}
          </h2>

          {/* Apprentice Blocks */}
          <div className="space-y-10">
            {apprentices.map((apprentice, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-4 hover:underline cursor-pointer">
                  {apprentice.name} {apprentice.edition}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-5">
                    <img
                      src={apprentice.vineyard}
                      alt={`Vignoble ${apprentice.name}`}
                      loading="lazy"
                      className="w-full rounded"
                    />
                  </div>
                  <div className="md:col-span-3 flex justify-center">
                    <img
                      src={apprentice.bottle}
                      alt={`Bouteille ${apprentice.name}`}
                      loading="lazy"
                      className="max-h-72 object-contain mx-auto"
                    />
                  </div>
                  <div className="md:col-span-4">
                    <img
                      src={apprentice.portrait}
                      alt={`Portrait ${apprentice.name}`}
                      loading="lazy"
                      className="w-full rounded"
                    />
                  </div>
                </div>
                {index < apprentices.length - 1 && (
                  <div className="border-b border-gray-200 mt-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Apprentis;
