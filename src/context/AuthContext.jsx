import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

const API_URL = 'https://swigs.online/api';
const SITE_SLUG = 'maisonrouge';
const TOKEN_KEY = 'maisonrouge-customer-token';

// Fallback values
let SITE_ID = '69bbb1f4120af70e9384c1b0';
let GOOGLE_CLIENT_ID = '189258755312-lifca4vi5v7k2u0hbavds8q34f4okoik.apps.googleusercontent.com';

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(true);
  const [googleReady, setGoogleReady] = useState(false);

  const isAuthenticated = !!customer && !!token;

  // Fetch site config + load Google script
  useEffect(() => {
    fetch(`${API_URL}/public/sites/${SITE_SLUG}`)
      .then(r => r.json())
      .then(data => {
        if (data.data) {
          SITE_ID = data.data._id;
          if (data.data.googleOAuthConfig?.enabled && data.data.googleOAuthConfig?.clientId) {
            GOOGLE_CLIENT_ID = data.data.googleOAuthConfig.clientId;
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        if (GOOGLE_CLIENT_ID) loadGoogleScript();
      });
  }, []);

  // Fetch profile on init
  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    fetch(`${API_URL}/customers/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid token');
        return res.json();
      })
      .then((data) => {
        setCustomer(data.customer || data.data || data);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setCustomer(null);
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  // Initialize Google when script loads
  useEffect(() => {
    if (!googleReady || !GOOGLE_CLIENT_ID || !window.google?.accounts?.id) return;
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        handleGoogleCredential(response.credential);
      },
    });
  }, [googleReady]);

  const loadGoogleScript = () => {
    if (document.getElementById('google-gis-script')) return;
    const script = document.createElement('script');
    script.id = 'google-gis-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleReady(true);
    document.head.appendChild(script);
  };

  const handleGoogleCredential = async (credential) => {
    try {
      const res = await fetch(`${API_URL}/customers/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential, siteId: SITE_ID }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Erreur Google Login');
      }
      const data = await res.json();
      const t = data.data?.token || data.token;
      const u = data.data || data.customer;
      localStorage.setItem(TOKEN_KEY, t);
      setToken(t);
      setCustomer(u);
    } catch (err) {
      console.error('Google login error:', err);
    }
  };

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API_URL}/customers/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, siteSlug: SITE_SLUG }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur lors de la connexion');
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setCustomer(data.customer);
    return data;
  }, []);

  const register = useCallback(async (email, password, firstName, lastName) => {
    const res = await fetch(`${API_URL}/customers/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName, siteSlug: SITE_SLUG }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Erreur lors de l'inscription");
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setCustomer(data.customer);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setCustomer(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    const res = await fetch(`${API_URL}/customers/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur lors de la mise à jour');
    setCustomer(data.customer || data);
    return data;
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ customer, token, login, register, logout, updateProfile, isAuthenticated, isLoading, googleReady: googleReady && !!GOOGLE_CLIENT_ID }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
