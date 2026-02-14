import { useContext } from 'react';
import { createContext } from 'react';
import { MultiTabsContextType } from '../types';

/**
 * MultiTabsContext
 * 多标签页的全局上下文
 *
 * 用于向下提供：
 * - tabs 状态
 * - 当前激活 tab 的 route key
 * - 以及一组 tab 操作方法（关闭、刷新等）
 *
 * The global context for multi-tabs.
 * Provides:
 * - tabs state
 * - active tab route path
 * - tab operation methods
 */
export const MultiTabsContext = createContext<MultiTabsContextType>({
  tabs: [],
  activeTabRoutePath: '',
  setTabs: () => {},
  closeTab: () => {},
  closeOthersTab: () => {},
  closeAll: () => {},
  closeLeft: () => {},
  closeRight: () => {},
  refreshTab: () => {}
});

/**
 * useMultiTabsContext
 * MultiTabsContext 的消费 Hook
 *
 * 用于在任意子组件中访问 tabs 状态和操作方法
 *
 * Consumer hook for MultiTabsContext.
 */
export function useMultiTabsContext() {
  return useContext(MultiTabsContext);
}
