import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutRedirect = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const { t, localePath } = useLanguage();

  const cancelled = searchParams.get('cancelled') === 'true';
  const sessionId = searchParams.get('session_id');
  const success = !!sessionId && !cancelled;

  useEffect(() => {
    if (success) {
      clearCart();
    }
  }, [success, clearCart]);

  return (
    <>
      <SEOHead page="home" />

      <section className="relative h-32 md:h-48 w-full overflow-hidden">
        <img src="/banner-small1.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </section>

      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-lg mx-auto px-4 text-center">
          {success ? (
            <>
              <CheckCircle className="mx-auto text-green-600 mb-6" size={64} />
              <h1 className="text-2xl font-bold text-secondary-800 uppercase tracking-wider mb-4 font-['Raleway']">
                {t('checkout.successTitle')}
              </h1>
              <p className="text-secondary-600 mb-8 font-['Raleway']">
                {t('checkout.successText')}
              </p>
              <Link
                to={localePath('mon-compte')}
                className="inline-block px-8 py-3 bg-primary-600 text-white font-semibold uppercase tracking-wider text-sm hover:bg-primary-700 transition-colors font-['Raleway']"
              >
                {t('checkout.myAccount')}
              </Link>
            </>
          ) : (
            <>
              <XCircle className="mx-auto text-primary-600 mb-6" size={64} />
              <h1 className="text-2xl font-bold text-secondary-800 uppercase tracking-wider mb-4 font-['Raleway']">
                {t('checkout.cancelledTitle')}
              </h1>
              <p className="text-secondary-600 mb-8 font-['Raleway']">
                {t('checkout.cancelledText')}
              </p>
              <Link
                to={localePath('panier')}
                className="inline-block px-8 py-3 bg-primary-600 text-white font-semibold uppercase tracking-wider text-sm hover:bg-primary-700 transition-colors font-['Raleway']"
              >
                {t('checkout.backToCart')}
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutRedirect;
