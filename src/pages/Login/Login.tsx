import React from "react";
import {
  classNamesFunction,
  DefaultButton,
  Link,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  styled,
  TextField,
  Theme,
} from "@fluentui/react";
import { IStyleSetBase } from "@fluentui/merge-styles";
import { get } from "lodash";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { ThemeToggle } from "../../global/themes";
import { useAuthentication } from "../../global/authentication";

const demoUsers = [
  {
    username: "admin",
    password: "admin",
    roles: ["admin"],
    displayName: "Admin User",
  },
  {
    username: "demo",
    password: "demo",
    roles: ["user"],
    displayName: "Demo User",
  },
];

const getClassNames = classNamesFunction();

interface LoginFormProps {
  theme: Theme;
  styles: any;
}

export const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  theme,
  styles,
}) => {
  const { isAuthenticated, login, logout } = useAuthentication();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [error, setError] = React.useState();
  const history = useHistory();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from || {
    pathname: "/",
  };

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    setError(undefined);
    remoteAuthService({ username: values.username, password: values.password })
      .then((identity) => {
        login(identity);
        history.replace(from);
      })
      .catch(setError);
  };

  const getErrorMessage = (name: string) => {
    const errorMessage = get(errors, name + ".message");
    return errorMessage ? errorMessage.toString() : undefined;
  };

  const classNames: IStyleSetBase = getClassNames(styles, {
    theme,
  });

  return (
    <Stack className={classNames.root}>
      {isAuthenticated && (
        <Stack tokens={{ childrenGap: "1em" }}>
          <h3 className={classNames.title}>You are already signed in.</h3>
          <Stack horizontal tokens={{ childrenGap: "1em" }}>
            <PrimaryButton
              onClick={() => history.push("/")}
              iconProps={{ iconName: "Home" }}
            >
              Go to Home
            </PrimaryButton>
            <DefaultButton onClick={logout} iconProps={{ iconName: "SignOut" }}>
              Logout
            </DefaultButton>
          </Stack>
        </Stack>
      )}

      {!isAuthenticated && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack horizontal horizontalAlign="end" verticalAlign="center">
            <ThemeToggle as={DefaultButton} />
          </Stack>
          <h3 className={classNames.title}>Login</h3>
          <Stack
            tokens={{
              childrenGap: "1em",
            }}
          >
            <Controller
              control={control}
              defaultValue=""
              name="username"
              rules={{
                required: "Please enter your username",
                minLength: {
                  value: 3,
                  message: "Please enter your username",
                },
                maxLength: { value: 32, message: "Username is too long" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  type="text"
                  id="username"
                  autoComplete="username"
                  errorMessage={getErrorMessage("username")}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Please enter your password",
                minLength: {
                  value: 4,
                  message: "Please enter your password",
                },
                maxLength: { value: 64, message: "Password is too long" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  errorMessage={getErrorMessage("password")}
                />
              )}
            />

            <Stack
              horizontal
              horizontalAlign="end"
              tokens={{ childrenGap: "1em" }}
            >
              <Link>Find my password</Link>
              <PrimaryButton type="submit">Login</PrimaryButton>
            </Stack>
            <Stack>
              <h3 className={classNames.demoHeadline}>Demo users</h3>
              <ul className={classNames.demoList}>
                {demoUsers.map((user) => (
                  <li key={user.username}>
                    {user.displayName} ({user.username}/{user.password})
                  </li>
                ))}
              </ul>
            </Stack>
            {error && (
              <MessageBar
                messageBarType={MessageBarType.error}
                onDismiss={() => setError(undefined)}
              >
                {error}
              </MessageBar>
            )}
          </Stack>
        </form>
      )}
    </Stack>
  );
};

const remoteAuthService = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const found = demoUsers.find(
    (user) => username.toLocaleLowerCase() === user.username,
  );

  if (found?.password === password) {
    return Promise.resolve({
      username: found.username,
      token: username + "_" + Math.random(),
      displayName: found.displayName,
      roles: found.roles,
    });
  } else {
    return Promise.reject("Incorrect username or password");
  }
};

const getStyles = ({ theme }: { theme: Theme }) => {
  return {
    root: {
      margin: "10em auto",
      width: "30em",
      backgroundColor: theme.palette.neutralLighter,
      padding: theme.spacing.l2,
      borderRadius: theme.effects.roundedCorner2,
    },
    title: {
      ...theme.fonts.xxLarge,
      marginTop: 0,
    },
    demoHeadline: {
      marginBottom: 0,
    },
    demoList: {
      paddingLeft: theme.spacing.s2,
      listStyle: "inside",
    },
  };
};

export default styled(LoginForm, getStyles);
