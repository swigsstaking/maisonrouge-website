import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useGoogleOAuth } from '../hooks/useGoogleOAuth';
import { useLanguage } from '../context/LanguageContext';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const { loginWithGoogle } = useAuth();
  const { googleConfig, isEnabled } = useGoogleOAuth();
  const { lang } = useLanguage();

  if (!isEnabled || !googleConfig?.clientId) return null;

  const handleSuccess = async (credentialResponse) => {
    try {
      await loginWithGoogle(credentialResponse.credential);
      onSuccess?.();
    } catch (err) {
      onError?.(err.message);
    }
  };

  return (
    <div className="mt-6">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-400 uppercase tracking-wide text-xs">ou</span>
        </div>
      </div>

      <div className="flex justify-center">
        <GoogleOAuthProvider clientId={googleConfig.clientId}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => onError?.('Erreur Google Login')}
            theme="outline"
            size="large"
            text="continue_with"
            shape="rectangular"
            width="300"
            locale={lang || 'fr'}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default GoogleLoginButton;
