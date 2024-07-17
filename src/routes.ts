import React from "react";

export type Route = {
  key: string;
  uniqueKey?: string;
  name: string;
  icon?: string;
  path?: string;
  component?: any;
  isPublic?: boolean;
  isHidden?: boolean;
  children?: Route[];
};

export const routes: Route = {
  // key: "home",
  // name: "Home",
  // icon: "Home",
  // path: "/",
  // component: React.lazy(() => import("./pages/Dashboard/Dashboard")),
  key: "overview",
  name: "Overview",
  icon: "Home",
  path: "/",
  component: React.lazy(() => import("./pages/DataList/DataList")),
  children: [
    {
      key: "login",
      name: "Login",
      isPublic: true,
      isHidden: true,
      component: React.lazy(() => import("./pages/Login/Login")),
    },
    {
      key: "profile",
      name: "Profile",
      isHidden: true,
    },
    {
      key: "wires",
      name: "News Wires",
      icon: "visualizeApp",
      children: [
        {
          key: "details/:id",
          name: "Details",
          component: React.lazy(() => import("./pages/Details/Details")),
          isHidden: true,
        },
        {
          key: "world",
          name: "World",
          component: React.lazy(() => import("./pages/DataList/DataList")),
        },
        {
          key: "germany",
          name: "Germany",
          component: React.lazy(() => import("./pages/DataList/DataList")),
        },
        {
          key: "bavaria",
          name: "Bavaria",
          component: React.lazy(() => import("./pages/DataList/DataList")),
        },
      ],
    },
    {
      key: "profiles",
      name: "Profiles",
      icon: "managementApp",
      children: [
        {
          key: "prompts",
          name: "Prompts",
          icon: "Org",
        },
        {
          key: "personas",
          name: "Personas",
          icon: "People",
        },
        {
          key: "settings",
          name: "Settings",
          icon: "Settings",
          children: [
            {
              key: "list",
              name: "List",
            },
            {
              key: "unit",
              name: "Unit",
            },
          ],
        },
      ],
    },
  ],
};
