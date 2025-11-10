// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({ loading: true, isAuthenticated: false, user: null, requirePasswordChange: false });

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    axios.get(`${VITE_API_URL}/auth/auth`, { withCredentials: true })
      .then((res) => {
        console.log("Role Check response:", res.data?.role);
        setAuth({ loading: false, isAuthenticated: true, user: res.data.user, requirePasswordChange: res.data.requirePasswordChange });
      })
      .catch(() => {
        setAuth({ loading: false, isAuthenticated: false, user: null, requirePasswordChange: false });
      });
  }, [VITE_API_URL]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);