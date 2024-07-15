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

interface AuthenticationProviderProps {
  children: React.ReactNode;
}

export const AuthenticationProvider: React.FunctionComponent<
  AuthenticationProviderProps
> = ({ children }) => {
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
};

export const useAuthentication = () => {
  return React.useContext(AuthenticationContext);
};
