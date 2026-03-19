import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';

const sponsorItems = [
  {
    image: '/sponsors/jumping-sion.jpg',
    name: 'Jumping Sion',
    description:
      "Jusqu'en 2018, nous avons soutenu le Jumping Sion et ses concours équestres qui requièrent élégance et précision de la part des chevaux et de leurs cavaliers. Deux valeurs fortes pour notre entreprise.",
  },
  {
    image: '/sponsors/lucie-moreillon.jpg',
    name: 'Lucie Moreillon',
    description:
      'Maison Rouge encourage les jeunes dans leurs passions et les aider à atteindre leurs objectifs comme pour Lucie Moreillon, cadre A dressage poney national 2018.',
  },
  {
    image: '/sponsors/fc-conthey.jpg',
    name: 'FC Conthey',
    description:
      "Depuis 2018, nous contribuons à l'intégration et au développement de la jeunesse valaisanne par le sport en soutenant le FC Conthey. Les valeurs du football comme la solidarité, l'esprit d'équipe et l'ouverture sur le monde sont aussi celles de notre entreprise.",
  },
  {
    image: '/sponsors/rallye-valais.jpg',
    name: 'Jonathan Hirschi - Rallye International Valais',
    description:
      'En 2015, nous embarquons et sillonnons les routes au côté du pilote suisse Jonathan Hirschi pour le Rallye International du Valais. Une aventure humaine qui restera gravée dans les esprits.',
  },
  {
    image: '/sponsors/spas.png',
    name: 'SPAS - Seaplane Pilots Association Switzerland',
    description: '',
  },
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

  return (
    <>
      <SEOHead page="sponsoring" />

      {/* Banner */}
      <section className="relative h-64 md:h-80">
        <img
          src="/banner-small1.jpg"
          alt="Sponsoring Maison Rouge"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider uppercase font-['Raleway']">
            Sponsoring
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-bold uppercase text-primary-600 tracking-wide mb-3">
            Maison Rouge sponsor de vos événements
          </h2>
          <p className="text-lg font-medium text-secondary-800 mb-12 uppercase">
            Nous sommes fiers de soutenir la culture, le sport et les loisirs
          </p>

          <div className="space-y-0">
            {sponsorItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start gap-6 py-8 border-b border-secondary-200 last:border-b-0"
              >
                <div className="flex-shrink-0 w-full md:w-1/4">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="max-w-[235px] w-full object-cover rounded"
                  />
                </div>
                <div className="w-full md:w-3/4">
                  <h3 className="text-lg font-bold text-secondary-800 mb-2">{item.name}</h3>
                  {item.description && (
                    <p className="text-secondary-700 leading-relaxed">{item.description}</p>
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
