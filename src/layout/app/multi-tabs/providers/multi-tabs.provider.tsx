import { ReactNode, useState, useMemo, useEffect } from 'react';
import type { KeepAliveTab } from '../types';
import type { RouteMeta } from '@/router/types';
import { useTabOperations } from '../hooks/use-tab-operatoins';
import { MultiTabsContext } from './multi-tabs.hook';

/**
 * MultitabsProvider
 * 多标签页的状态提供者
 *
 * 本组件是整个 Tabs 系统的“状态源头”，
 * 负责维护 tabs 列表，并通过 Context 向下分发。
 *
 * This provider is the single source of truth
 * for all tab-related state.
 */
export function MultitabsProvider({ children }: { children: ReactNode }) {
  /**
   * tabs
   * 当前已经打开的标签页集合
   *
   * Each item represents a persisted tab.
   */
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);

  /**
   * currentRouteMeta
   * 当前路由对应的元信息
   *
   * 目前是一个“静态 mock 值”，
   * 用 useMemo 固定引用，避免每次 render 生成新对象。
   *
   * This is currently a static route meta.
   * useMemo ensures the reference stays stable.
   */
  const currentRouteMeta = useMemo<RouteMeta>(
    () => ({
      key: '/',
      label: 'home',
      hideTab: false,
      outlet: null,
      params: {}
    }),
    []
  );

  /**
   * activeTabRoutePath
   * 当前激活 Tab 的唯一标识
   *
   * 本质上是 currentRouteMeta.key 的一个派生值。
   *
   * Derived value representing the active tab key.
   */
  const activeTabRoutePath = useMemo(() => currentRouteMeta.key, [currentRouteMeta]);

  /**
   * useEffect: 同步当前路由到 tabs 列表
   *
   * 核心职责：
   * - 当当前路由首次出现时
   * - 将其转换为一个 tab 并加入 tabs
   *
   * This effect ensures the current route
   * is registered as a tab if it doesn't exist.
   */
  useEffect(() => {
    setTabs(prev => {
      /**
       * filtered
       * 过滤掉 hideTab === true 的 tab
       *
       * NOTE:
       * 这里的语义是“只保留需要显示的 tab”
       *
       * Filters out tabs that should not be displayed.
       */
      const filtered = prev.filter(i => i.hideTab);

      /**
       * 从当前路由中提取关键信息
       *
       * key: 用作 tab 的唯一标识
       * children: 实际来自 outlet，用于渲染内容
       */
      const { key, outlet: children } = currentRouteMeta;

      /**
       * 判断当前 route 是否已经存在于 tabs 中
       *
       * Tabs are deduplicated by route key.
       */
      const isExisted = filtered.find(i => i.key === key);

      /**
       * 如果不存在，则追加一个新的 tab
       *
       * timeStamp:
       * 用于区分 tab 实例或作为强制刷新标识
       */
      if (!isExisted) {
        return [
          ...filtered,
          {
            ...currentRouteMeta,
            key,
            children,
            timeStamp: new Date().getTime().toString()
          }
        ];
      }

      /**
       * 如果已经存在，直接返回原 tabs
       *
       * No-op when tab already exists.
       */
      return filtered;
    });
  }, [currentRouteMeta]);

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
  const operations = useTabOperations(tabs, setTabs, activeTabRoutePath);

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
      activeTabRoutePath,
      setTabs,
      ...operations
    }),
    [tabs, activeTabRoutePath, operations]
  );

  /**
   * Context Provider
   * 向子组件树提供 tabs 相关能力
   */
  return <MultiTabsContext.Provider value={contextValue}>{children}</MultiTabsContext.Provider>;
}
