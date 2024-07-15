import React from "react";
import {
  Stack,
  styled,
  classNamesFunction,
  IProcessedStyleSet,
  Theme,
} from "@fluentui/react";
import { IStyleSetBase } from "@fluentui/merge-styles";
import { Sidebar } from "../Sidebar/Sidebar";
import { TopMenu } from "../TopMenu/TopMenu";

const getStyles = ({ theme }: { theme: Theme }) => {
  return {
    root: {},
    sidebar: {},
    contentWrapper: {
      paddingLeft: theme.spacing.l2,
      paddingRight: theme.spacing.l2,
    },
  };
};

const getClassNames = classNamesFunction();

interface MasterLayoutComponentProps {
  theme?: Theme;
  styles?: any;
  children: React.ReactNode;
}

const MasterLayoutComponent: React.FunctionComponent<
  MasterLayoutComponentProps
> = ({ children, theme, styles }) => {
  const classNames: IProcessedStyleSet<IStyleSetBase> & {
    root?: string;
    sidebar?: string;
    contentWrapper?: string;
  } = getClassNames(styles, { theme });

  return (
    <Stack horizontal className={classNames.root}>
      <Stack.Item grow={false} className={classNames.sidebar}>
        <Sidebar />
      </Stack.Item>
      <Stack.Item grow={true}>
        <TopMenu />
        <Stack className={classNames.contentWrapper}>{children}</Stack>
      </Stack.Item>
    </Stack>
  );
};

export const MasterLayout = styled(MasterLayoutComponent, getStyles);
