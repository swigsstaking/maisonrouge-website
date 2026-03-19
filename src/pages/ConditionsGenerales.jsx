import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';

const ConditionsGenerales = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead page="conditions" />

      {/* Banner */}
      <section className="relative h-48 md:h-64 w-full overflow-hidden">
        <img
          src="/banner-small2.jpg"
          alt="Conditions générales"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider font-['Raleway'] text-center px-4">
            Conditions générales
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-600 uppercase tracking-wider mb-10 font-['Raleway']">
            CONDITIONS GÉNÉRALES & MENTIONS LÉGALES
          </h2>

          <div className="space-y-10 text-secondary-700 leading-relaxed font-['Raleway']">
            {/* Éditeur du site */}
            <div>
              <h3 className="text-base uppercase text-primary-600 tracking-wide font-bold mb-3">
                Éditeur du site
              </h3>
              <p className="mb-2">
                Le site maisonrouge.swigs.online est édité par :
              </p>
              <p className="mb-1"><strong>Maison Rouge SA</strong></p>
              <p className="mb-1">Saint-Pierre-de-Clages, Valais, Suisse</p>
              <p className="mb-1">Téléphone : 027 306 21 81</p>
              <p>Email : info@maisonrouge.swigs.online</p>
            </div>

            {/* Conditions de vente */}
            <div>
              <h3 className="text-base uppercase text-primary-600 tracking-wide font-bold mb-3">
                Conditions de vente
              </h3>
              <p className="mb-2">
                Les prix indiqués sur le site sont en francs suisses (CHF), toutes taxes comprises. Maison Rouge se réserve le droit de modifier ses prix à tout moment. Les produits sont facturés sur la base des tarifs en vigueur au moment de la validation de la commande.
              </p>
              <p>
                La vente d'alcool est interdite aux mineurs. En passant commande, l'acheteur certifie avoir l'âge légal pour acheter des boissons alcoolisées dans son pays de résidence.
              </p>
            </div>

            {/* Livraison */}
            <div>
              <h3 className="text-base uppercase text-primary-600 tracking-wide font-bold mb-3">
                Livraison
              </h3>
              <p className="mb-2">
                Les livraisons sont effectuées en Suisse. Les délais de livraison sont donnés à titre indicatif et peuvent varier selon la disponibilité des produits et la destination.
              </p>
              <p>
                Les frais de livraison sont calculés en fonction du poids et de la destination. Ils sont communiqués au client avant la validation définitive de la commande.
              </p>
            </div>

            {/* Droit de rétractation */}
            <div>
              <h3 className="text-base uppercase text-primary-600 tracking-wide font-bold mb-3">
                Droit de rétractation
              </h3>
              <p>
                Conformément à la législation suisse, le client dispose d'un délai de 14 jours à compter de la réception des produits pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités. Les produits doivent être retournés dans leur emballage d'origine, en parfait état. Les frais de retour sont à la charge du client.
              </p>
            </div>

            {/* Protection des données */}
            <div>
              <h3 className="text-base uppercase text-primary-600 tracking-wide font-bold mb-3">
                Protection des données
              </h3>
              <p className="mb-2">
                Maison Rouge s'engage à protéger la vie privée de ses utilisateurs conformément à la Loi fédérale sur la protection des données (LPD). Les données personnelles collectées lors de la navigation sur le site ou lors d'une commande sont utilisées exclusivement pour le traitement des commandes et la gestion de la relation client.
              </p>
              <p>
                Ces données ne sont en aucun cas cédées ou vendues à des tiers. Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles en nous contactant à info@maisonrouge.swigs.online.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h3 className="text-base uppercase text-primary-600 tracking-wide font-bold mb-3">
                Cookies
              </h3>
              <p>
                Le site maisonrouge.swigs.online utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de fréquentation. En poursuivant votre navigation, vous acceptez l'utilisation de cookies. Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités du site pourraient ne plus être disponibles.
              </p>
            </div>

            {/* Propriété intellectuelle */}
            <div>
              <h3 className="text-base uppercase text-primary-600 tracking-wide font-bold mb-3">
                Propriété intellectuelle
              </h3>
              <p>
                L'ensemble des contenus du site maisonrouge.swigs.online (textes, images, vidéos, logos, marques) est protégé par le droit d'auteur et le droit des marques. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, de ces contenus est strictement interdite sans l'autorisation écrite préalable de Maison Rouge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConditionsGenerales;
