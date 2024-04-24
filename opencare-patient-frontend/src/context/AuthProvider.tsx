import { createContext, useState } from "react";

const AuthContext = createContext({});

type ThemeContextType = "";

export const AuthProvider = () => {
  const [auth, setAuth] = useState<ThemeContextType>();
  return <div></div>;
};

export default AuthContext;
