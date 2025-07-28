// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [loading, setLoading] = useState(true);

const VITE_API_URL = import.meta.env.VITE_API_URL;

setTimeout(() => {
    setLoading(false);
  }, 3000); 
    const [auth, setAuth] = useState({ loading, isAuthenticated: false, user: null });

  useEffect(() => {
    // Call backend to check auth status using cookie
    axios.get(`${VITE_API_URL}/auth/auth`, { withCredentials: true })
      .then((res) => {
        console.log("Role Check response:", res.data.role);
        setAuth({ loading: false, isAuthenticated: true, user: res.data.user});
      })
      .catch(() => {
        setAuth({ loading: false, isAuthenticated: false, user: null });
      });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);