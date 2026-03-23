import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Menu, X, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { useSiteInfo } from '../hooks/useSiteInfo';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const siteInfo = useSiteInfo();
  const location = useLocation();
  const { totalItems } = useCart();
  const { customer, isAuthenticated } = useAuth();
  const { lang, setLang, t, localePath } = useLanguage();

  const languages = ['fr', 'en', 'de'];

  const navigation = [
    { nameKey: 'nav.vignoble', routeKey: 'vignoble' },
    { nameKey: 'nav.vins', routeKey: 'vins' },
    { nameKey: 'nav.apprentis', routeKey: 'cuvee-des-apprentis' },
    { nameKey: 'nav.oenotourisme', routeKey: 'oenotourisme' },
    { nameKey: 'nav.partenaires', routeKey: 'partenaires' },
    { nameKey: 'nav.sponsoring', routeKey: 'sponsoring' },
    { nameKey: 'nav.actualite', routeKey: 'actualites' },
    { nameKey: 'nav.contact', routeKey: 'contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-secondary-50 font-sans">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        {/* Logo area with utility links */}
        <div className="container-site py-3 md:py-4 flex items-center justify-between">
          {/* Logo + Tagline */}
          <Link to={localePath('')}>
            <img
              src="/logo.jpg"
              alt="Maison Rouge"
              className="h-16 md:h-24 w-auto"
            />
          </Link>

          {/* Right side: utility links (desktop) + mobile burger */}
          <div className="flex items-center gap-2">
            {/* Desktop utility */}
            <div className="hidden md:flex items-center text-xs tracking-wide text-secondary-700">
              <Link to={isAuthenticated ? localePath('mon-compte') : localePath('connexion')} className="hover:text-primary-600 transition-colors">
                {isAuthenticated ? customer?.firstName : t('header.monCompte')}
              </Link>
              <span className="mx-2 text-secondary-300">|</span>
              <Link to={localePath('panier')} className="hover:text-primary-600 transition-colors relative">
                {t('header.panier')}
                {totalItems > 0 && (
                  <span className="text-primary-600 ml-0.5">({totalItems})</span>
                )}
              </Link>
              <span className="mx-2 text-secondary-300">|</span>
              <div className="flex items-center gap-1">
                {languages.map((l, i) => (
                  <span key={l} className="inline-flex items-center">
                    {i > 0 && <span className="text-secondary-300 mx-0.5">/</span>}
                    <button
                      onClick={() => setLang(l)}
                      className={`transition-colors ${
                        lang === l
                          ? 'text-primary-600 font-semibold'
                          : 'text-secondary-600 hover:text-primary-600'
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-primary-600"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <nav className="hidden lg:block bg-primary-600">
          <div className="container-site flex items-center justify-center">
            {navigation.map((item) => {
              const isLink = item.routeKey !== null;
              const path = isLink ? localePath(item.routeKey) : '#';
              const Component = isLink ? Link : 'a';
              const props = isLink
                ? { to: path }
                : { href: '#' };

              return (
                <Component
                  key={item.nameKey}
                  {...props}
                  className={`px-3 xl:px-4 py-3 text-[11px] xl:text-xs tracking-wider uppercase font-semibold transition-colors ${
                    isActive(path)
                      ? 'bg-primary-700 text-white'
                      : 'text-white/90 hover:bg-primary-700 hover:text-white'
                  }`}
                >
                  {t(item.nameKey)}
                </Component>
              );
            })}
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-primary-600">
            <div className="container-site py-4 flex flex-col">
              {navigation.map((item) => {
                const isLink = item.routeKey !== null;
                const path = isLink ? localePath(item.routeKey) : '#';
                const Component = isLink ? Link : 'a';
                const props = isLink
                  ? { to: path }
                  : { href: '#' };

                return (
                  <Component
                    key={item.nameKey}
                    {...props}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm tracking-extra-wide uppercase font-semibold border-b border-primary-500/30 last:border-b-0 ${
                      isActive(path)
                        ? 'bg-primary-700 text-white'
                        : 'text-white/90 hover:bg-primary-700 hover:text-white'
                    }`}
                  >
                    {t(item.nameKey)}
                  </Component>
                );
              })}
              {/* Mobile utility links */}
              <div className="flex items-center gap-3 px-4 pt-4 text-xs tracking-extra-wide uppercase text-white/70">
                <Link to={isAuthenticated ? localePath('mon-compte') : localePath('connexion')} onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <User size={14} />
                  {isAuthenticated ? customer?.firstName : t('header.monCompte')}
                </Link>
                <span>|</span>
                <Link to={localePath('panier')} onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors relative inline-flex items-center gap-1">
                  <ShoppingCart size={14} />
                  {t('header.panier')}
                  {totalItems > 0 && (
                    <span className="bg-white text-primary-600 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none ml-1">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <span>|</span>
                <div className="flex items-center gap-1">
                  {languages.map((l, i) => (
                    <span key={l} className="inline-flex items-center">
                      {i > 0 && <span className="text-white/40 mx-0.5">/</span>}
                      <button
                        onClick={() => setLang(l)}
                        className={`transition-colors ${
                          lang === l
                            ? 'text-white font-semibold'
                            : 'text-white/50 hover:text-white'
                        }`}
                      >
                        {l.toUpperCase()}
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary-800 text-white">
        <div className="container-site py-12">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left: Social + Links */}
            <div className="md:w-1/3">
              <div className="flex items-center gap-4 mb-6">
                {siteInfo.social?.facebook && (
                  <a
                    href={siteInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/70 transition-colors p-2"
                    aria-label="Facebook"
                  >
                    <Facebook size={24} />
                  </a>
                )}
                {siteInfo.social?.instagram && (
                  <a
                    href={siteInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/70 transition-colors p-2"
                    aria-label="Instagram"
                  >
                    <Instagram size={24} />
                  </a>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Link to={localePath('a-propos')} className="text-white font-semibold underline hover:text-white/70 transition-colors py-1 inline-block">
                  {t('footer.apropos')}
                </Link>
                <Link to={localePath('conditions-generales')} className="text-white font-semibold underline hover:text-white/70 transition-colors py-1 inline-block">
                  {t('footer.conditions')}
                </Link>
              </div>
            </div>

            {/* Right: 3 contact columns */}
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Email */}
              <div className="flex flex-col items-center text-center">
                <Mail size={28} className="text-white mb-3" />
                <span className="text-sm font-light italic tracking-widest uppercase mb-2">
                  {t('footer.mail')}
                </span>
                <a
                  href="mailto:info@maisonrouge.swigs.online"
                  className="text-sm text-white/80 hover:text-white transition-colors py-1 inline-block"
                >
                  info@maisonrouge.swigs.online
                </a>
              </div>

              {/* Phone */}
              <div className="flex flex-col items-center text-center">
                <Phone size={28} className="text-white mb-3" />
                <span className="text-sm font-light italic tracking-widest uppercase mb-2">
                  {t('footer.phone')}
                </span>
                <a
                  href="tel:+41273062181"
                  className="text-sm text-white/80 hover:text-white transition-colors py-1 inline-block"
                >
                  027 306 21 81
                </a>
              </div>

              {/* Location */}
              <div className="flex flex-col items-center text-center">
                <MapPin size={28} className="text-white mb-3" />
                <span className="text-sm font-light italic tracking-widest uppercase mb-2">
                  {t('footer.location')}
                </span>
                <p className="text-sm text-white/80">
                  Saint-Pierre-de-Clages
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container-site py-4 text-center text-xs text-white/60 tracking-wide">
            <p>
              {t('footer.copyright')}{' '}
              <a
                href="https://swigs.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-white/60"
              >
                SWIGS
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
