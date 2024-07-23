import React from "react";
import { useSessionStorage } from "react-use";

export const demoUsers = [
  {
    username: "demo",
    password: "demo",
    roles: ["user"],
    displayName: "Demo",
  },
  {
    username: "admin",
    password: "admin",
    roles: ["admin"],
    displayName: "Admin",
  },
];

// Warning: Authentication is currently disabled
export const defaultValues = {
  // isAuthenticated: false ,
  // principal: null,
  isAuthenticated: true,
  principal: demoUsers[0],
  login: (principal: any) => {},
  logout: () => {},
};

const STORAGE_KEY = "authentication";

export const AuthenticationContext = React.createContext(defaultValues);

interface AuthenticationProviderProps {
  children: React.ReactNode;
}

export const AuthenticationProvider: React.FunctionComponent<
  AuthenticationProviderProps
> = ({ children }) => {
  const [authentication, setAuthentication] = useSessionStorage(
    STORAGE_KEY,
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
