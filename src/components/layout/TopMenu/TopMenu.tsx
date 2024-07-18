import React from "react";
import {
  Text,
  Stack,
  styled,
  classNamesFunction,
  Theme,
  Icon,
} from "@fluentui/react";
import { IStyleSetBase } from "@fluentui/merge-styles";

import { ThemeToggle } from "../../../global/themes";
import { UserMenu } from "./UserMenu";

const getStyles = ({ theme }: { theme: Theme }) => {
  return {
    root: {
      borderBottomStyle: "solid",
      borderBottomColor: theme.semanticColors.bodyFrameDivider,
      borderBottomWidth: 1,
      padding: `${theme.spacing.l1} ${theme.spacing.l1} ${theme.spacing.l1} ${theme.spacing.l2} `,
      height: 48,
    },
    icon: {
      fontSize: "1.25rem",
      marginRight: theme.spacing.s2,
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
      verticalAlign="center"
      className={classNames.root}
      tokens={{ childrenGap: "1em" }}
    >
      <Stack.Item grow={true}>
        <Icon
          iconName="CompassNW"
          className={classNames.icon}
          style={{ verticalAlign: "sub" }}
        />
        <Text variant="large">
          <strong>Accio</strong>
        </Text>
      </Stack.Item>
      <Stack.Item>
        <UserMenu />
        <ThemeToggle />
      </Stack.Item>
    </Stack>
  );
};

export const TopMenu = styled(TopMenuComponent, getStyles);
