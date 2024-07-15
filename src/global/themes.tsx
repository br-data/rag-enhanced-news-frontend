import React from "react";
import { useLocalStorage } from "react-use";
import { DefaultTheme, DarkTheme, TeamsTheme } from "@fluentui/theme-samples";
import { ThemeProvider, CommandBarButton, Theme } from "@fluentui/react";

export const themes: { [key: string]: Theme } = {
  default: DefaultTheme,
  dark: DarkTheme,
  teams: TeamsTheme,
};

export interface ThemeContextType {
  theme: string;
  changeTheme: (name: string) => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "default",
  changeTheme: (name) => {},
} as ThemeContextType);

export const useTheme = () => React.useContext(ThemeContext);

function ThemeConsumer({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>;
}

export const DynamicThemeProvider: React.FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "default");
  const changeTheme = (name: string): void => themes[name] && setTheme(name);
  const themeContextValue = { theme: theme || "default", changeTheme };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeConsumer>{children}</ThemeConsumer>
    </ThemeContext.Provider>
  );
};

type ThemeToggleProps = {
  as?: any;
};

export const ThemeToggle: React.FunctionComponent<ThemeToggleProps> = ({
  as: ButtonComponent,
}) => {
  const { theme, changeTheme } = useTheme();
  const menuItems = Object.keys(themes).map((key) => ({
    key,
    text: key,
    canCheck: true,
    checked: theme === key,
    onClick: () => changeTheme(key),
  }));

  return (
    <ButtonComponent
      menuProps={{ shouldFocusOnMount: true, items: menuItems }}
      iconProps={{ iconName: "Color" }}
    >
      {theme}
    </ButtonComponent>
  );
};

ThemeToggle.defaultProps = {
  as: CommandBarButton,
};
