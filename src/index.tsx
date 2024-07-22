import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { DynamicThemeProvider } from "./global/themes";
import { AuthenticationProvider } from "./global/authentication";

initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <DynamicThemeProvider>
        <App />
      </DynamicThemeProvider>
    </AuthenticationProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
