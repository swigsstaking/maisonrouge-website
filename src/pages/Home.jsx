import { useState, useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const slides = [
  { webp: '/slide1.webp', jpg: '/slide1.jpg' },
  { webp: '/slide2.webp', jpg: '/slide2.jpg' },
  { webp: '/slide3.webp', jpg: '/slide3.jpg' },
];

const sponsorKeys = [
  { key: 'jumpingSion', image: '/sponsors/jumping-sion.jpg' },
  { key: 'lucieMoreillon', image: '/sponsors/lucie-moreillon.jpg' },
  { key: 'fcConthey', image: '/sponsors/fc-conthey.jpg' },
  { key: 'rallyeValais', image: '/sponsors/rallye-valais.jpg' },
  { key: 'spas', image: '/sponsors/spas.png' },
];

const partnerKeys = [
  { key: 'isovin', logo: '/partners/isovin.png', maxWidth: 'max-w-[220px]', link: 'https://isovin.ch/' },
  { key: 'oouliri', logo: '/partners/oouliri.png', maxWidth: 'max-w-[185px]', link: 'https://oouliri.ch/' },
];

const Home = () => {
  const siteInfo = useSiteInfo();
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('apropos');

  const tabs = [
    { id: 'apropos', label: t('home.tab.apropos') },
    { id: 'valais', label: t('home.tab.valais') },
    { id: 'sponsoring', label: t('home.tab.sponsoring') },
    { id: 'partenaires', label: t('home.tab.partenaires') },
  ];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SEOHead page="home" />

      {/* ===== HERO SLIDER SECTION ===== */}
      <section className="relative h-[70vh] overflow-hidden">
        {slides.map((slide, index) => (
          <picture
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source srcSet={slide.webp} type="image/webp" />
            <img
              src={slide.jpg}
              alt={`Maison Rouge - Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding={index === 0 ? 'sync' : 'async'}
              width={1920}
              height={1080}
            />
          </picture>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Slide ${index + 1}`}
            >
              <span
                className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-110'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            </button>
          ))}
        </div>
      </section>

      {/* ===== A PROPOS / TABBED SECTION ===== */}
      <section className="bg-secondary-50 py-16 md:py-20">
        <div className="container-site">
          <div className="flex flex-col md:flex-row gap-0">
            {/* Left sidebar tabs */}
            <div className="md:w-64 flex-shrink-0 bg-secondary-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-6 py-4 text-sm font-bold tracking-wider uppercase transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : 'text-secondary-700 hover:bg-secondary-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right content area */}
            <div className="flex-1 bg-white p-8 md:p-12">
              {/* TAB 1 - A PROPOS */}
              {activeTab === 'apropos' && (
                <div>
                  <h1 className="text-xl uppercase text-primary-600 tracking-wide font-bold mb-6">
                    {t('home.title.cave')}
                  </h1>

                  <p className="text-secondary-700 leading-relaxed mb-4">
                    {t('home.intro')}
                  </p>

                  <p className="text-secondary-700 leading-relaxed mb-8 italic">
                    {t('home.philosophie')}
                  </p>

                  {/* AUTHENTICITE */}
                  <h2 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-8 mb-3">
                    {t('home.authenticite.title')}
                  </h2>
                  <p className="text-secondary-700 leading-relaxed mb-6">
                    {t('home.authenticite.text')}
                  </p>

                  {/* FINESSE */}
                  <h2 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-8 mb-3">
                    {t('home.finesse.title')}
                  </h2>
                  <p className="text-secondary-700 leading-relaxed mb-6">
                    {t('home.finesse.text')}
                  </p>

                  {/* HOMMAGE */}
                  <h2 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-8 mb-3">
                    {t('home.hommage.title')}
                  </h2>
                  <p className="text-secondary-700 leading-relaxed mb-6">
                    {t('home.hommage.text')}
                  </p>

                  {/* PARTAGE */}
                  <h2 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-8 mb-3">
                    {t('home.partage.title')}
                  </h2>
                  <p className="text-secondary-700 leading-relaxed">
                    {t('home.partage.text')}
                  </p>
                </div>
              )}

              {/* TAB 2 - LE VALAIS VITICOLE */}
              {activeTab === 'valais' && (
                <div>
                  <h1 className="text-xl uppercase text-primary-600 tracking-wide font-bold mb-6">
                    {t('home.valais.title')}
                  </h1>

                  <h2 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-6 mb-3">
                    {t('home.valais.culture.title')}
                  </h2>
                  <p className="text-secondary-700 leading-relaxed mb-4">
                    {t('home.valais.culture.text1')}
                  </p>
                  <p className="text-secondary-700 leading-relaxed mb-4">
                    {t('home.valais.culture.text2')}
                  </p>
                  <p className="text-secondary-700 leading-relaxed mb-8">
                    {t('home.valais.culture.text3')}
                  </p>

                  <h2 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-6 mb-3">
                    {t('home.valais.richesse.title')}
                  </h2>
                  <p className="text-secondary-700 leading-relaxed mb-4">
                    {t('home.valais.richesse.blancs')}
                  </p>
                  <p className="text-secondary-700 leading-relaxed mb-4">
                    {t('home.valais.richesse.rouges')}
                  </p>
                  <p className="text-secondary-700 leading-relaxed">
                    {t('home.valais.richesse.conclusion')}
                  </p>
                </div>
              )}

              {/* TAB 3 - SPONSORING */}
              {activeTab === 'sponsoring' && (
                <div>
                  <h1 className="text-xl uppercase text-primary-600 tracking-wide font-bold mb-2">
                    {t('home.sponsoring.title')}
                  </h1>
                  <p className="text-secondary-700 leading-relaxed mb-8 uppercase tracking-wide text-sm font-semibold">
                    {t('home.sponsoring.subtitle')}
                  </p>

                  {/* Sponsor items */}
                  <div className="space-y-0">
                    {sponsorKeys.map((sponsor, index) => (
                      <div
                        key={index}
                        className={`flex flex-col sm:flex-row gap-6 py-6 ${
                          index < sponsorKeys.length - 1 ? 'border-b border-secondary-200' : ''
                        }`}
                      >
                        <div className="sm:w-1/4 flex-shrink-0 flex justify-center sm:justify-start">
                          <img
                            src={sponsor.image}
                            alt={t(`home.sponsor.${sponsor.key}.name`)}
                            loading="lazy"
                            className="rounded object-cover max-w-[235px] w-full"
                          />
                        </div>
                        <div className="sm:w-3/4">
                          <h3 className="text-base font-bold text-secondary-900 mb-2">
                            {t(`home.sponsor.${sponsor.key}.name`)}
                          </h3>
                          {t(`home.sponsor.${sponsor.key}.text`) && (
                            <p className="text-secondary-700 leading-relaxed">
                              {t(`home.sponsor.${sponsor.key}.text`)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Gallery row */}
                  <div className="flex flex-wrap justify-center gap-3 mt-10">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <img
                        key={num}
                        src={`/gallery/gallery${num}.jpg`}
                        alt={`Galerie ${num}`}
                        loading="lazy"
                        className="w-[130px] h-[90px] object-cover rounded grayscale"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4 - PARTENAIRES */}
              {activeTab === 'partenaires' && (
                <div className="space-y-10">
                  {partnerKeys.map((partner, index) => (
                    <div
                      key={index}
                      className={`flex flex-col sm:flex-row gap-6 pb-8 ${
                        index < partnerKeys.length - 1 ? 'border-b border-secondary-200' : ''
                      }`}
                    >
                      <div className="sm:w-1/4 flex-shrink-0 flex justify-center sm:justify-start items-start">
                        <img
                          src={partner.logo}
                          alt={t(`home.partenaires.${partner.key}.title`)}
                          loading="lazy"
                          className={`${partner.maxWidth} object-contain`}
                        />
                      </div>
                      <div className="sm:w-3/4">
                        <h2 className="text-lg uppercase text-primary-600 tracking-wide font-bold mb-3">
                          {t(`home.partenaires.${partner.key}.title`)}
                        </h2>
                        <p className="text-secondary-700 leading-relaxed mb-4">
                          {t(`home.partenaires.${partner.key}.text`)}
                        </p>
                        <div className="text-right">
                          <a
                            href={partner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-5 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider hover:bg-primary-700 transition-colors duration-200"
                          >
                            {t('home.visitSite')}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
