import { Dropdown, type MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { MultiTabOperation } from '../types';
import { Icon } from '@/components/icon';
import { useMultiTabsContext } from '../providers/multi-tabs.hook';
import type { TabItemProps } from '../types';
import { useTabLabelRender } from '../hooks/use-tab-label-render';
import { useMemo } from 'react';

/**
 * 单个标签页组件
 * Tab item component
 *
 * 负责：
 * - 渲染标签内容
 * - 渲染右键菜单
 * - 处理标签相关操作
 *
 * Responsible for:
 * - Rendering the tab label
 * - Rendering the context menu
 * - Handling tab operations
 */
export default function MultiTabItem({ tab, style, onClose }: TabItemProps) {
  const { t } = useTranslation();

  /**
   * 多标签上下文
   * Multi-tabs context
   *
   * 提供：
   * - 当前标签列表
   * - 各种标签操作方法
   *
   * Provides:
   * - Current tabs list
   * - Tab operation methods
   */
  const { tabs, refreshTab, closeTab, closeOthersTab, closeLeft, closeRight, closeAll } = useMultiTabsContext();

  /**
   * 右键菜单配置项
   * Context menu configuration
   *
   * 每个菜单项的 key 对应 MultiTabOperation 枚举值
   * Each menu item's key corresponds to a MultiTabOperation enum value
   *
   * 某些菜单项会根据当前状态进行禁用
   * Some menu items are conditionally disabled based on current state
   */
  const menuItems: MenuProps['items'] = [
    {
      label: t(`sys.tab.${MultiTabOperation.REFRESH}`),
      key: MultiTabOperation.REFRESH,
      icon: <Icon icon="mdi:reload" size={18} />
    },
    {
      label: t(`sys.tab.${MultiTabOperation.CLOSE}`),
      key: MultiTabOperation.CLOSE,
      icon: <Icon icon="material-symbols:close" size={18} />,
      // 当只剩一个标签时禁用关闭 / Disable when only one tab remains
      disabled: tabs.length === 1
    },
    { type: 'divider' },
    {
      label: t(`sys.tab.${MultiTabOperation.CLOSELEFT}`),
      key: MultiTabOperation.CLOSELEFT,
      icon: <Icon icon="material-symbols:tab-close-right-outline" size={18} className="rotate-180" />,
      // 当前标签为第一个时禁用 / Disable if current tab is the first one
      disabled: tabs.findIndex(i => i.key === tab.key) === 0
    },
    {
      label: t(`sys.tab.${MultiTabOperation.CLOSERIGHT}`),
      key: MultiTabOperation.CLOSERIGHT,
      icon: <Icon icon="material-symbols:tab-close-right-outline" size={18} />,
      // 当前标签为最后一个时禁用 / Disable if current tab is the last one
      disabled: tabs.findIndex(i => i.key === tab.key) === tabs.length - 1
    },
    { type: 'divider' },
    {
      label: t(`sys.tab.${MultiTabOperation.CLOSEOTHERS}`),
      key: MultiTabOperation.CLOSEOTHERS,
      icon: <Icon icon="material-symbols:tab-close-outline" size={18} />,
      // 只有一个标签时禁用 / Disable when only one tab exists
      disabled: tabs.length <= 1
    },
    {
      label: t(`sys.tab.${MultiTabOperation.CLOSEALL}`),
      key: MultiTabOperation.CLOSEALL,
      icon: <Icon icon="mdi:collapse-all-outline" size={18} />
    }
  ];

  /**
   * Exclude<T, U>
   * 从联合类型 T 里，把能赋值给 U 的成员剔除掉
   * From the union type T, remove the members that can be assigned to U
   */
  type NonFullScreen = Exclude<MultiTabOperation, MultiTabOperation.FULLSCREEN>;

  /**
   * 菜单点击事件映射表
   * Menu click handler map
   *
   * 使用映射表替代 switch 语句
   * Use a mapping object instead of a switch statement
   *
   * key 为操作类型，value 为对应处理函数
   * The key is the operation type, the value is the handler function
   *
   * 通过 Record 保证类型完整性
   * Record ensures full type coverage
   */
  const MenuClickEventMap = useMemo<Record<NonFullScreen, () => void>>(
    () => ({
      [MultiTabOperation.REFRESH]: () => refreshTab(tab.key),
      [MultiTabOperation.CLOSE]: () => closeTab(tab.key),
      [MultiTabOperation.CLOSEOTHERS]: () => closeOthersTab(tab.key),
      [MultiTabOperation.CLOSELEFT]: () => closeLeft(tab.key),
      [MultiTabOperation.CLOSERIGHT]: () => closeRight(tab.key),
      [MultiTabOperation.CLOSEALL]: () => closeAll()
    }),
    [tab.key, refreshTab, closeTab, closeOthersTab, closeLeft, closeRight, closeAll]
  );

  /**
   * 右键菜单点击处理函数
   * Context menu click handler
   *
   * 阻止事件冒泡，避免触发标签切换
   * Stop event propagation to prevent tab switching
   *
   * 根据 key 执行对应操作
   * Execute corresponding action based on key
   */
  const handleMenuClick: MenuProps['onClick'] = menuInfo => {
    const { key, domEvent } = menuInfo;
    domEvent.stopPropagation();

    MenuClickEventMap[key as NonFullScreen]?.();
  };

  /**
   * 标签内容渲染函数
   * Tab label render function
   */
  const renderLabel = useTabLabelRender();

  return (
    <Dropdown
      trigger={['contextMenu']}
      menu={{
        items: menuItems,
        onClick: handleMenuClick
      }}>
      <div className="relative flex items-center px-4 py-1 select-none" style={style}>
        <div>{renderLabel(tab)}</div>
        {/* 显示关闭按钮（可选） / Render close button if allowed */}
        {!tab.hideTab && (
          <Icon
            icon="ion:close-outline"
            size={18}
            className="ml-2 opacity-50 cursor-pointer "
            onClick={e => {
              e.stopPropagation();
              onClose?.();
            }}
          />
        )}
      </div>
    </Dropdown>
  );
}
