import * as React from 'react';
import { type PropsWithChildren } from 'react';

import { type LoginStateContextType, LoginStateEnum, LoginStateContext } from './declaration';

export function LoginProvider({ children }: PropsWithChildren) {
  const [loginState, setLoginState] = React.useState(LoginStateEnum.LOGIN);

  const backToLogin = () => {
    setLoginState(LoginStateEnum.LOGIN);
  };

  const value: LoginStateContextType = React.useMemo(
    () => ({
      loginState,
      setLoginState,
      backToLogin
    }),
    [loginState]
  );

  return <LoginStateContext.Provider value={value}>{children}</LoginStateContext.Provider>;
}
