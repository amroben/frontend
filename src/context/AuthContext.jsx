// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // object from localStorage
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // اقرأ الجلسة من localStorage عند بدء التطبيق
    try {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (err) {
      console.error("AuthContext: failed to parse localStorage", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = ({ user: userData, token: jwt }) => {
    if (userData && jwt) {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", jwt);
      setUser(userData);
      setToken(jwt);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
