import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';

const APropos = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead page="apropos" />

      {/* Banner */}
      <section className="relative h-48 md:h-64 w-full overflow-hidden">
        <img
          src="/banner-small1.jpg"
          alt="À propos de Maison Rouge"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider font-['Raleway'] text-center px-4">
            À propos
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-600 uppercase tracking-wider mb-10 font-['Raleway']">
            À PROPOS DE MAISON ROUGE
          </h2>

          <div className="space-y-8 text-secondary-700 leading-relaxed font-['Raleway']">
            {/* La Cave */}
            <div>
              <h3 className="text-xl uppercase text-primary-600 tracking-wide font-bold mb-4">
                LA CAVE MAISON ROUGE
              </h3>
              <p className="mb-4">
                Maison rouge c'est des vins de caractère élaborés par une équipe soudée et motivée répartie dans divers secteurs: vigne, cave, administration et vente. Nous encavons uniquement notre propre production issue de nos 18 hectares répartis entre Sierre et Leytron.
              </p>
              <p className="italic mb-8">
                Notre philosophie peut être résumée en 4 mots : Authenticité, finesse, hommage et partage.
              </p>
            </div>

            {/* Les 4 piliers */}
            <div>
              <h3 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-8 mb-3">
                AUTHENTICITÉ DES CÉPAGES
              </h3>
              <p className="mb-6">
                Pour chaque cépage nous sélectionnons la parcelle au terroir et au microclimat la plus adaptée. Ce travail se poursuit à la cave pour retranscrire les caractéristiques propres à chacun. Cette quête de l'authenticité est la fierté de notre entreprise viticole.
              </p>

              <h3 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-8 mb-3">
                FINESSE DES CRUS
              </h3>
              <p className="mb-6">
                Les vinifications sont adaptées en finesse à chaque cru: durée des cuvaisons, température de fermentation et choix de barriques. Tout est fait pour ressortir l'élégance et la beauté de nos vins quitte à en prendre soin entre 8 et 10 années (vins de garde élevés sous-bois en barrique). Au bilan, une large gamme de vins de haute tenue, des crus de caractère solides et charpentés qui sauront émerveiller vos papilles.
              </p>

              <h3 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-8 mb-3">
                HOMMAGE AU TERROIR VALAISAN
              </h3>
              <p className="mb-6">
                A la fois clin d'oeil et témoignage du terroir et de l'histoire du canton, nos créations portent des noms tirés du patois valaisan. Mûris sur les coteaux rocailleux baignés de soleil de Bâtassé et Molignon, ces créations rendent hommage aux bâtisseurs de ces vignes en terrasses soutenues par d'imposants murs de pierres sèches. Et pour bien signer ces oeuvres uniques, nous les marquons du sceau d'un tailleur de pierre anonyme, bâtisseur de cathédrale.
              </p>

              <h3 className="text-base uppercase text-primary-600 tracking-wide font-bold mt-8 mb-3">
                PARTAGE D'UNE PASSION
              </h3>
              <p>
                Maison rouge est aussi une entreprise formatrice. Elle a pour vocation de transmettre et partager le savoir et la passion du vin à plusieurs apprentis placés sous sa responsabilité. Ces jeunes se voient confier des responsabilités. Ils ont la possibilité de vivre des expériences enrichissantes et de créer leur vin des apprentis.
              </p>
            </div>

            {/* Histoire et équipe */}
            <div className="mt-12 pt-10 border-t border-secondary-200">
              <h3 className="text-xl uppercase text-primary-600 tracking-wide font-bold mb-4">
                NOTRE HISTOIRE
              </h3>
              <p className="mb-4">
                Implantée au coeur du Valais, à Saint-Pierre-de-Clages, Maison Rouge perpétue une tradition viticole ancrée depuis des générations dans ce terroir d'exception. Le domaine s'étend sur 18 hectares de vignes, dont 8 en propriété et 10 en location, répartis entre Sierre et Leytron.
              </p>
              <p className="mb-4">
                Cet étalement géographique dans le Valais central permet de disposer d'une variété remarquable de profils géologiques et de microclimats, offrant à chaque cépage les conditions idéales pour exprimer pleinement son caractère.
              </p>
              <p>
                Depuis les débuts de l'entreprise, l'équipe s'est attelée à la modernisation du vignoble tout en respectant la nature. Tout le domaine est désormais cultivé en BIO et selon les principes de la biodynamie, témoignant de l'engagement de Maison Rouge pour une viticulture durable et respectueuse de l'environnement.
              </p>
            </div>

            <div className="mt-12 pt-10 border-t border-secondary-200">
              <h3 className="text-xl uppercase text-primary-600 tracking-wide font-bold mb-4">
                NOTRE ÉQUIPE
              </h3>
              <p className="mb-4">
                Maison Rouge, c'est avant tout une équipe soudée et passionnée, répartie dans divers secteurs : vigne, cave, administration et vente. Chaque membre apporte son savoir-faire et sa passion pour contribuer à l'excellence de nos vins.
              </p>
              <p>
                En tant qu'entreprise formatrice, Maison Rouge accueille régulièrement des apprentis et leur offre l'opportunité de développer leurs compétences dans un environnement professionnel stimulant. Cette transmission du savoir est au coeur de notre identité.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default APropos;
