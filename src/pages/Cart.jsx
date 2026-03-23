import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, AlertCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';
const SITE_SLUG = 'maisonrouge';

function getPrice(product) {
  const amount = product.price?.amount;
  return amount != null ? amount : (parseFloat(product.price) || 0);
}

function getId(product) {
  return product._id || product.slug;
}

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { isAuthenticated, token, siteId, customer } = useAuth();
  const { t, localePath } = useLanguage();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      window.location.href = localePath('connexion');
      return;
    }
    setCheckoutLoading(true);
    setCheckoutError('');
    try {
      // Resolve product IDs: if we only have slugs (from static data), fetch the real _id from API
      const orderItems = [];
      for (const { product, quantity } of items) {
        let productId = product._id;
        if (!productId) {
          // Fetch product by slug to get the real MongoDB _id
          const lookupRes = await fetch(`${API_URL}/products/public/${product.slug}?siteId=${SITE_SLUG}`);
          if (!lookupRes.ok) throw new Error(`Produit "${product.name}" non trouvé`);
          const lookupData = await lookupRes.json();
          productId = lookupData.data?._id;
          if (!productId) throw new Error(`Produit "${product.name}" non trouvé`);
        }
        orderItems.push({
          productId: productId,
          name: product.name,
          quantity,
          price: getPrice(product),
        });
      }
      const res = await fetch(`${API_URL}/orders/public`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          siteId: siteId,
          items: orderItems,
          customer: {
            email: customer?.email,
            firstName: customer?.firstName,
            lastName: customer?.lastName,
            phone: customer?.phone || '',
          },
          paymentMethod: 'stripe',
          successUrl: window.location.origin + localePath('mon-compte'),
          cancelUrl: window.location.origin + localePath('panier'),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de la commande');
      const stripeUrl = data.data?.checkoutUrl || data.checkoutUrl || data.data?.stripeSessionUrl;
      if (stripeUrl) {
        window.location.href = stripeUrl;
      } else {
        clearCart();
        window.location.href = localePath('mon-compte');
      }
    } catch (err) {
      setCheckoutError(err.message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <>
      <SEOHead page="panier" />

      {/* Banner */}
      <section className="relative h-32 md:h-48 w-full overflow-hidden">
        <img
          src="/banner-small1.jpg"
          alt={t('cart.title')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider font-['Raleway']">
            {t('cart.title')}
          </h1>
        </div>
      </section>

      <section className="py-12 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-secondary-600 font-['Raleway'] mb-6">
                {t('cart.empty')}
              </p>
              <Link
                to={localePath('vins')}
                className="inline-block bg-primary-600 text-white uppercase text-sm font-bold tracking-wider py-3 px-8 hover:bg-primary-700 transition-colors duration-200 font-['Raleway']"
              >
                {t('cart.seeWines')}
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block bg-white">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-secondary-500 font-['Raleway']">
                      <th className="text-left py-3 px-4">{t('cart.product')}</th>
                      <th className="text-center py-3 px-4">{t('cart.unitPrice')}</th>
                      <th className="text-center py-3 px-4">{t('cart.quantity')}</th>
                      <th className="text-right py-3 px-4">{t('cart.total')}</th>
                      <th className="py-3 px-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(({ product, quantity }) => {
                      const price = getPrice(product);
                      const id = getId(product);
                      const image = product.images?.[0] || product.image;
                      return (
                        <tr
                          key={id}
                          className="border-b border-gray-100"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-4">
                              {image && (
                                <img
                                  src={image}
                                  alt={product.name}
                                  className="w-[60px] h-[60px] object-contain flex-shrink-0"
                                />
                              )}
                              <Link
                                to={localePath(`vins/${product.slug}`)}
                                className="text-sm font-semibold text-secondary-800 hover:text-primary-600 transition-colors font-['Raleway']"
                              >
                                {product.name}
                              </Link>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center text-sm text-secondary-700 font-['Raleway']">
                            CHF {price.toFixed(2)}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center border border-gray-300">
                                <button
                                  onClick={() =>
                                    updateQuantity(id, quantity - 1)
                                  }
                                  className="w-10 h-10 flex items-center justify-center text-secondary-700 hover:bg-gray-100 transition-colors"
                                  aria-label="Diminuer"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-10 h-10 flex items-center justify-center text-sm font-['Raleway'] text-secondary-800 border-x border-gray-300">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(id, quantity + 1)
                                  }
                                  className="w-10 h-10 flex items-center justify-center text-secondary-700 hover:bg-gray-100 transition-colors"
                                  aria-label="Augmenter"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right text-sm font-semibold text-secondary-800 font-['Raleway']">
                            CHF {(price * quantity).toFixed(2)}
                          </td>
                          <td className="py-4 px-2">
                            <button
                              onClick={() => removeFromCart(id)}
                              className="p-2 text-secondary-400 hover:text-primary-600 transition-colors"
                              aria-label="Supprimer"
                            >
                              <X size={18} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {items.map(({ product, quantity }) => {
                  const price = getPrice(product);
                  const id = getId(product);
                  const image = product.images?.[0] || product.image;
                  return (
                    <div
                      key={id}
                      className="bg-white p-4 flex gap-4 items-start"
                    >
                      {image && (
                        <img
                          src={image}
                          alt={product.name}
                          className="w-[60px] h-[60px] object-contain flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <Link
                            to={localePath(`vins/${product.slug}`)}
                            className="text-sm font-semibold text-secondary-800 hover:text-primary-600 transition-colors font-['Raleway']"
                          >
                            {product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(id)}
                            className="p-2 text-secondary-400 hover:text-primary-600 transition-colors ml-2 flex-shrink-0"
                            aria-label="Supprimer"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        <p className="text-sm text-secondary-600 font-['Raleway'] mb-2">
                          CHF {price.toFixed(2)}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-300">
                            <button
                              onClick={() =>
                                updateQuantity(id, quantity - 1)
                              }
                              className="w-10 h-10 flex items-center justify-center text-secondary-700 hover:bg-gray-100 transition-colors"
                              aria-label="Diminuer"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 h-10 flex items-center justify-center text-sm font-['Raleway'] text-secondary-800 border-x border-gray-300">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(id, quantity + 1)
                              }
                              className="w-10 h-10 flex items-center justify-center text-secondary-700 hover:bg-gray-100 transition-colors"
                              aria-label="Augmenter"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-secondary-800 font-['Raleway']">
                            CHF {(price * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="mt-8 bg-white p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-secondary-600 font-['Raleway']">
                    {t('cart.subtotal')}
                  </span>
                  <span className="text-sm text-secondary-800 font-['Raleway']">
                    CHF {totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-secondary-600 font-['Raleway']">
                    {t('cart.shipping')}
                  </span>
                  <span className="text-sm font-semibold text-green-700 font-['Raleway']">
                    {t('cart.freeShipping')}
                  </span>
                </div>
                <hr className="border-gray-200 mb-4" />
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-secondary-900 font-['Raleway']">
                    {t('cart.totalLabel')}
                  </span>
                  <span className="text-xl font-bold text-secondary-900 font-['Raleway']">
                    CHF {totalPrice.toFixed(2)}
                  </span>
                </div>

                {checkoutError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm mb-4 bg-red-50 p-3 rounded">
                    <AlertCircle size={16} />
                    <span>{checkoutError}</span>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full bg-primary-600 text-white uppercase text-sm font-bold tracking-wider py-4 hover:bg-primary-700 transition-colors duration-200 font-['Raleway'] disabled:opacity-50"
                >
                  {checkoutLoading ? '...' : t('cart.order')}
                </button>

                <div className="text-center mt-4">
                  <Link
                    to={localePath('vins')}
                    className="text-sm text-secondary-600 hover:text-primary-600 transition-colors font-['Raleway'] underline py-2 inline-block"
                  >
                    {t('cart.continueShopping')}
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
