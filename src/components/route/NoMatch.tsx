import React from "react";
import { useLocation } from "react-router-dom";

export const NoMatch: React.FunctionComponent = () => {
  let location = useLocation();

  return (
    <div>
      <h3>404, Page not found.</h3>
      <p>
        The requested URL <code>{location.pathname}</code> was not found on this
        server.
      </p>
    </div>
  );
};
