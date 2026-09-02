import type { AppRouteObject } from '@/router/types';
import { dashboardRoutes } from './dashboard';
import { uiRoutes } from './ui';
import { viewRoutes } from './views';

/**
 * 受保护页面的纯路由定义。
 * 该模块不能依赖布局或导航模块，避免路由注册与布局渲染形成循环依赖。
 *
 * Pure route definitions for protected pages.
 * This module must not depend on layout or navigation modules to prevent a circular dependency between route registration and layout rendering.
 */
export const protectedRoutes: AppRouteObject[] = [...dashboardRoutes, ...uiRoutes, ...viewRoutes];
