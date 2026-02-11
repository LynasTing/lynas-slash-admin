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
      // 复制数组避免直接修改 / clone array to avoid mutation
      const tempTabs = [...tabs];

      // 保证至少保留一个 tab / ensure at least one tab remains
      if (tempTabs.length === 1) return;

      // 找到要关闭的 tab / find tab index
      const deleteTabIndex = tempTabs.findIndex(i => i.key === path);
      if (deleteTabIndex === -1) return;

      // 决定导航到哪个 tab：前一个优先，没有就后一个 / decide next tab to navigate
      const routerPath = deleteTabIndex > 0 ? tempTabs[deleteTabIndex - 1].key : tempTabs[deleteTabIndex + 1].key;

      // 切换路由 / navigate to next tab
      navigate(routerPath);

      // 从数组中移除 tab / remove tab from array
      tempTabs.splice(deleteTabIndex, 1);

      // 更新状态 / update tabs state
      setTabs(tempTabs);
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
      const idx = tabs.findIndex(i => i.key === path);
      // 保留目标 tab 及其右侧 / keep target and right tabs
      const newTabs = tabs.slice(idx);
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
      const idx = tabs.findIndex(i => i.key === path);
      // 保留目标 tab 及其左侧 / keep target and left tabs
      const newTabs = tabs.slice(0, idx + 1);
      // 更新状态 / update tabs state
      setTabs(newTabs);
      // 确保路由跳转到目标 tab / navigate to target tab
      navigate(path);
    },
    [tabs, setTabs, navigate]
  );

  /**
   * Refresh the specified tab by updating its timestamp
   * 刷新指定 tab，通过更新时间戳实现
   */
  const refreshTab = useCallback(
    (path = activeTabRoutePath) => {
      // 更新 tabs 状态 / update tabs state
      setTabs(prev => {
        const newTabs = [...prev];
        // 找到目标 tab 索引 / find index of target tab
        const idx = newTabs.findIndex(i => i.key === path);
        if (idx > 0) {
          // 更新时间戳 / update timestamp
          newTabs[idx] = {
            ...newTabs[idx],
            timeStamp: new Date().getTime().toString()
          };
        }
        return newTabs;
      });
    },
    [activeTabRoutePath, setTabs]
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
