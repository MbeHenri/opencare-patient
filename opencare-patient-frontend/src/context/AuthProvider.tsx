import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/axios";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<any> => {
    try {
      const response = await api.post("/login", { username, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUser({ username });
      return response.data;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return false;
    }
  };

  const logout = () => {
    // Logique de déconnexion
    localStorage.removeItem("token");
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
