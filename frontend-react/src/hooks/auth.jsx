import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@AppMoveIt:token");
    const user = localStorage.getItem("@AppMoveIt:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("signin", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("@AppMoveIt:token", token);
    localStorage.setItem("@AppMoveIt:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@AppMoveIt:token");
    localStorage.removeItem("@AppMoveIt:user");

    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado por dentro de um AuthProvider");
  }

  return context;
}
