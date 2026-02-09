import type { ReactNode } from 'react';
import type { Params, RouteObject } from 'react-router';

export interface RouteMeta {
  /**
   * 唯一标识 key
   * unique key
   */
  key: string;

  /**
   * 菜单名称（支持 i18n）
   * menu label, i18n
   */
  label: string;

  /**
   * 菜单前缀图标
   * menu prefix icon
   */
  icon?: ReactNode;

  /**
   * 菜单后缀信息或图标
   * menu suffix icon
   */
  info?: ReactNode;

  /**
   * 是否在菜单中隐藏
   * hide in menu
   */
  hideMenu?: boolean;

  /**
   * 是否在多标签页中隐藏
   * hide in multi tab
   */
  hideTab?: boolean;

  /**
   * 是否在菜单中禁用
   * disable in menu
   */
  disabled?: boolean;

  /**
   * React Router Outlet 渲染节点
   * react router outlet
   */
  outlet?: ReactNode;

  /**
   * 用于刷新 Tab 的时间戳
   * use to refresh tab
   */
  timeStamp?: string;

  /**
   * 外链或 iframe 页面地址
   * external link and iframe need
   */
  frameSrc?: URL;

  /**
   * 动态路由参数
   * dynamic route params
   *
   * @example /user/:id
   */
  params?: Params<string>;
}

/**
 * 应用路由对象定义
 */
export type AppRouteObject = {
  /**
   * 路由排序权重，数值越小越靠前
   * route order
   */
  order?: number;

  /**
   * 路由元信息（菜单、权限、图标等）
   * route meta info
   */
  meta?: RouteMeta;

  /**
   * 子路由配置
   * child routes
   */
  children?: AppRouteObject[];
} &
  /**
   * 继承 React Router RouteObject，但排除原有 children，
   * 使用自定义的 AppRouteObject children 以支持扩展字段
   *
   * extend RouteObject without children
   */
  Omit<RouteObject, 'children'>;
