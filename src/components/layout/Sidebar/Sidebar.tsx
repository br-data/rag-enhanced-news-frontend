import React from "react";
import { isArray } from "lodash";
import { useHistory, useLocation, matchPath } from "react-router-dom";

import { findNode, getParents } from "../../../global/hierarchical";
import { routes, Route } from "../../../routes";
import { NavToggler } from "./Nav/NavToggler";

const findRoute = (pathname: string) => {
  const current = findNode(routes, (route) => {
    const match = matchPath(pathname, route.path);
    return !!match?.isExact;
  });
  const paths = current ? getParents(current) : [];
  return { current, paths };
};

const isVisible = (route: Route) => {
  return route.isHidden !== true;
};

const hasChildren = (route: Route) => {
  return route?.children?.filter(isVisible).length;
};

export const Sidebar = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const { current, paths } = findRoute(pathname);

  const mapRouteToNavLink = (route: Route, deeply = true): any => {
    return {
      name: route.name,
      key: route.uniqueKey,
      alternateText: route.name,
      title: route.name,
      url: route.path,
      onClick: (ev: React.MouseEvent<HTMLElement>) => {
        ev.preventDefault();
        history.push(route.path ?? "");
      },
      isExpanded:
        deeply &&
        hasChildren(route) &&
        paths.some((that) => that.uniqueKey === route.uniqueKey),
      links:
        deeply &&
        hasChildren(route) &&
        route.children &&
        route.children
          .filter(isVisible)
          .map((child) => mapRouteToNavLink(child, deeply)),
      icon: route.icon
        ? route.icon
        : hasChildren(route)
        ? "DocumentSet"
        : "Filter",
    };
  };

  const homeLink = mapRouteToNavLink(routes, false);
  const topPageLinks =
    (routes.children &&
      routes.children
        .filter((route) => isVisible(route) && !isArray(route.children))
        .map((route) => mapRouteToNavLink(route, false))) ||
    [];

  const groupLinks =
    (routes.children &&
      routes.children.filter(hasChildren).map((route) => ({
        name: route.name,
        groupType: "MenuGroup",
        links:
          route.children &&
          route.children
            .filter(isVisible)
            .map((child) => mapRouteToNavLink(child, true)),
      }))) ||
    [];

  const navLinkGroups = [
    {
      links: [
        {
          key: "Collapse",
          name: "Collapsed",
          alternateText: "Expanded",
          icon: "GlobalNavButton",
          title: "Collapse",
        },
      ],
      groupType: "ToggleGroup",
    },
    {
      links: [homeLink, ...topPageLinks],
      groupType: "MenuGroup",
    },
    ...groupLinks,
  ];

  return <NavToggler groups={navLinkGroups} selectedKey={current?.uniqueKey} />;
};
