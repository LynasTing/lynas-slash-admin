import { useLocation } from 'react-router';
import type { NavListProps } from '../types';
import { NavItem } from './nav-item';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/ui/hover-card';

/**
 * 导航列表组件（递归）
 * Navigation list component (recursive)
 */
export function NavList({ data, depth = 0 }: NavListProps) {
  /**
   * 是否有子菜单
   * Whether the current navigation item has children
   */
  const hasChild = data.children && data.children?.length > 0;

  /**
   * 当前路由信息
   * Current route location info
   */
  const location = useLocation();

  /**
   * 当前菜单是否激活
   * Check if the current route matches this nav item
   *
   * @warning 注意：这里用 includes，适合父级路由高亮 / Note: using `includes` is suitable for parent route highlighting
   */
  const isActive = location.pathname.includes(data.path);

  if (!data.hidden) return null;

  /**
   * 渲染单个导航项
   * Render a single navigation item
   */
  const renderNavItem = () => (
    <NavItem
      key={data.title} // 唯一 key / Unique key
      path={data.path} // 路由路径 / Route path
      title={data.title} // 标题 / Title
      caption={data.caption} // 副标题 / Caption
      info={data.info} // 右侧信息（徽标等）/ Extra info (badge, count)
      icon={data.icon} // 图标 / Icon
      auth={data.auth} // 权限控制 / Auth control
      disabled={data.disabled} // 是否禁用 / Disabled state
      active={isActive} // 是否激活 / Active state
      hasChild={hasChild} // 是否有子菜单 / Has children
      depth={depth} // 当前层级 / Current depth
    />
  );

  /**
   * 渲染带 HoverCard 的根级菜单
   * Render root item with hover card submenu
   *
   * 仅在存在子菜单时使用
   * Only used when children exist
   */
  const renderRootItemWithHoverCard = () => {
    return (
      <HoverCard openDelay={100}>
        {/* 触发 HoverCard 的区域 / HoverCard trigger */}
        <HoverCardTrigger>{renderNavItem()}</HoverCardTrigger>

        {/* HoverCard 内容区域 / HoverCard content area */}
        <HoverCardContent
          side={depth === 1 ? 'bottom' : 'right'} // 一级向下，其余向右 / Bottom for root, right for nested
          sideOffset={10} // 偏移距离 / Offset distance
          className="p-1" // 内边距 / Padding
        >
          {/* 递归渲染子菜单 / Recursively render child navigation items */}
          {data.children?.map(i => (
            <NavList key={i.title} data={i} depth={depth + 1} />
          ))}
        </HoverCardContent>
      </HoverCard>
    );
  };

  /**
   * 最终渲染
   * Final render
   *
   * - 有子菜单：HoverCard
   * - 无子菜单：普通 NavItem
   */
  return <li className="list-none">{hasChild ? renderRootItemWithHoverCard() : renderNavItem()}</li>;
}
