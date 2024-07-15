import React from "react";
import { Stack, styled, classNamesFunction, Theme } from "@fluentui/react";
import { IStyleSetBase } from "@fluentui/merge-styles";

import { ThemeToggle } from "../../../global/themes";
import { UserMenu } from "./UserMenu";

const getStyles = ({ theme }: { theme: Theme }) => {
  return {
    root: {
      borderBottomStyle: "solid",
      borderBottomColor: theme.semanticColors.bodyFrameDivider,
      borderBottomWidth: 1,
      padding: theme.spacing.s1,
      height: 48,
    },
  };
};

const getClassNames = classNamesFunction();

interface TopMenuComponentProps {
  styles?: any;
  theme?: any;
}

const TopMenuComponent: React.FunctionComponent<TopMenuComponentProps> = ({
  styles,
  theme,
}) => {
  const classNames: IStyleSetBase = getClassNames(styles, { theme });

  return (
    <Stack
      horizontal
      horizontalAlign="end"
      className={classNames.root}
      tokens={{ childrenGap: "1em" }}
    >
      <UserMenu />
      <ThemeToggle />
    </Stack>
  );
};

export const TopMenu = styled(TopMenuComponent, getStyles);
