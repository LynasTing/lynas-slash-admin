import type { RouteMeta } from '@/router/types';
import type { ReactNode, CSSProperties } from 'react';
import type { MenuProps } from 'antd';

/**
 * KeepAlive 标签页数据结构
 */
export type KeepAliveTab = RouteMeta & {
  /**
   * 标签页渲染的 React 节点
   * tab content react node
   */
  children: ReactNode;

  /**
   * 用于强制刷新标签页的时间戳
   * timestamp for refreshing tab
   */
  timeStamp?: string;
};

/**
 * 多标签页上下文类型
 */
export type MultiTabsContextType = {
  /**
   * 当前已经打开的标签页列表
   * opened tabs list
   */
  tabs: KeepAliveTab[];

  /**
   * 当前激活标签页的路由路径
   * active tab route path
   */
  activeTabRoutePath?: string;

  /**
   * 设置标签页列表
   * set tabs
   */
  setTabs: (tabs: KeepAliveTab[]) => void;

  /**
   * 关闭指定标签页
   * close other tabs
   */
  closeTab: (path?: string) => void;

  /**
   * 关闭除指定标签页外的其它标签页
   * close other tabs
   */
  closeOthersTab: (path?: string) => void;

  /**
   * 关闭指定标签页左侧的所有标签页
   * close tabs on the left
   */
  closeLeft: (path: string) => void;

  /**
   * 关闭指定标签页右侧的所有标签页
   * close tabs on the right
   */
  closeRight: (path: string) => void;

  /**
   * 关闭所有标签页
   * close all tabs
   */
  closeAll: () => void;

  /**
   * 刷新指定标签页
   * refresh a tab
   */
  refreshTab: (path: string) => void;
};

/**
 * 单个标签页组件的 Props 定义
 */
export type TabItemProps = {
  /**
   * 当前标签页数据
   * tab data
   */
  tab: KeepAliveTab;

  /**
   * 标签页自定义样式
   * inline style
   */
  style?: CSSProperties;

  /**
   * 标签页自定义类名
   * custom class name
   */
  className?: string;

  /**
   * 关闭标签页触发的回调
   * close tab callback
   */
  onClose?: () => void;
};

/**
 * 标签页下拉菜单组件类型
 */
export type TabDropdownProps = {
  /**
   * 下拉菜单项配置
   * dropdown menu item
   */
  menuItems: MenuProps['items'];

  /**
   * 菜单点击回调
   * menu item click handler
   */
  menuClick: (tab: KeepAliveTab) => void;
};

/**
 * 多标签操作类型枚举
 * Multi-tab operation enum
 *
 * 用于定义右键菜单以及标签栏中所有可执行的操作类型。
 * Used to define all executable operations in the tab context menu and tab bar.
 *
 * 枚举值会作为：
 * - 菜单项的 key
 * - 操作映射表的索引
 * - 国际化 key 的一部分
 *
 * Enum values are used as:
 * - Menu item keys
 * - Keys of the operation mapping object
 * - Part of the i18n translation key
 *
 * 采用字符串枚举而不是数字枚举，
 * 目的是提高可读性、可调试性和类型安全性。
 *
 * String enum is used instead of numeric enum
 * for better readability, debuggability, and type safety.
 */
export enum MultiTabOperation {
  /**
   * 全屏显示当前标签页
   * Display current tab in fullscreen mode
   */
  FULLSCREEN = 'fullscreen',

  /**
   * 刷新当前标签页
   * Refresh the current tab
   */
  REFRESH = 'refresh',

  /**
   * 关闭当前标签页
   * Close the current tab
   */
  CLOSE = 'close',

  /**
   * 关闭除当前标签外的其他标签
   * Close all tabs except the current one
   */
  CLOSEOTHERS = 'closeOthers',

  /**
   * 关闭所有标签页
   * Close all tabs
   */
  CLOSEALL = 'closeAll',

  /**
   * 关闭当前标签左侧的所有标签
   * Close all tabs to the left of the current tab
   */
  CLOSELEFT = 'closeLeft',

  /**
   * 关闭当前标签右侧的所有标签
   * Close all tabs to the right of the current tab
   */
  CLOSERIGHT = 'closeRight'
}
