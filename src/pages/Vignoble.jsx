import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Vignoble = () => {
  const siteInfo = useSiteInfo();
  const { localePath } = useLanguage();

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
            Vignoble
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-600 uppercase tracking-wider mb-10 font-['Raleway']">
            Vignoble
          </h2>

          <div className="space-y-6 text-gray-700 leading-relaxed font-['Raleway']">
            <p>
              Les 18 hectares de vignes (8 en propriété – 10 en location) travaillés par l'équipe de Maison Rouge sont situés dans le Valais central, entre Sierre et Leytron. Cet étalement géographique permet de disposer d'une variété de profils géologiques et de microclimats.
            </p>

            <p>
              Chaque cépage cultivé par l'équipe viticole dispose de terres et de conditions climatiques idéales. Du Païen, de l'Arvine, du Johannisberg, de l'Humagne Blanc, du Cornalin de l'Humagne Rouge et du Pinot Noir ont été plantés dans la région sierroise. Le vignoble sédunois a été dédié à la Marsanne blanche et au Tempranillo. Johannisberg, Arvine, Païen, Merlot et Syrah prospèrent quant à eux dans le vignoble de Chamoson. Conthey accueille un domaine de Petite Arvine, de Fendant et de Merlot alors que Humagne rouge et Humagne blanc profitent du terroir de Leytron.
            </p>

            <p>
              Depuis les débuts de l'entreprise, l'équipe s'est attelée à la modernisation du vignoble. Toutes les parcelles sont désormais cultivées sur fil et permettent une petite mécanisation bien utile en termes de rentabilité et d'efficience. Maison Rouge a à coeur de produire des vins dans le respect de la nature. Ainsi, tout le domaine est cultivé en BIO et à partir de 2021, il est en reconversion biologique. Ainsi, tout le domaine est cultivé selon les principes de la biodynamie.
            </p>

            <p>
              Pour veiller sur ce précieux patrimoine viticole, l'entreprise s'est assuré fin 2016 les services d'un professionnel compétent en la personne de Georges Emery, nouveau directeur technique du vignoble de Maison Rouge.
            </p>
          </div>

          <div className="mt-12">
            <Link
              to={localePath('vins')}
              className="inline-block text-primary-600 font-semibold uppercase tracking-wider text-sm border-b-2 border-primary-600 pb-1 hover:text-primary-800 hover:border-primary-800 transition-colors font-['Raleway']"
            >
              Découvrez sans plus tarder nos vins.
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Vignoble;
