import { useState, useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { Link } from 'react-router-dom';

const slides = [
  '/slide1.jpg',
  '/slide2.jpg',
  '/slide3.jpg',
];

const tabs = [
  { id: 'apropos', label: 'A PROPOS' },
  { id: 'valais', label: 'LE VALAIS VITICOLE' },
  { id: 'sponsoring', label: 'SPONSORING' },
  { id: 'partenaires', label: 'PARTENAIRES' },
];

const sponsors = [
  {
    image: '/sponsors/jumping-sion.jpg',
    name: 'Jumping Sion',
    text: "Jusqu'en 2018, nous avons soutenu le Jumping Sion et ses concours équestres qui requièrent élégance et précision de la part des chevaux et de leurs cavaliers. Deux valeurs fortes pour notre entreprise.",
  },
  {
    image: '/sponsors/lucie-moreillon.jpg',
    name: 'Lucie Moreillon',
    text: "Maison Rouge encourage les jeunes dans leurs passions et les aider à atteindre leurs objectifs comme pour Lucie Moreillon, cadre A dressage poney national 2018.",
  },
  {
    image: '/sponsors/fc-conthey.jpg',
    name: 'FC Conthey',
    text: "Depuis 2018, nous contribuons à l'intégration et au développement de la jeunesse valaisanne par le sport en soutenant le FC Conthey. Les valeurs du football comme la solidarité, l'esprit d'équipe et l'ouverture sur le monde sont aussi celles de notre entreprise.",
  },
  {
    image: '/sponsors/rallye-valais.jpg',
    name: 'Jonathan Hirschi - Rallye International Valais',
    text: "En 2015, nous embarquons et sillonnons les routes au côté du pilote suisse Jonathan Hirschi pour le Rallye International du Valais. Une aventure humaine qui restera gravée dans les esprits.",
  },
  {
    image: '/sponsors/spas.png',
    name: 'SPAS - Seaplane Pilots Association Switzerland',
    text: '',
  },
];

const partners = [
  {
    name: 'ISOVIN',
    logo: '/partners/isovin.png',
    maxWidth: 'max-w-[220px]',
    text: "Inspirés par le terroir valaisan et ce qu'il a de meilleur à offrir, les pots isothermes Isovin sont créés de façon artisanale, entre tradition et modernité. Ils sont réalisés en bois de hêtre qui, grâce à son pouvoir isolant, garde les bouteilles au frais. Un objet naturel et écologique, à l'esthétique travaillée, qui trouvera sa place sur votre table et participera à vos meilleurs moments de convivialité.",
    link: 'https://isovin.ch/',
  },
  {
    name: 'OOULIRI',
    logo: '/partners/oouliri.png',
    maxWidth: 'max-w-[185px]',
    text: "Oouliri est une huilerie valaisanne spécialisée dans la production d'huiles de qualité supérieure, fabriquées à partir d'ingrédients régionaux. Les graines formant la matière première de nos huiles sont produites puis pressées dans la région, privilégiant les circuits courts pour minimiser l'impact environnemental et contribuer à l'économie locale.",
    link: 'https://oouliri.ch/',
  },
];

const Home = () => {
  const siteInfo = useSiteInfo();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('apropos');

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
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
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
                    LA CAVE MAISON ROUGE
                  </h1>

                  <p className="text-secondary-700 leading-relaxed mb-4">
                    Maison rouge c'est des vins de caractère élaborés par une équipe soudée et motivée répartie dans divers secteurs: vigne, cave, administration et vente. Nous encavons uniquement notre propre production issue de nos 18 hectares répartis entre Sierre et Leytron.
                  </p>

                  <p className="text-secondary-700 leading-relaxed mb-8 italic">
                    Notre philosophie peut être résumée en 4 mots : Authenticité, finesse, hommage et partage.
                  </p>

                  {/* AUTHENTICITE */}
                  <h2 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-8 mb-3">
                    AUTHENTICITÉ DES CÉPAGES
                  </h2>
                  <p className="text-secondary-700 leading-relaxed mb-6">
                    Pour chaque cépage nous sélectionnons la parcelle au terroir et au microclimat la plus adaptée. Ce travail se poursuit à la cave pour retranscrire les caractéristiques propres à chacun. Cette quête de l'authenticité est la fierté de notre entreprise viticole.
                  </p>

                  {/* FINESSE */}
                  <h2 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-8 mb-3">
                    FINESSE DES CRUS
                  </h2>
                  <p className="text-secondary-700 leading-relaxed mb-6">
                    Les vinifications sont adaptées en finesse à chaque cru: durée des cuvaisons, température de fermentation et choix de barriques. Tout est fait pour ressortir l'élégance et la beauté de nos vins quitte à en prendre soin entre 8 et 10 années (vins de garde élevés sous-bois en barrique). Au bilan, une large gamme de vins de haute tenue, des crus de caractère solides et charpentés qui sauront émerveiller vos papilles.
                  </p>

                  {/* HOMMAGE */}
                  <h2 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-8 mb-3">
                    HOMMAGE AU TERROIR VALAISAN
                  </h2>
                  <p className="text-secondary-700 leading-relaxed mb-6">
                    A la fois clin d'oeil et témoignage du terroir et de l'histoire du canton, nos créations portent des noms tirés du patois valaisan. Mûris sur les coteaux rocailleux baignés de soleil de Bâtassé et Molignon, ces créations rendent hommage aux bâtisseurs de ces vignes en terrasses soutenues par d'imposants murs de pierres sèches. Et pour bien signer ces oeuvres uniques, nous les marquons du sceau d'un tailleur de pierre anonyme, bâtisseur de cathédrale.
                  </p>

                  {/* PARTAGE */}
                  <h2 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-8 mb-3">
                    PARTAGE D'UNE PASSION
                  </h2>
                  <p className="text-secondary-700 leading-relaxed">
                    Maison rouge est aussi une entreprise formatrice. Elle a pour vocation de transmettre et partager le savoir et la passion du vin à plusieurs apprentis placés sous sa responsabilité. Ces jeunes se voient confier des responsabilités. Ils ont la possibilité de vivre des expériences enrichissantes et de créer leur vin des apprentis.
                  </p>
                </div>
              )}

              {/* TAB 2 - LE VALAIS VITICOLE */}
              {activeTab === 'valais' && (
                <div>
                  <h1 className="text-xl uppercase text-primary-600 tracking-wide font-bold mb-6">
                    LE VALAIS VITICOLE : UN VIGNOBLE ET DES CRUS D'EXCEPTION
                  </h1>

                  <h2 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-6 mb-3">
                    UNE CULTURE ANCESTRALE DU VIN
                  </h2>
                  <p className="text-secondary-700 leading-relaxed mb-4">
                    La viticulture et le Valais, c'est une belle histoire qui remonte à plusieurs milliers d'année. Des pépins de raisins datant de l'Age de fer (800-500 av. JC) ont été découverts dans le Haut-Valais, près de Brigue.
                  </p>
                  <p className="text-secondary-700 leading-relaxed mb-4">
                    Toutefois, les chercheurs considèrent que la viticulture, au sens propre du terme, a été ancrée dans la région à l'époque romaine.
                  </p>
                  <p className="text-secondary-700 leading-relaxed mb-8">
                    Aujourd'hui, cette histoire entre l'homme et les vignes valaisannes perdure. Le Valais viticole couvre 4842 ha. Il se caractérise par une extraordinaire variété de micro-climats, de cépages autochtones et d'arômes dont composent les vignerons.
                  </p>

                  <h2 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-6 mb-3">
                    UNE RICHESSE EXTRAORDINAIRE DES CUVÉES
                  </h2>
                  <p className="text-secondary-700 leading-relaxed mb-4">
                    <span className="italic">Du côté des blancs :</span> La Petite Arvine tient la vedette. L'Humagne blanche, l'Amigne ou des cépages plus rares comme la Rèze ou le Lafnetscha font aussi la richesse du terroir valaisan. Sans oublier les grands classiques locaux ou internationaux que sont le Chasselas (appelé Fendant), le Rhin, le Sylvaner (appelé Johannisberg), le Savagnin blanc (appelé Païen ou Heida) et la Marsanne (appelée Ermitage).
                  </p>
                  <p className="text-secondary-700 leading-relaxed mb-4">
                    <span className="italic">Du côté des rouges :</span> Le Cornalin et l'Humagne rouge sont les cépages régionaux les plus réputés. Ils sont complétés par le Pinot noir, le Gamay, la Syrah, le Merlot.
                  </p>
                  <p className="text-secondary-700 leading-relaxed">
                    Tel un artiste, la cave Maison Rouge joue avec la très grande diversité des sols et climats de la région pour produire des cuvées dévoilant toute la typicité du canton du Valais.
                  </p>
                </div>
              )}

              {/* TAB 3 - SPONSORING */}
              {activeTab === 'sponsoring' && (
                <div>
                  <h1 className="text-xl uppercase text-primary-600 tracking-wide font-bold mb-2">
                    MAISON ROUGE SPONSOR DE VOS ÉVÉNEMENTS
                  </h1>
                  <p className="text-secondary-700 leading-relaxed mb-8 uppercase tracking-wide text-sm font-semibold">
                    NOUS SOMMES FIERS DE SOUTENIR LA CULTURE, LE SPORT ET LES LOISIRS
                  </p>

                  {/* Sponsor items */}
                  <div className="space-y-0">
                    {sponsors.map((sponsor, index) => (
                      <div
                        key={index}
                        className={`flex flex-col sm:flex-row gap-6 py-6 ${
                          index < sponsors.length - 1 ? 'border-b border-secondary-200' : ''
                        }`}
                      >
                        <div className="sm:w-1/4 flex-shrink-0 flex justify-center sm:justify-start">
                          <img
                            src={sponsor.image}
                            alt={sponsor.name}
                            loading="lazy"
                            className="rounded object-cover max-w-[235px] w-full"
                          />
                        </div>
                        <div className="sm:w-3/4">
                          <h3 className="text-base font-bold text-secondary-900 mb-2">
                            {sponsor.name}
                          </h3>
                          {sponsor.text && (
                            <p className="text-secondary-700 leading-relaxed">
                              {sponsor.text}
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
                  {partners.map((partner, index) => (
                    <div
                      key={index}
                      className={`flex flex-col sm:flex-row gap-6 pb-8 ${
                        index < partners.length - 1 ? 'border-b border-secondary-200' : ''
                      }`}
                    >
                      <div className="sm:w-1/4 flex-shrink-0 flex justify-center sm:justify-start items-start">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          loading="lazy"
                          className={`${partner.maxWidth} object-contain`}
                        />
                      </div>
                      <div className="sm:w-3/4">
                        <h2 className="text-lg uppercase text-primary-600 tracking-wide font-bold mb-3">
                          {partner.name}
                        </h2>
                        <p className="text-secondary-700 leading-relaxed mb-4">
                          {partner.text}
                        </p>
                        <div className="text-right">
                          <a
                            href={partner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-5 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider hover:bg-primary-700 transition-colors duration-200"
                          >
                            Visiter le site
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
