import { useUserInfo, useUserToken } from '@/store/user';
import { useMemo } from 'react';

/**
 * 权限 / 角色检查 Hook
 * Auth check hook
 *
 * 提供方法检查当前用户是否拥有指定权限或角色
 * Provides helper methods to check whether the current user has specific permissions or roles
 */
export const useAuthCheck = () => {
  /** 当前用户 token / access token */
  const { accessToken } = useUserToken();

  /** 当前用户权限列表和角色列表 / permissions & roles */
  const { permissions = [], roles = [] } = useUserInfo();

  /** 将权限数组转换为 Set 提高查询性能 O(1) / Convert permissions array to Set for fast lookup */
  const permissionSet = useMemo(() => new Set(permissions.map(i => i.code)), [permissions]);

  /**
   * 检查用户是否拥有指定权限
   * Check if user has a specific permission
   *
   * @param code 权限 code / permission code
   * @returns true -> 拥有权限 / has permission
   *          false -> 没有权限 / does not have permission
   */
  const hasPermission = (code: string): boolean => {
    if (!accessToken) return false;

    return permissionSet.has(code);
  };

  /**
   * 检查用户是否满足任意一个权限 (OR 逻辑)
   * Check if user has ANY permission in the list (OR logic)
   *
   * @param codes 权限 code 数组 / array of permission codes
   */
  const hasAnyPermission = (codes: string[]): boolean => {
    if (!codes.length) return true;

    return codes.some(code => hasPermission(code));
  };

  /**
   * 检查用户是否满足所有权限 (AND 逻辑)
   * Check if user has ALL permissions in the list (AND logic)
   *
   * @param codes 权限 code 数组 / array of permission codes
   */
  const hasAllPermission = (codes: string[]): boolean => {
    if (!codes.length) return true;

    return codes.every(code => hasPermission(code));
  };

  /** 将角色数组转换为 Set 提高查询性能 O(1) / Convert roles array to Set for fast lookup */
  const roleSet = useMemo(() => new Set(roles.map(i => i.code)), [roles]);

  /**
   * 检查用户是否拥有指定角色
   * Check if user has a specific role
   *
   * @param code 角色 code / role code
   * @returns true -> 拥有角色 / has role
   *          false -> 没有角色 / does not have role
   */
  const hasRole = (code: string): boolean => {
    if (!accessToken) return false;

    return roleSet.has(code);
  };

  /**
   * 检查用户是否拥有任意一个角色 (OR 逻辑)
   * Check if user has ANY role in the list (OR logic)
   *
   * @param codes 角色 code 数组 / array of role codes
   */
  const hasAnyRole = (codes: string[]): boolean => {
    if (!codes.length) return true;

    return codes.some(code => hasRole(code));
  };

  /**
   * 检查用户是否拥有所有角色 (AND 逻辑)
   * Check if user has ALL roles in the list (AND logic)
   *
   * @param codes 角色 code 数组 / array of role codes
   */
  const hasAllRole = (codes: string[]): boolean => {
    if (!codes.length) return true;

    return codes.every(code => hasRole(code));
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermission,
    hasRole,
    hasAnyRole,
    hasAllRole
  };
};
