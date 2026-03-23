import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';
const SITE_SLUG = 'maisonrouge';
const TOKEN_KEY = 'maisonrouge-customer-token';
const CUSTOMER_KEY = 'maisonrouge-customer';

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(null);
  const [siteId, setSiteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!customer && !!token;

  // Load customer and token from localStorage on mount (like ADLR)
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedCustomer = localStorage.getItem(CUSTOMER_KEY);

    if (storedToken && storedCustomer) {
      try {
        setToken(storedToken);
        setCustomer(JSON.parse(storedCustomer));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(CUSTOMER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Fetch site ID
  useEffect(() => {
    fetch(`${API_URL}/public/sites/${SITE_SLUG}`)
      .then(r => r.json())
      .then(data => {
        if (data.data?._id) setSiteId(data.data._id);
      })
      .catch(() => {});
  }, []);

  // Save to localStorage when customer/token changes
  useEffect(() => {
    if (customer && token) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
    }
  }, [customer, token]);

  const login = useCallback(async (email, password) => {
    if (!siteId) throw new Error('Site non chargé, réessayez');
    const res = await fetch(`${API_URL}/customers/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, siteId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur lors de la connexion');
    const t = data.data?.token || data.token;
    const u = data.data || data.customer;
    setToken(t);
    setCustomer(u);
    return data;
  }, [siteId]);

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
    setToken(t);
    setCustomer(u);
    return u;
  }, [siteId]);

  const register = useCallback(async (email, password, firstName, lastName) => {
    if (!siteId) throw new Error('Site non chargé, réessayez');
    const res = await fetch(`${API_URL}/customers/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName, siteId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Erreur lors de l'inscription");
    const t = data.data?.token || data.token;
    const u = data.data || data.customer;
    setToken(t);
    setCustomer(u);
    return data;
  }, [siteId]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CUSTOMER_KEY);
    setToken(null);
    setCustomer(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    const res = await fetch(`${API_URL}/customers/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur lors de la mise à jour');
    const u = data.data || data.customer || data;
    setCustomer(u);
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
