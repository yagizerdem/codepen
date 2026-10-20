import { createContext, useContext, useState } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: AuthProviderState = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);

  return (
    <AuthProviderContext.Provider
      {...props}
      value={{ isLoggedIn, setIsLoggedIn }}
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
