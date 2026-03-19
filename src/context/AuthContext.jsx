import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

const API_URL = 'https://swigs.online/api';
const SITE_ID = 'maisonrouge';
const TOKEN_KEY = 'maisonrouge-customer-token';

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!customer && !!token;

  // Fetch profile on init if token exists
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
        setCustomer(data.customer || data);
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
      body: JSON.stringify({ email, password, siteId: SITE_ID }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Erreur lors de la connexion');
    }

    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setCustomer(data.customer);
    return data;
  }, []);

  const register = useCallback(async (email, password, firstName, lastName) => {
    const res = await fetch(`${API_URL}/customers/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName, siteId: SITE_ID }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Erreur lors de l'inscription");
    }

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

    if (!res.ok) {
      throw new Error(data.message || 'Erreur lors de la mise à jour');
    }

    setCustomer(data.customer || data);
    return data;
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ customer, token, login, register, logout, updateProfile, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
