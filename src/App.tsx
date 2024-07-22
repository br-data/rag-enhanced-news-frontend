import React, { Suspense } from "react";
import { BrowserRouter, Route as BrowserRoute, Switch } from "react-router-dom";
import { ProgressIndicator, styled, Theme } from "@fluentui/react";
import { get, isArray, isNil, flattenDeep, join } from "lodash";
import { AutoSwitchLayout } from "./components/layout/AutoSwitchLayout";
import {
  AuthorizedRoute,
  RouteIndexList,
  ComingSoon,
  NoMatch,
} from "./components/route/AllRoutes";
import { hierarchize, Node } from "./global/hierarchical";
import { routes } from "./routes";

const basename =
  process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : "/";
const keyName = "key";
const pathName = "path";
const uniqueKeyName = "uniqueKey";

console.log("basename", basename);

const generateRoutePath = (node: Node, parent?: Node) => {
  const parentUniqueKey = get(parent, uniqueKeyName);
  const uniqueKey = parentUniqueKey
    ? parentUniqueKey + "." + node[keyName]
    : node[keyName];

  const parentPath = get(parent, pathName, "");
  const routePath = get(
    node,
    pathName,
    join([`${parentPath}`, node[keyName]], "/"),
  ).replace(/\/+/g, "/");

  node[uniqueKeyName] = uniqueKey;
  node[pathName] = routePath;
};

const renderRoute = (route: Node): React.ReactNode[] => {
  const isGroup = isArray(route.children);
  const PageComponent = isNil(route.component)
    ? isGroup
      ? RouteIndexList
      : ComingSoon
    : route.component;

  const routeComponent = (
    <AuthorizedRoute
      id={route.key}
      key={route.uniqueKey}
      path={route.path}
      exact={route.exact || isArray(route.children)}
      strict={route.strict}
      isPublic={route.isPublic}
    >
      <PageComponent route={route} />
    </AuthorizedRoute>
  );

  const childComponents: React.ReactNode[] = isGroup
    ? route.children?.map(renderRoute) || []
    : [];

  return [routeComponent, ...childComponents];
};

interface AppProps {
  theme: Theme;
}

const App: React.FunctionComponent<AppProps> = ({ theme }) => {
  const { semanticColors } = theme;
  React.useLayoutEffect(() => {
    document.body.style.backgroundColor = semanticColors.bodyBackground;
    document.body.style.color = semanticColors.bodyText;
  }, [semanticColors]);

  const routeList = hierarchize(routes, undefined, generateRoutePath);
  const routeComponents = renderRoute(routeList);
  const flatRouteComponents = flattenDeep(routeComponents);

  console.log(
    "flatRouteComponents",
    // @ts-ignore
    flatRouteComponents.map((c) => c.props.path),
  );

  return (
    <BrowserRouter basename={basename}>
      <AutoSwitchLayout>
        <Suspense fallback={<ProgressIndicator label="Page loading..." />}>
          <Switch>
            <>{flatRouteComponents}</>
            <BrowserRoute path="*">
              <NoMatch />
            </BrowserRoute>
          </Switch>
        </Suspense>
      </AutoSwitchLayout>
    </BrowserRouter>
  );
};

export default styled(App as any, {});
