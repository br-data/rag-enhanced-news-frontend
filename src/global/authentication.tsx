import React from "react";
import { useSessionStorage } from "react-use";

const defaultValues = {
  isAuthenticated: false as boolean,
  principal: null,
  login: (principal: any) => {},
  logout: () => {},
};

const STOREGE_KEY = "authentication";

export const AuthenticationContext = React.createContext(defaultValues);

export function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authentication, setAuthentication] = useSessionStorage(
    STOREGE_KEY,
    defaultValues,
  );

  const login = (principal: any) =>
    setAuthentication({ isAuthenticated: true, principal, login, logout });

  const logout = () => setAuthentication(defaultValues);

  const authenticationValue = { ...authentication, login, logout };

  return (
    <AuthenticationContext.Provider value={authenticationValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return React.useContext(AuthenticationContext);
}
