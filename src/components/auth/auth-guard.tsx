import type { ReactNode } from 'react';
import { useAuthCheck } from './use-auth';

interface AuthGuardProps {
  /**
   * 要渲染的内容
   * Content to render if access is allowed
   */
  children: ReactNode;

  /**
   * 无权限时的回退内容
   * Fallback content if access denied
   */
  fallback?: ReactNode;

  /**
   * 单个权限
   * Single permission
   */
  permission?: string;

  /**
   * 多个权限 (OR 逻辑)
   * Multiple permissions (OR logic)
   */
  permissionAny?: string[];

  /**
   * 多个权限 (AND 逻辑)
   * Multiple permissions (AND logic)
   */
  permissionAll?: string[];

  /**
   * 单个角色
   * Single role
   */
  role?: string;

  /**
   * 多个角色 (OR 逻辑)
   * Multiple roles (OR logic)
   */
  roleAny?: string[];

  /**
   * 多个角色 (AND 逻辑)
   * Multiple roles (AND logic)
   */
  roleAll?: string[];
}

/**
 * 权限/角色守卫组件
 * AuthGuard component for permission and role checking
 *
 * 根据用户权限或角色条件决定渲染 children 还是 fallback
 * Renders `children` if user meets permission/role conditions, otherwise `fallback`
 */
export const AuthGuard = ({
  children,
  fallback = null,
  permission,
  permissionAny = [],
  permissionAll = [],
  role,
  roleAny = [],
  roleAll = []
}: AuthGuardProps) => {
  const { hasPermission, hasAnyPermission, hasAllPermission, hasRole, hasAnyRole, hasAllRole } = useAuthCheck();

  /**
   * 权限访问判断
   * Permission access check
   */
  const permAccess =
    (permission && hasPermission(permission)) ||
    (permissionAny?.length && hasAnyPermission(permissionAny)) ||
    (permissionAll?.length && hasAllPermission(permissionAll)) ||
    (!permission && !permissionAny?.length && !permissionAll?.length);

  /**
   * 角色访问判断
   * Role access check
   */
  const roleAccess =
    (role && hasRole(role)) ||
    (roleAny.length && hasAnyRole(roleAny)) ||
    (roleAll.length && hasAllRole(roleAll)) ||
    (!role && !roleAny?.length && !roleAll?.length);

  return permAccess && roleAccess ? <>{children}</> : <>{fallback}</>;
};
