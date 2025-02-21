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
  key: "news",
  name: "Latest News",
  icon: "News",
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
      name: "Categories",
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
              key: "categories",
              name: "Categories",
            },
            {
              key: "models",
              name: "Models",
            },
            {
              key: "news-sources",
              name: "News Sources",
            },
            {
              key: "archive-sources",
              name: "Archive Sources",
            },
          ],
        },
      ],
    },
  ],
};
