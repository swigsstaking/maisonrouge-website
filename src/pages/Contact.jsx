import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { useContact } from '../hooks/useContact';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const siteInfo = useSiteInfo();
  const contactMutation = useContact();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await contactMutation.mutateAsync({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: formData.message,
      });
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEOHead page="contact" />

      {/* Banner */}
      <section className="relative h-64 md:h-80">
        <img
          src="/banner-small2.jpg"
          alt={t('contact.title')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider uppercase font-['Raleway']">
            {t('contact.title')}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-bold uppercase text-primary-600 tracking-wide mb-3">
            {t('contact.subtitle')}
          </h2>
          <p className="text-secondary-700 leading-relaxed mb-12">
            {t('contact.description')}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Info */}
            <div className="space-y-10">
              {/* Localisation */}
              <div>
                <h2 className="text-base font-bold uppercase text-primary-600 tracking-wide mb-4">
                  {t('contact.localisation')}
                </h2>
                <p className="text-secondary-700 leading-relaxed">
                  {siteInfo.contact?.address}
                </p>
              </div>

              {/* Heures d'ouverture */}
              <div>
                <h2 className="text-base font-bold uppercase text-primary-600 tracking-wide mb-4">
                  {t('contact.heures')}
                </h2>
                <div className="space-y-2 text-secondary-700">
                  <div className="flex justify-between max-w-xs">
                    <span>{t('contact.hours.lundiJeudi')}</span>
                    <span>{t('contact.hours.lundiJeudiH')}</span>
                  </div>
                  <div className="flex justify-between max-w-xs">
                    <span>{t('contact.hours.vendredi')}</span>
                    <span>{t('contact.hours.vendrediH')}</span>
                  </div>
                  <div className="flex justify-between max-w-xs">
                    <span>{t('contact.hours.weekend')}</span>
                    <span className="text-primary-600 font-medium">{t('contact.hours.weekendH')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <h2 className="text-base font-bold uppercase text-primary-600 tracking-wide mb-6">
                {t('contact.email')}
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-medium text-green-800 mb-2">{t('contact.success.title')}</h3>
                  <p className="text-green-700 mb-4">
                    {t('contact.success.text')}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary-600 hover:text-primary-700 font-semibold underline underline-offset-2"
                  >
                    {t('contact.success.another')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-secondary-700 mb-1"
                      >
                        {t('contact.form.prenom')} *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder={t('contact.form.prenomPlaceholder')}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-secondary-700 mb-1"
                      >
                        {t('contact.form.nom')} *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder={t('contact.form.nomPlaceholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-secondary-700 mb-1"
                    >
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-secondary-700 mb-1"
                    >
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                      placeholder={t('contact.form.messagePlaceholder')}
                    />
                  </div>

                  {contactMutation.isError && (
                    <div className="text-red-600 bg-red-50 p-4 rounded-lg text-sm">
                      {t('contact.error')}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-primary-600 text-white px-6 py-3.5 rounded-lg font-semibold uppercase tracking-wide hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {contactMutation.isPending ? t('contact.form.sending') : t('contact.form.envoyer')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
