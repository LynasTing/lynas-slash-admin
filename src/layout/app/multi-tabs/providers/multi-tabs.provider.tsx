import { type ReactNode, useEffect, useMemo, useState } from 'react';
import type { KeepAliveTab } from '../types';
import { useTabOperations } from '../hooks/use-tab-operatoins';
import { MultiTabsContext } from './multi-tabs.hook';

/**
 * 多标签页状态提供者属性
 *
 * Multi-tabs state provider props
 */
type MultiTabsProviderProps = {
  /**
   * 需要访问多标签页状态的子组件
   *
   * Child components that need access to the multi-tabs state
   */
  children: ReactNode;

  /**
   * 由上游路由层解析出的当前页面标签
   *
   * Current page tab resolved by the upstream routing layer
   */
  currentTab: KeepAliveTab | null;

  /**
   * 由上游路由层确定的当前激活标签唯一标识
   *
   * Unique key of the active tab determined by the upstream routing layer
   */
  activeTabKey: string;
};

/**
 * MultiTabsProvider
 * 多标签页的状态提供者
 *
 * 本组件是整个 Tabs 系统的“状态源头”，
 * 负责维护 tabs 列表，并通过 Context 向下分发。
 *
 * This provider is the single source of truth
 * for all tab-related state.
 */
export function MultiTabsProvider({ children, currentTab, activeTabKey }: MultiTabsProviderProps): ReactNode {
  /**
   * tabs
   * 当前已经打开的标签页集合
   *
   * Each item represents a persisted tab.
   */
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);

  /**
   * useEffect: 同步当前页面标签到 tabs 列表
   *
   * 核心职责：
   * - 当当前路由首次出现时
   * - 将其加入 tabs
   *
   * This effect ensures the current page tab
   * is registered if it doesn't exist.
   */
  useEffect(() => {
    if (!currentTab || currentTab.isTabHidden) {
      return;
    }

    setTabs((previousTabs: KeepAliveTab[]) => {
      /**
       * 按稳定 key 判断当前标签是否已经注册，避免路由重渲染造成重复标签
       *
       * Check the stable key to prevent duplicate tabs during route re-renders
       */
      const hasCurrentTab: boolean = previousTabs.some((tab: KeepAliveTab) => tab.key === currentTab.key);

      return hasCurrentTab ? previousTabs : [...previousTabs, currentTab];
    });
  }, [currentTab]);

  /**
   * operations
   * Tab 操作集合（关闭、刷新、关闭其他等）
   *
   * 该 Hook 依赖：
   * - 当前 tabs
   * - setTabs
   * - 当前激活 tab 的 key
   *
   * Encapsulates all tab mutation logic.
   */
  const operations = useTabOperations(tabs, setTabs, activeTabKey);

  /**
   * contextValue
   * 提供给 Context Consumer 的最终值
   *
   * 使用 useMemo 防止不必要的 Provider 级别重渲染
   *
   * Memoized context value to reduce re-renders.
   */
  const contextValue = useMemo(
    () => ({
      tabs,
      activeTabRoutePath: activeTabKey,
      setTabs,
      ...operations
    }),
    [tabs, activeTabKey, operations]
  );

  /**
   * Context Provider
   * 向子组件树提供 tabs 相关能力
   */
  return <MultiTabsContext.Provider value={contextValue}>{children}</MultiTabsContext.Provider>;
}
