import { useTranslation } from 'react-i18next';
import type { KeepAliveTab } from '../types';
import { USER_LIST } from '@/_mock/assets';
import { useMemo, ReactNode } from 'react';

/**
 * Hook for rendering tab labels with special business logic
 * 用于渲染 Tab 标题的 Hook，支持通用标题和特殊业务标题定制
 */
export function useTabLabelRender() {
  // i18n translation function / 国际化翻译函数
  const { t } = useTranslation();

  /**
   * Special tab label render map
   * 特殊 Tab 标题渲染规则映射表
   *
   * key: tab.label
   * value: function to generate tab label
   *
   * key：tab 的 label 标识
   * value：用于生成 Tab 标题的渲染函数
   */
  const speciaTabRenderMap = useMemo<Record<string, (tab: KeepAliveTab) => ReactNode>>(
    () => ({
      /**
       * User detail tab label renderer
       * 用户详情 Tab 的标题渲染规则
       *
       * Example result:
       * 张三-用户详情
       */
      'dashboard.nav.system.userDetail': (tab: KeepAliveTab) => {
        // Get user id from route params / 从路由参数中获取用户 ID
        const userId = tab.params?.id;

        // Default translated label / 默认的国际化标题
        const defaultLabel = t(tab.label);

        // If userId exists, append username to label / 如果存在用户 ID，则在标题前拼接用户名
        if (userId) {
          // Find user info from mock data / 从 mock 数据中查找用户信息
          const user = USER_LIST.find(i => i.id === userId);

          // Combine username and default label / 组合用户名与默认标题
          return `${user?.username}-${defaultLabel}`;
        }

        // Fallback to default label / 默认标题
        return defaultLabel;
      }
    }),
    // Recreate map only when language changes / 仅在语言变化时重新生成映射表
    [t]
  );

  /**
   * Render tab label with special handling if defined
   * 根据规则渲染 Tab 标题，优先使用特殊规则
   */
  const renderTabLabel = (tab: KeepAliveTab) => {
    // Get special render function by tab label / 根据 tab.label 查找是否存在特殊渲染函数
    const specialRender = speciaTabRenderMap[tab.label];

    // Use special render if exists / 如果存在特殊规则，使用特殊渲染
    if (specialRender) return specialRender(tab);

    // Otherwise use default i18n label / 否则使用默认的国际化标题
    return t(tab.label);
  };
  return renderTabLabel;
}
