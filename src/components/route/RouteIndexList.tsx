import React from "react";
import { RouteLink } from "./RouteLink";
import { Route } from "../../routes";

interface RouteIndexListProps {
  route: Route;
}

export const RouteIndexList: React.FunctionComponent<RouteIndexListProps> = ({
  route,
}) => {
  return (
    <dl>
      <dt>
        <h3>Index of {route.name}</h3>
      </dt>
      {route.children &&
        route.children.map((child) => (
          <dd key={child.key}>
            <RouteLink href={child.path}>{child.name}</RouteLink>
          </dd>
        ))}
    </dl>
  );
};
