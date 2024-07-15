import React from "react";
import { useAuthentication } from "../../global/authentication";
import { MasterLayout } from "../layout/MasterLayout/MasterLayout";
import { BlankLayout } from "../layout/BlankLayout/BlankLayout";

export const AutoSwitchLayout: React.FunctionComponent = ({ children }) => {
  const { isAuthenticated } = useAuthentication();
  const Layout = isAuthenticated ? MasterLayout : BlankLayout;

  return <Layout>{children}</Layout>;
};
