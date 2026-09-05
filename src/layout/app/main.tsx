import { type ReactNode, Suspense, useMemo } from 'react';
import { matchRoutes, ScrollRestoration, type Location, type Params, useLocation, useOutlet, useParams } from 'react-router';
import { LineLoading } from '@/components/loading';
import { cn, flattenTree } from '@/utils';
import { useSettingStoreState } from '@/store/setting';
import { AuthGuard } from '@/components/auth';
import { routersSections } from '@/router';
import type { AppRouteObject, RouteMeta } from '@/router/types';
import { getNavDataByRouterMode } from './nav/nav-data';
import MultiTabs from './multi-tabs';
import { MultiTabsProvider } from './multi-tabs/providers/multi-tabs.provider';
import type { KeepAliveTab } from './multi-tabs/types';

/** 导航数据 / Navigation data */
const navData = getNavDataByRouterMode();

/** 平铺导航数据后的所有导航项 / Flattened navigation items */
const allItems = navData.flatMap(i => flattenTree(i.items));

/**
 * 根据当前路由去找对应的权限列表
 * Find the permission list corresponding to the current route
 */
const findAuthByPath = (path: string): string[] => allItems.find(i => i.path === path)?.auth || [];

const Main = () => {
  const { themeStretch, multiTab = false } = useSettingStoreState();
  const location: Location = useLocation();
  const params: Readonly<Params<string>> = useParams();
  const outlet: ReactNode = useOutlet();
  const currentNavAuth: string[] = findAuthByPath(location.pathname);

  /**
   * 当前路由匹配链，用于读取 React Router 默认不会暴露的自定义 meta 字段
   *
   * Current route match chain used to read the custom meta field that React Router does not expose by default
   */
  const routeMatches = matchRoutes(routersSections, location) ?? [];

  /**
   * 从最深层匹配节点向上查找菜单元数据，重定向等无元数据路由不创建标签
   *
   * Find menu metadata from the deepest match upward; metadata-free routes such as redirects do not create tabs
   */
  const currentRoute: AppRouteObject | undefined = [...routeMatches].reverse().find(match => 'meta' in match.route)?.route as
    | AppRouteObject
    | undefined;
  const routeMeta: RouteMeta | null = currentRoute?.meta ?? null;
  const activeTabKey: string = `${location.pathname}${location.search}`;

  /**
   * 根据当前路由快照构造标签数据，导航菜单的 hidden 字段不参与标签创建规则
   *
   * Build tab data from the current route snapshot; the navigation hidden field does not affect tab creation
   */
  const currentTab: KeepAliveTab | null = useMemo<KeepAliveTab | null>(() => {
    if (!routeMeta) {
      return null;
    }

    return {
      key: activeTabKey,
      label: routeMeta.name,
      isTabHidden: false,
      isClosable: true,
      params: { ...params },
      children: outlet,
      routeMeta
    };
  }, [activeTabKey, outlet, params, routeMeta]);

  return (
    <AuthGuard
      permissionAll={currentNavAuth}
      fallback={
        <>
          <div>error</div>
        </>
      }>
      {multiTab && (
        <MultiTabsProvider currentTab={currentTab} activeTabKey={activeTabKey}>
          <MultiTabs />
        </MultiTabsProvider>
      )}
      <main
        data-slot="lynas-slash-layout-main"
        className={cn('flex w-full flex-1 flex-col overflow-y-auto', 'mx-auto p-4', 'transition-[max-width] duration-300 ease-in-out', {
          'max-w-full': themeStretch,
          'xl:max-w-screen-xl': !themeStretch
        })}
        style={{
          /**
           * 提示浏览器这个元素的 max-width 可能会变化
           * 用于优化动画性能
           */
          willChange: 'max-width'
        }}>
        <Suspense fallback={<LineLoading />}>
          {outlet}
          {/*
           * ScrollRestoration 是 React Router 内置组件
           * 用于管理浏览器滚动位置的恢复
           *
           * 功能：
           * 1. 用户前进/后退页面时，自动恢复上次的滚动条位置
           * 2. 在多层嵌套路由中，每个路由的滚动位置会独立保存
           * 3. 与浏览器原生 history 结合，不破坏默认滚动行为
           *
           * 可选配置：
           * getKey={(location, matches) => location.key}
           *   可以自定义每个路由滚动位置的 key，默认按浏览器 history state 自动管理
           *
           * * ScrollRestoration is a built-in component in React Router
           *
           * Features:
           * 1. Automatically restores the previous scroll position when the user navigates forward/backward
           * 2. Saves scroll position independently for each route in nested routes
           * 3. Works with native browser history without breaking default scroll behavior
           *
           * Optional configuration:
           * getKey={(location, matches) => location.key}
           *   Allows customizing the key for each route's scroll position; by default it is managed using browser history state
           */}
          <ScrollRestoration />
        </Suspense>
      </main>
    </AuthGuard>
  );
};
export default Main;
