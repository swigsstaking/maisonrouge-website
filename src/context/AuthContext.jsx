import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

const API_URL = 'https://swigs.online/api';
const SITE_SLUG = 'maisonrouge';
const TOKEN_KEY = 'maisonrouge-customer-token';

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [siteId, setSiteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!customer && !!token;

  // Fetch site ID
  useEffect(() => {
    fetch(`${API_URL}/public/sites/${SITE_SLUG}`)
      .then(r => r.json())
      .then(data => {
        if (data.data?._id) setSiteId(data.data._id);
      })
      .catch(() => {});
  }, []);

  // Fetch profile on init
  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    if (customer) {
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

  const loginWithGoogle = useCallback(async (credential) => {
    if (!siteId) throw new Error('Site not loaded');
    const res = await fetch(`${API_URL}/customers/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential, siteId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur Google Login');
    const t = data.data?.token || data.token;
    const u = data.data || data.customer;
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
    setCustomer(u);
    return u;
  }, [siteId]);

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
      value={{ customer, token, siteId, login, loginWithGoogle, register, logout, updateProfile, isAuthenticated, isLoading }}
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
