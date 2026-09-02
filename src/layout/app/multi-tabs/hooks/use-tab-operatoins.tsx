import { useCallback, type Dispatch, type SetStateAction } from 'react';
import type { KeepAliveTab } from '../types';
import { useNavigate } from 'react-router';
import { GLOBAL_CONFIG } from '@/config/global';

/**
 * Hook for tab operations: close a tab, close others, keep tabs in sync
 * 处理 Tab 页的操作：关闭当前 tab、关闭其他 tab，保持状态和路由一致
 */
export function useTabOperations(tabs: KeepAliveTab[], setTabs: Dispatch<SetStateAction<KeepAliveTab[]>>, activeTabRoutePath: string) {
  const navigate = useNavigate();

  /**
   * Close the specified tab, defaults to the active tab
   * 关闭指定 tab，默认关闭当前激活 tab
   */
  const closeTab = useCallback(
    (path = activeTabRoutePath) => {
      /**
       * 找到要关闭的标签；不存在的 key 不应改变标签状态
       *
       * Find the tab to close; an unknown key must not change the tabs state
       */
      const tabIndex: number = tabs.findIndex((tab: KeepAliveTab) => tab.key === path);
      if (tabIndex === -1 || tabs.length === 1) {
        return;
      }

      /**
       * 基于原列表生成剩余标签，避免直接修改 React 状态
       *
       * Create remaining tabs from the original list to avoid mutating React state
       */
      const remainingTabs: KeepAliveTab[] = tabs.filter((tab: KeepAliveTab) => tab.key !== path);

      if (path !== activeTabRoutePath) {
        setTabs(remainingTabs);
        return;
      }

      /**
       * 仅关闭当前标签时切换路由，优先回到左侧标签
       *
       * Navigate only when closing the active tab, preferring the tab on the left
       */
      const nextTabKey: string = tabIndex > 0 ? tabs[tabIndex - 1].key : tabs[tabIndex + 1].key;

      navigate(nextTabKey);
      setTabs(remainingTabs);
    },
    [tabs, setTabs, activeTabRoutePath, navigate]
  );

  /**
   * Close all tabs except the specified one, defaults to the active tab
   * 关闭除指定 tab 以外的所有 tab，默认保留当前激活 tab
   */
  const closeOthersTab = useCallback(
    (path = activeTabRoutePath) => {
      // 只保留目标 tab / keep only target tab
      setTabs((prev: KeepAliveTab[]) => prev.filter(i => i.key === path));

      // 如果目标 tab 不是当前激活的，切换路由 / navigate if target tab is not active
      if (path !== activeTabRoutePath) {
        navigate(path);
      }
    },
    [activeTabRoutePath, setTabs, navigate]
  );

  /**
   * Close all tabs and navigate to default route
   * 关闭所有 tab 并跳转到默认路由
   */
  const closeAll = useCallback(() => {
    // 清空所有 tab / clear all tabs
    setTabs([]);
    // 跳转到默认路由 / navigate to default route
    navigate(GLOBAL_CONFIG.defaultRoute);
  }, [setTabs, navigate]);

  /**
   * Close all tabs to the left of the specified tab
   * 关闭指定 tab 左侧的所有 tab
   */
  const closeLeft = useCallback(
    (path: string) => {
      // 找到目标 tab 索引 / find index of target tab
      const idx: number = tabs.findIndex((tab: KeepAliveTab) => tab.key === path);
      if (idx === -1) {
        return;
      }

      // 保留目标 tab 及其右侧 / keep target and right tabs
      const newTabs: KeepAliveTab[] = tabs.slice(idx);
      // 更新状态 / update tabs state
      setTabs(newTabs);
      // 确保路由跳转到目标 tab / navigate to target tab
      navigate(path);
    },
    [tabs, setTabs, navigate]
  );

  /**
   * Close all tabs to the right of the specified tab
   * 关闭指定 tab 右侧的所有 tab
   */
  const closeRight = useCallback(
    (path: string) => {
      // 找到目标 tab 索引 / find index of target tab
      const idx: number = tabs.findIndex((tab: KeepAliveTab) => tab.key === path);
      if (idx === -1) {
        return;
      }

      // 保留目标 tab 及其左侧 / keep target and left tabs
      const newTabs: KeepAliveTab[] = tabs.slice(0, idx + 1);
      // 更新状态 / update tabs state
      setTabs(newTabs);
      // 确保路由跳转到目标 tab / navigate to target tab
      navigate(path);
    },
    [tabs, setTabs, navigate]
  );

  /**
   * Refresh the active tab by reloading the current route
   * 刷新当前激活 tab，通过重新加载当前路由实现
   */
  const refreshTab = useCallback(
    (path = activeTabRoutePath) => {
      /**
       * 无缓存页面不能后台刷新非当前标签，避免错误地重载当前页面
       *
       * Cached pages are unavailable, so do not reload the active page for a background tab refresh
       */
      if (path !== activeTabRoutePath) {
        return;
      }

      navigate(0);
    },
    [activeTabRoutePath, navigate]
  );

  return {
    closeTab,
    closeOthersTab,
    closeAll,
    closeLeft,
    closeRight,
    refreshTab
  };
}
