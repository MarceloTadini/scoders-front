import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { AuthContextType, DecodedToken } from "../types";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const tokenResponse = await axios.get("/api/token");
        const token = tokenResponse.data.access_token;

        if (token) {
          setAccessToken(token);

          const decoded: DecodedToken = jwtDecode(token);
          setUserName(decoded.name || null);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unknown error occurred");
        }
      }
    }

    fetchToken();
  }, []);


  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated: !!accessToken, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
