import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useGoogleOAuth } from '../hooks/useGoogleOAuth';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const { loginWithGoogle } = useAuth();
  const { googleConfig, isEnabled } = useGoogleOAuth();

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
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex justify-center">
        <GoogleOAuthProvider clientId={googleConfig.clientId}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => onError?.('Erreur Google Login')}
            theme="outline"
            size="large"
            text="continue_with"
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default GoogleLoginButton;
