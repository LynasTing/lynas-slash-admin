import React from 'react';
import type { NavItemProps } from '../types';
import { RouterLink } from '@/router/components/router-link';

/**
 * NavItemRenderer 的 Props 定义
 * Props definition for NavItemRenderer
 */
type NavItemRendererProps = {
  /**
   * 单个导航项的配置数据
   * Configuration object for a single navigation item
   */
  item: NavItemProps;

  /**
   * 统一传入的样式类名
   * Shared className for styling
   */
  className: string;

  /**
   * 导航项的实际内容（图标 + 文本等）
   * Actual content of the nav item (icon, label, etc.)
   */
  children: React.ReactNode;
};

/**
 * NavItemRenderer
 *
 * 渲染导航项的“行为外壳”
 * Renderer responsible for deciding how a navigation item behaves.
 *
 * 它不关心 UI 长什么样，只负责
 * - 用什么标签包 children
 * - 是否可点击
 * - 是否跳转路由
 *
 * It does NOT care about layout or visuals.
 * It only decides:
 * - which wrapper to use
 * - whether it's clickable
 * - whether it navigates
 */
export const NavItemRenderer: React.FC<NavItemRendererProps> = ({ item, className, children }) => {
  const { disabled, hasChild, path, onClick } = item;

  /**
   * 禁用状态
   * Disabled navigation item
   *
   * - 只渲染 UI
   * - 不响应点击
   * - 不进行跳转
   *
   * - Render only
   * - No interaction
   * - No navigation
   */
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  /**
   * 包含子导航
   * Navigation item with children
   *
   * - 点击行为用于展开 / 折叠子菜单
   * - 不是一个路由跳转
   */
  if (hasChild) {
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );
  }

  /**
   * 普通内部路由导航（默认情况）
   * Internal route navigation (default)
   *
   * - 使用自定义封装的 RouterLink
   * - 统一管理路由跳转行为
   *
   * - Uses custom RouterLink
   * - Centralized routing control
   */
  return (
    <RouterLink href={path} className={className}>
      {children}
    </RouterLink>
  );
};
