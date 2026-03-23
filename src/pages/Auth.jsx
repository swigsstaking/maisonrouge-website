import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import GoogleLoginButton from '../components/GoogleLoginButton';

const Auth = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated, isLoading } = useAuth();
  const { t, localePath } = useLanguage();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(localePath('mon-compte'), { replace: true });
    }
  }, [isAuthenticated, isLoading]);

  // Register form state
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError('');
    setRegLoading(true);
    try {
      await register(regEmail, regPassword, regFirstName, regLastName);
      navigate(localePath('mon-compte'));
    } catch (err) {
      setRegError(err.message);
    } finally {
      setRegLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      await login(loginEmail, loginPassword);
      navigate(localePath('mon-compte'));
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

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
            {t('auth.bannerTitle')}
          </h1>
        </div>
      </div>

      {/* Two-column form */}
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left: Register */}
          <div>
            <h2 className="text-xl font-bold tracking-extra-wide uppercase text-secondary-800 mb-4">
              {t('auth.createTitle')}
            </h2>
            <p className="text-secondary-600 text-sm mb-6">
              {t('auth.createSubtitle')}
            </p>

            {regError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-4 py-3 mb-4">
                {regError}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-secondary-700 mb-1">
                  {t('auth.emailLabel')}
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full border border-secondary-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-secondary-700 mb-1">
                  {t('auth.passwordLabel')}
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full border border-secondary-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-secondary-700 mb-1">
                  {t('auth.firstNameLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={regFirstName}
                  onChange={(e) => setRegFirstName(e.target.value)}
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
                  value={regLastName}
                  onChange={(e) => setRegLastName(e.target.value)}
                  className="w-full border border-secondary-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <button
                type="submit"
                disabled={regLoading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold tracking-extra-wide uppercase py-3.5 rounded transition-colors disabled:opacity-50"
              >
                {regLoading ? t('auth.creating') : t('auth.createSubmit')}
              </button>
            </form>
          </div>

          {/* Right: Login */}
          <div>
            <h2 className="text-xl font-bold tracking-extra-wide uppercase text-secondary-800 mb-4">
              {t('auth.alreadyRegistered')}
            </h2>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-4 py-3 mb-4">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-secondary-700 mb-1">
                  {t('auth.emailLabel')}
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full border border-secondary-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-secondary-700 mb-1">
                  {t('auth.passwordLabel')}
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full border border-secondary-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="text-right">
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700 underline py-2 inline-block">
                  {t('auth.forgotPassword')}
                </a>
              </div>
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold tracking-extra-wide uppercase py-3.5 rounded transition-colors disabled:opacity-50"
              >
                {loginLoading ? t('auth.loggingIn') : t('auth.loginSubmit')}
              </button>
            </form>

            <GoogleLoginButton
              onSuccess={() => navigate(localePath('mon-compte'))}
              onError={(msg) => setLoginError(msg)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
