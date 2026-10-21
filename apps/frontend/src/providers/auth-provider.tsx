import { createContext, useCallback, useContext, useEffect, useState } from "react";
import API from "@/lib/axios-wrapper";

type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthUser = {
  _id: string;
  username: string;
  email: string;
  age?: number;
  createdAt?: string;
  updatedAt?: string;
};

type AuthProviderState = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
};

const initialState: AuthProviderState = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
  refreshUser: async () => {},
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
  const [user, setUser] = useState<AuthUser | null>(initialState.user);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);

  // Any non-2xx (e.g. 401 unauthorized) means there is no valid session.
  const refreshUser = useCallback(async () => {
    try {
      const res = await API.get("/api/auth/me");
      setUser(res.data?.data ?? null);
      setIsLoggedIn(true);
    } catch {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, [refreshUser]);

  return (
    <AuthProviderContext.Provider
      {...props}
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        refreshUser,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
