import type { ReactNode } from 'react';
import { Badge } from '@/ui/badge';
import type { RouteNavBadge } from '@/router/types';
import type { NavBadgeValueMap } from './nav-badge-values';

export type { NavBadgeValueMap } from './nav-badge-values';

/**
 * 将运行时徽标数值规范化为适合窄导航栏显示的文本。
 * @param value - 业务层提供的原始徽标数值。
 * @returns 可展示的徽标文本；无有效值时返回 undefined。
 *
 * Normalizes a runtime badge value into text suitable for narrow navigation layouts.
 * @param value - Raw badge value supplied by the business layer.
 * @returns Displayable badge text, or undefined when no effective value exists.
 */
const formatNavBadgeValue = (value: NavBadgeValueMap[string]): string | undefined => {
  if (value === undefined || value === null || value === 0 || value === '0' || value === '') {
    return undefined;
  }

  if (typeof value === 'number') {
    return value > 99 ? '99+' : String(value);
  }

  return value;
};

/**
 * 为已声明徽标配置的导航项创建展示节点。
 * @param badge - 路由声明的徽标样式与业务键。
 * @param values - 当前运行时徽标数据。
 * @returns 可传给导航项 info 字段的 React 节点。
 *
 * Creates a display node for a navigation item that declares a badge configuration.
 * @param badge - Badge style and business key declared by the route.
 * @param values - Current runtime badge data.
 * @returns A React node suitable for the navigation item's info field.
 */
export const createNavBadgeInfo = (badge: RouteNavBadge | undefined, values: NavBadgeValueMap): ReactNode => {
  const value = badge ? formatNavBadgeValue(values[badge.key]) : undefined;

  if (!badge || !value) {
    return undefined;
  }

  return <Badge variant={badge.variant}>{value}</Badge>;
};
