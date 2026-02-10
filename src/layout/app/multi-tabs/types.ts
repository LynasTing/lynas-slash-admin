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
