import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';

const Partenaires = () => {
  const siteInfo = useSiteInfo();

  return (
    <>
      <SEOHead page="partenaires" />

      {/* Banner */}
      <section className="relative h-64 md:h-80">
        <img
          src="/banner-small1.jpg"
          alt="Partenaires Maison Rouge"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider uppercase font-['Raleway']">
            Partenaires
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-bold uppercase text-primary-600 tracking-wide mb-10">
            Partenaires
          </h2>

          <div className="space-y-12">
            {/* ISOVIN */}
            <div>
              <h2 className="text-xl font-bold uppercase text-primary-600 mb-6">ISOVIN</h2>
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
                    Inspirés par le terroir valaisan et ce qu'il a de meilleur à offrir, les pots isothermes Isovin sont créés de façon artisanale, entre tradition et modernité. Ils sont réalisés en bois de hêtre qui, grâce à son pouvoir isolant, garde les bouteilles au frais. Un objet naturel et écologique, à l'esthétique travaillée, qui trouvera sa place sur votre table et participera à vos meilleurs moments de convivialité.
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
              <h2 className="text-xl font-bold uppercase text-primary-600 mb-6">OOULIRI</h2>
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
                    Oouliri est une huilerie valaisanne spécialisée dans la production d'huiles de qualité supérieure, fabriquées à partir d'ingrédients régionaux. Les graines formant la matière première de nos huiles sont produites puis pressées dans la région, privilégiant les circuits courts pour minimiser l'impact environnemental et contribuer à l'économie locale.
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
