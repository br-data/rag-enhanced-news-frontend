import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthentication } from "../../global/authentication";

interface AuthorizedRouteProps {
  id: string;
  path: string;
  exact: boolean;
  strict: boolean;
  isPublic: boolean;
  children: React.ReactNode;
}

export const AuthorizedRoute: React.FunctionComponent<AuthorizedRouteProps> = ({
  id,
  path,
  exact,
  strict,
  isPublic,
  children,
  ...rest
}) => {
  const { isAuthenticated } = useAuthentication();
  const authorized = isPublic || isAuthenticated;
  return (
    <Route
      {...rest}
      key={id}
      path={path}
      exact={exact}
      strict={strict}
      render={({ location }) =>
        authorized ? (
          (children as React.ReactElement)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
