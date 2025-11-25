import * as React from 'react';

/**
 * 登录状态
 * Login state
 */
export enum LoginStateEnum {
  /**
   * Login 登录
   *
   */
  LOGIN = 1,

  /**
   * Register 注册
   */
  REGISTER = 2,

  /**
   * ResetPassword 重置密码
   */
  RESET_PASSWORD = 3,

  /**
   * Mobile 手机登录
   */
  MOBILE = 4,

  /**
   * QrCode 扫码登录
   */
  QR_CODE = 5
}

export interface LoginStateContextType {
  loginState: LoginStateEnum;
  setLoginState: (loginState: LoginStateEnum) => void;
}

/**
 * 登录状态上下文
 */
export const LoginStateContext = React.createContext<LoginStateContextType>({
  loginState: LoginStateEnum.LOGIN,
  setLoginState: () => {}
});

/**
 * 获取登录状态上下文
 */
export const useLoginStateContext = () => React.useContext(LoginStateContext);
