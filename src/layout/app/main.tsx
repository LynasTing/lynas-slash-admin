import { Suspense } from 'react';
import { Outlet, useLocation, ScrollRestoration } from 'react-router';
import { LineLoading } from '@/components/loading';
import { GLOBAL_CONFIG } from '@/config/global';
import { frontendNavData } from './nav/nav-data/frontend';
import { backendNavData } from './nav/nav-data/backend';
import { cn, flattenTree } from '@/utils';
import { useSettingStoreState } from '@/store/setting';
import { AuthGuard } from '@/components/auth';

/** 导航数据 / Navigation data */
const navData = GLOBAL_CONFIG.routerMode === 'frontend' ? structuredClone(frontendNavData) : backendNavData;

/** 平铺导航数据后的所有导航项 / Flattened navigation items */
const allItems = navData.flatMap(i => flattenTree(i.items));

/**
 * 根据当前路由去找对应的权限列表
 * Find the permission list corresponding to the current route
 */
const findAuthByPath = (path: string): string[] => allItems.find(i => i.path === path)?.auth || [];

const Main = () => {
  const { themeStretch } = useSettingStoreState();
  const { pathname } = useLocation();
  const currentNavAuth = findAuthByPath(pathname);
  return (
    <AuthGuard
      permissionAll={currentNavAuth}
      fallback={
        <>
          <div>error</div>
        </>
      }>
      <main
        data-slot="lynas-slash-layout-main"
        className={cn('flex flex-col flex-auto w-full', 'p-4 sm:p-6 md:px-8 mx-auto', 'transition-[max-width] duration-300 ease-in-out', {
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
          <Outlet />
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
