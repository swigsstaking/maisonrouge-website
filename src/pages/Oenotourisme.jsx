import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const tarifs = [
  {
    title: 'Dégustation 5 vins',
    duration: 'Durée 1h-1h30',
    price: 'CHF 15.00/personne',
  },
  {
    title: 'Dégustation et visite de cave',
    duration: 'Durée 2h',
    price: 'CHF 20.00/personne',
  },
  {
    title: 'Planchette apéro',
    duration: '',
    price: 'CHF 10.00/personne',
  },
];

const Oenotourisme = () => {
  const siteInfo = useSiteInfo();
  const { localePath } = useLanguage();

  return (
    <>
      <SEOHead page="oenotourisme" />

      {/* Banner */}
      <section className="relative h-64 md:h-80">
        <img
          src="/batiment.jpg"
          alt="Oenotourisme Maison Rouge"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider uppercase font-['Raleway']">
            Oenotourisme
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-bold uppercase text-primary-600 tracking-wide mb-3">
            Oenotourisme
          </h2>
          <p className="text-lg font-medium text-secondary-800 mb-8">
            Partagez un moment convivial autour de vins de caractère
          </p>

          <div className="space-y-6 text-secondary-700 leading-relaxed mb-16">
            <p>
              Avec vos proches ou collègues, partez à la découverte de nos véritables artisans et
              apprenez en plus sur nos vignobles et l'art du vin.
            </p>
            <p>
              Sur rendez-vous, nous proposons des excursions avec visite et dégustation de nos
              nectars de caractère. Le tout accompagné de nos professionnels qui vous dévoileront
              quelques-uns de nos secrets les mieux gardés et émerveilleront vos papilles gustatives.
            </p>
            <p>
              Ils vous initieront à l'oenologie et vous conseilleront sur le vin le mieux adapté à
              vos goûts et attentes. D'un vin de table à un grand cru, ils sauront à coup sûr vous
              satisfaire et trouver votre bonheur !
            </p>
            <p>
              N'attendez plus et réservez dès maintenant votre visite via le formulaire en ligne ou
              par téléphone (réservation préalable obligatoire).
            </p>
          </div>

          {/* Tarifs */}
          <h2 className="text-base font-bold uppercase text-primary-600 tracking-wide mb-8">
            Tarifs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {tarifs.map((tarif, index) => (
              <div
                key={index}
                className="bg-white border border-secondary-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-secondary-800 mb-2">{tarif.title}</h3>
                {tarif.duration && (
                  <p className="text-sm text-secondary-500 mb-4">{tarif.duration}</p>
                )}
                <p className="text-xl font-bold text-primary-600">{tarif.price}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to={localePath('contact')}
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold uppercase tracking-wide hover:bg-primary-700 transition-colors"
            >
              Réservez votre visite
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Oenotourisme;
