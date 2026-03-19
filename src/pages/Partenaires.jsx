import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { useLanguage } from '../context/LanguageContext';

const Partenaires = () => {
  const siteInfo = useSiteInfo();
  const { t } = useLanguage();

  return (
    <>
      <SEOHead page="partenaires" />

      {/* Banner */}
      <section className="relative h-64 md:h-80">
        <img
          src="/banner-small1.jpg"
          alt={t('partenaires.title')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider uppercase font-['Raleway']">
            {t('partenaires.title')}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-bold uppercase text-primary-600 tracking-wide mb-10">
            {t('partenaires.heading')}
          </h2>

          <div className="space-y-12">
            {/* ISOVIN */}
            <div>
              <h2 className="text-xl font-bold uppercase text-primary-600 mb-6">{t('partenaires.isovin.title')}</h2>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <img
                    src="/partners/isovin.png"
                    alt="Isovin"
                    loading="lazy"
                    className="max-w-[220px] w-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-secondary-700 leading-relaxed mb-4">
                    {t('partenaires.isovin.text')}
                  </p>
                  <div className="text-right">
                    <a
                      href="https://isovin.ch/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-primary-600 font-semibold hover:text-primary-700 transition-colors underline underline-offset-2"
                    >
                      https://isovin.ch/
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* OOULIRI */}
            <div>
              <h2 className="text-xl font-bold uppercase text-primary-600 mb-6">{t('partenaires.oouliri.title')}</h2>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <img
                    src="/partners/oouliri.png"
                    alt="Oouliri"
                    loading="lazy"
                    className="max-w-[185px] w-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-secondary-700 leading-relaxed mb-4">
                    {t('partenaires.oouliri.text')}
                  </p>
                  <div className="text-right">
                    <a
                      href="https://oouliri.ch/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-primary-600 font-semibold hover:text-primary-700 transition-colors underline underline-offset-2"
                    >
                      https://oouliri.ch/
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partenaires;
