/**
 * BreadCrumb 面包屑导航组件
 *
 * 作用 / Purpose:
 * 该组件根据当前路由和侧边栏菜单数据生成动态面包屑导航。
 * 它支持：
 *   1. 自动根据路由匹配菜单项生成层级路径
 *   2. 超过 maxItems 时自动折叠中间面包屑为下拉菜单
 *   3. 面包屑节点支持下拉显示兄弟页面
 *   4. 国际化支持，根据 useLocale() 自动翻译标题
 *
 * This component generates a dynamic breadcrumb navigation based on the current route
 * and the sidebar navigation data. Features include:
 *   1. Automatically matches the current path to menu items to build hierarchy
 *   2. Collapses middle breadcrumbs into a dropdown if it exceeds maxItems
 *   3. Breadcrumb nodes can show sibling pages in a dropdown
 *   4. Internationalization support using useLocale()
 *
 * 使用示例 / Example Usage:
 * <BreadCrumb maxItems={4} />
 *
 * 假设当前路由路径为：
 * /dashboard/user/list
 *
 * 且菜单树为：
 * [
 *   {
 *     items: [
 *       { path: '/dashboard', title: 'Dashboard', children: [
 *         { path: '/dashboard/user', title: 'User Management', children: [
 *           { path: '/dashboard/user/list', title: 'User List' }
 *         ]}
 *       ]}
 *     ]
 *   }
 * ]
 *
 * 渲染结果：
 * Dashboard / User Management / User List
 * - 如果 maxItems < 3，则 User Management 会被折叠到 "..." 下拉菜单
 *
 * Props:
 * @param maxItems 面包屑最多显示数量 / Maximum number of breadcrumbs to display
 *
 * Notes:
 * - 使用 <Link> 跳转路由
 * - 最后一个面包屑显示为不可点击状态 (BreadcrumbPage)
 * - 中间折叠的面包屑显示为下拉菜单，可点击跳转
 */
import type { NavItemDataProps } from '@/components/nav/types';
import { useCallback, useMemo, Fragment } from 'react';
import useLocale from '@/locales/use-locale';
import { useMatches, Link } from 'react-router';
import { useFilteredNavData } from '../app/nav/nav-data';
import {
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  Breadcrumb,
  BreadcrumbList
} from '@/ui/breadcrumb';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/ui/dropdowm-menu';
import { ChevronDown } from 'lucide-react';

/**
 * 面包屑 Props
 */
interface BreadCrumbProps {
  maxItems: number;
}

/**
 * 导航项数据
 */
type NavItem = Pick<NavItemDataProps, 'path' | 'title'> & {
  children?: NavItem[];
};

/**
 * 面包屑数据
 * Breadcrumb data
 */
interface BreadCrumbItemData {
  /**
   * 面包屑标签
   * Breadcrumb label
   */
  label: string;

  /**
   * 面包屑 key
   * Breadcrumb key
   */
  key: string;

  /**
   * 面包屑子项
   * Breadcrumb children
   */
  items: Array<{
    /**
     * 面包屑子项标签
     * Breadcrumb child label
     */
    label: string;
    /**
     * 面包屑子项 key
     * Breadcrumb child key
     */
    key: string;
  }>;
}

export default function BreadCrumb({ maxItems = 3 }: BreadCrumbProps) {
  const { t } = useLocale();
  const matches = useMatches();
  const navData = useFilteredNavData();

  /**
   * 在树形菜单里，找到某个 path 的完整祖先路径
   * Find the complete ancestor path of a path in a tree menu
   */
  const findPathInNavData = useCallback((path: string, items: NavItem[]): NavItem[] => {
    for (const el of items) {
      if (el.path === path) {
        return [el];
      }
      if (el.children) {
        const found = findPathInNavData(path, el.children);
        if (found.length) {
          return [el, ...found];
        }
      }
    }
    return [];
  }, []);

  /**
   * 面包屑数据
   * breadcrumb data
   */
  const breadcrumbs = useMemo(() => {
    /** 获取当前路径 / Get current path */
    const paths = matches.filter(i => i.pathname !== '/').map(i => i.pathname);

    return paths
      .map(path => {
        /** 获取当前路径的面包屑 / Get the breadcrumb of the current path */
        const navItems = navData.flatMap(setion => setion.items);

        /** 找到当前路径的完整路径 / Find the complete path of the current path */
        const pathItems = findPathInNavData(path, navItems);
        if (!pathItems.length) return null;

        /** 获取最后一个节点的子节点 / Get the children of the last node */
        const currentItem = pathItems[pathItems.length - 1];

        /** 生成面包屑数据 / Generate breadcrumb data */
        const children =
          currentItem.children?.map(i => ({
            label: t(i.title),
            key: i.path
          })) ?? [];

        return {
          label: t(currentItem.title),
          key: currentItem.path,
          items: children
        };
      })
      .filter((i): i is BreadCrumbItemData => i !== null);
  }, [matches, navData, findPathInNavData, t]);

  /**
   * 渲染面包屑子项
   * @param item 面包屑子项数据
   * @param isLast 是否是最后一个子项
   *
   * Render breadcrumb items
   * @param item Breadcrumb item data
   * @param isLast Whether it is the last item
   */
  const renderBreadcrumbItem = (item: BreadCrumbItemData, isLast: boolean) => {
    const hasItems = item.items && !!item.items.length;

    if (hasItems) {
      return (
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              {item.label}
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {item.items.map(sub => (
                <DropdownMenuItem key={sub.key} asChild>
                  <Link to={sub.key}>{sub.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      );
    }

    return (
      <BreadcrumbItem>
        {isLast ? (
          <BreadcrumbPage>{item.label}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <Link to={item.key}>{item.label}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    );
  };

  const renderBreadcrumbs = () => {
    /**
     * 情况 1：面包屑数量不超过 maxItems
     * If the total number of breadcrumbs is less than or equal to maxItems
     */
    if (breadcrumbs.length <= maxItems) {
      return breadcrumbs.map((i, idx) => (
        /**
         * Fragment 是 React 内置组件，不会渲染额外 DOM
         * Fragment is a built-in React component that does not render extra DOM
         * 这里用它包住 breadcrumb + 分隔符，满足 JSX 单根要求
         */
        <Fragment key={i.key}>
          {renderBreadcrumbItem(i, idx === breadcrumbs.length - 1)}
          {/* 如果不是最后一个面包屑，就显示分隔符 */}
          {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
        </Fragment>
      ));
    }

    /** 第一个面包屑 / The first breadcrumb (始终显示) */
    const firstItem = breadcrumbs[0];
    /** 最后 maxItems - 1 个面包屑 / The last maxItems-1 breadcrumbs (始终显示) */
    const lastItems = breadcrumbs.slice(-(maxItems - 1));
    /** 中间隐藏的面包屑 / The hidden breadcrumbs that will go into the ellipsis dropdown */
    const hiddenItems = breadcrumbs.slice(1, -(maxItems - 1));

    /**
     * 情况 2：面包屑数量超过 maxItems，需要折叠显示
     * If breadcrumbs exceed maxItems, we collapse the middle items
     */
    return (
      <>
        {/* 渲染第一个面包屑 / Render the first breadcrumb */}
        {renderBreadcrumbItem(firstItem, false)}
        <BreadcrumbSeparator />

        {/* 渲染折叠的中间面包屑（...） / Render the ellipsis */}
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {/* 把隐藏的面包屑渲染成下拉菜单项 / Render the hidden breadcrumbs as dropdown menu items */}
              {hiddenItems.map(i => (
                <DropdownMenuItem key={i.key} asChild>
                  <Link to={i.key}>{i.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* 渲染最后的几个面包屑 / Render the last few breadcrumbs */}
        {lastItems.map((i, idx) => (
          <Fragment key={i.key}>
            {/* 判断是否是最后一个，最后一个显示 BreadcrumbPage */}
            {renderBreadcrumbItem(i, idx === lastItems.length - 1)}
            {/* 除了最后一个，其他面包屑后面都加分隔符 */}
            {idx < lastItems.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </>
    );
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{renderBreadcrumbs()}</BreadcrumbList>
    </Breadcrumb>
  );
}
