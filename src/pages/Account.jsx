import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

const Account = () => {
  const navigate = useNavigate();
  const { customer, token, logout, updateProfile, isAuthenticated, isLoading } = useAuth();
  const { t, localePath } = useLanguage();

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Edit profile state
  const [editing, setEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editError, setEditError] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(localePath('connexion'), { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Set edit fields when customer loads
  useEffect(() => {
    if (customer) {
      setEditFirstName(customer.firstName || '');
      setEditLastName(customer.lastName || '');
    }
  }, [customer]);

  // Fetch orders
  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/orders/customer`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
      })
      .then((data) => {
        setOrders(Array.isArray(data) ? data : data.data || data.orders || []);
      })
      .catch(() => {
        setOrders([]);
      })
      .finally(() => setOrdersLoading(false));
  }, [token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setEditError('');
    setEditLoading(true);
    try {
      await updateProfile({ firstName: editFirstName, lastName: editLastName });
      setEditing(false);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate(localePath(''));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('fr-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatStatus = (status) => {
    const map = {
      pending: t('account.statusPending'),
      processing: t('account.statusProcessing'),
      shipped: t('account.statusShipped'),
      delivered: t('account.statusDelivered'),
      cancelled: t('account.statusCancelled'),
    };
    return map[status] || status || '-';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-secondary-500 text-sm">{t('account.loading')}</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div>
      {/* Banner */}
      <div className="relative h-40 md:h-52">
        <img
          src="/banner-small1.jpg"
          alt="Maison Rouge"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold tracking-extra-wide uppercase">
            {t('account.bannerTitle')}
          </h1>
        </div>
      </div>

      <div className="container-site py-12 md:py-16">
        {/* Welcome */}
        <p className="text-lg text-secondary-700 mb-10">
          {t('account.welcome')} <span className="font-semibold">{customer?.firstName}</span> !
        </p>

        {/* Mes informations */}
        <section className="mb-12">
          <h2 className="text-xl font-bold tracking-extra-wide uppercase text-secondary-800 mb-6">
            {t('account.myInfo')}
          </h2>

          {!editing ? (
            <div className="bg-white rounded-lg border border-secondary-200 p-6">
              <div className="space-y-3 text-sm">
                <div className="flex">
                  <span className="text-secondary-500 w-28 font-semibold">{t('account.emailLabel')}</span>
                  <span className="text-secondary-800">{customer?.email}</span>
                </div>
                <div className="flex">
                  <span className="text-secondary-500 w-28 font-semibold">{t('account.firstNameLabel')}</span>
                  <span className="text-secondary-800">{customer?.firstName}</span>
                </div>
                <div className="flex">
                  <span className="text-secondary-500 w-28 font-semibold">{t('account.lastNameLabel')}</span>
                  <span className="text-secondary-800">{customer?.lastName}</span>
                </div>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="mt-5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold tracking-extra-wide uppercase px-6 py-2.5 rounded transition-colors"
              >
                {t('account.edit')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="bg-white rounded-lg border border-secondary-200 p-6">
              {editError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-4 py-3 mb-4">
                  {editError}
                </div>
              )}
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase text-secondary-700 mb-1">
                    {t('auth.email')}
                  </label>
                  <input
                    type="email"
                    disabled
                    value={customer?.email || ''}
                    className="w-full border border-secondary-200 rounded px-4 py-2.5 text-sm bg-secondary-50 text-secondary-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase text-secondary-700 mb-1">
                    {t('auth.firstNameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    className="w-full border border-secondary-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase text-secondary-700 mb-1">
                    {t('auth.lastNameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    className="w-full border border-secondary-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  type="submit"
                  disabled={editLoading}
                  className="bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold tracking-extra-wide uppercase px-6 py-2.5 rounded transition-colors disabled:opacity-50"
                >
                  {editLoading ? t('account.saving') : t('account.save')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setEditError('');
                    setEditFirstName(customer?.firstName || '');
                    setEditLastName(customer?.lastName || '');
                  }}
                  className="border border-secondary-300 text-secondary-600 text-xs font-bold tracking-extra-wide uppercase px-6 py-2.5 rounded hover:bg-secondary-50 transition-colors"
                >
                  {t('account.cancel')}
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Mes commandes */}
        <section className="mb-12">
          <h2 className="text-xl font-bold tracking-extra-wide uppercase text-secondary-800 mb-6">
            {t('account.myOrders')}
          </h2>

          {ordersLoading ? (
            <p className="text-secondary-500 text-sm">{t('account.loadingOrders')}</p>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg border border-secondary-200 p-6">
              <p className="text-secondary-500 text-sm">
                {t('account.noOrders')}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-secondary-200 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-secondary-200 bg-secondary-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase text-secondary-600">
                      {t('account.orderNumber')}
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase text-secondary-600">
                      {t('account.date')}
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase text-secondary-600">
                      {t('account.total')}
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase text-secondary-600">
                      {t('account.status')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-secondary-100 last:border-b-0">
                      <td className="px-4 py-3 text-secondary-800 font-medium">
                        {order.orderNumber || order._id?.slice(-8)}
                      </td>
                      <td className="px-4 py-3 text-secondary-600">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-secondary-800 font-semibold">
                        {order.total != null ? `CHF ${Number(order.total).toFixed(2)}` : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block bg-secondary-100 text-secondary-700 text-xs font-medium px-2.5 py-1 rounded">
                          {formatStatus(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="border border-secondary-300 text-secondary-600 text-xs font-bold tracking-extra-wide uppercase px-8 py-2.5 rounded hover:bg-secondary-50 transition-colors"
        >
          {t('account.logout')}
        </button>
      </div>
    </div>
  );
};

export default Account;
