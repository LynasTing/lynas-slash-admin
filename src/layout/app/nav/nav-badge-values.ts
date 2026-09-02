import { createContext, createElement, useContext, type ReactNode } from 'react';

export type NavBadgeValueMap = Record<string, number | string | null | undefined>;

const EMPTY_NAV_BADGE_VALUES: NavBadgeValueMap = {};

const NavBadgeValuesContext = createContext<NavBadgeValueMap>(EMPTY_NAV_BADGE_VALUES);

type NavBadgeValuesProviderProps = {
  /**
   * 业务状态或接口查询提供的实时徽标数值
   *
   * Live badge values supplied by business state or an API query
   */
  values: NavBadgeValueMap;

  /**
   * 需要读取徽标数值的导航组件树
   *
   * Navigation component tree that needs to read badge values
   */
  children: ReactNode;
};

/**
 * 向导航组件树注入运行时徽标数值。
 * @param props - Provider 的徽标数值与子组件。
 * @returns 带有运行时徽标数据的组件树。
 *
 * Injects runtime badge values into the navigation component tree.
 * @param props - Provider badge values and children.
 * @returns Component tree with runtime badge data.
 */
export const NavBadgeValuesProvider = ({ values, children }: NavBadgeValuesProviderProps) =>
  createElement(NavBadgeValuesContext.Provider, { value: values }, children);

/**
 * 读取业务层提供的导航徽标数值。
 * @returns 以稳定业务键索引的徽标数值。
 *
 * Reads navigation badge values supplied by the business layer.
 * @returns Badge values indexed by stable business keys.
 */
export const useNavBadgeValues = (): NavBadgeValueMap => useContext(NavBadgeValuesContext);
