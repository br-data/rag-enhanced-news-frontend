import React from "react";
import { Link } from "@fluentui/react";
import { useHistory } from "react-router-dom";

interface RouteLinkProps {
  href?: string;
}

export const RouteLink: React.FunctionComponent<RouteLinkProps> = ({
  href,
}) => {
  const history = useHistory();
  const handleClick = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    href && history.push(href);
  };

  return <Link href={href} onClick={handleClick} />;
};
