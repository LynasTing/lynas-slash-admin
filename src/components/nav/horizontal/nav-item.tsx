/**
 * NavItem
 *
 * 导航菜单中的单个条目组件（支持多级、状态、权限、辅助说明）
 *
 * 该组件负责：
 * - 渲染导航图标、标题
 * - 可选的辅助说明（caption，使用 Tooltip 展示）
 * - 可选的附加信息（info，如徽标 / 数字）
 * - 可选的子菜单指示箭头（根据层级变化方向）
 * - 根据 active / disabled / depth 等状态组合样式
 *
 * This component represents a single navigation item.
 * It supports:
 * - Icons and translated titles
 * - Optional caption shown via tooltip (for explanations / hints)
 * - Optional extra info (badges, counters, etc.)
 * - Nested menu indication with directional arrows
 * - Visual states such as active / disabled and depth-aware styling
 */

import type { NavItemProps } from '../types';
import { navItemStyles, navItemClasses } from '../styles';
import { Icon } from '@/components/icon';
import { NavItemRenderer } from '../components';
import { cn } from '@/utils';
import { useTranslation } from 'react-i18next';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/ui/tooltip';

/**
 * ItemIcon
 *
 * 子菜单指示箭头组件
 *
 * 根据当前导航项的层级（depth）决定箭头方向：
 * - 一级菜单：向下箭头（表示可展开）
 * - 非一级菜单：向右箭头（表示进入子层级）
 *
 * Arrow icon indicating nested navigation.
 * Direction is determined by the menu depth.
 */
const ItemIcon = ({ depth = 1 }: { depth?: number }) => {
  const icon = depth === 1 ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill';
  return <Icon icon={icon} style={navItemStyles.arrow} />;
};

/**
 * NavItem
 *
 * 单个导航项渲染组件
 *
 * Props 由 NavItemProps 定义，包含：
 * - 路由信息
 * - 状态（active / disabled / open）
 * - 层级（depth）
 * - UI 配置（icon / caption / info / hasChild）
 *
 * Navigation item renderer component.
 */
export const NavItem = (item: NavItemProps) => {
  const { t } = useTranslation();

  /**
   * 内容区域（不包含最外层容器）
   *
   * 由 NavItemRenderer 统一包裹，
   * 这里只关心“里面放什么”
   */
  const content = (
    <>
      {/* Icon */}
      <span style={navItemStyles.icon}>{item.icon && typeof item.icon === 'string' ? <Icon icon={item.icon} /> : item.icon}</span>

      {/* Title */}
      <span style={navItemStyles.title} className="block! flex-auto! ml-2">
        {t(item.title)}
      </span>

      {/* Caption / 辅助说明/解释/提示 */}
      {item.caption && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Icon icon="solar:info-circle-linear" size={16} className="ml-1.5" style={navItemStyles.caption} />
            </TooltipTrigger>
            <TooltipContent side="bottom">{t(item.caption)}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Info */}
      {item.info && <span style={navItemStyles.info} />}

      {/* Arrow */}
      {item.hasChild && <ItemIcon depth={item.depth} />}
    </>
  );

  const itemClassName = cn(
    navItemClasses.base,
    navItemClasses.hover,
    'min-h-[32px] max-w-[250px]',
    item.active && item.depth === 1 && navItemClasses.active,
    item.active && item.depth !== 1 && 'bg-active-hover!',
    item.disabled && navItemClasses.disabled
  );

  /**
   * 使用 NavItemRenderer 统一处理：
   * - DOM 结构
   * - 点击行为
   * - 路由跳转 / 事件分发
   *
   * 当前组件只负责内容与样式组合
   */
  return (
    <NavItemRenderer item={item} className={itemClassName}>
      {content}
    </NavItemRenderer>
  );
};
