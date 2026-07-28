// @vitest-environment jsdom

/**
 * AuthGuard 会渲染 JSX 并依赖 localStorage 持久化的 Zustand Store，因此这个文件需要模拟浏览器环境。
 * 该指令只影响当前测试文件；纯函数测试仍可保留在更快的 Node 环境中。
 *
 * AuthGuard renders JSX and relies on a localStorage-persisted Zustand store, so this file needs a simulated browser environment.
 * This directive affects only the current test file; pure-function tests can stay in the faster Node environment.
 */

import { act, cleanup, render, renderHook, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { Permission, Role, User } from '#/entity';
import { useUserActions } from '@/store/user';
import { AuthGuard } from './auth-guard';

const READ_USER_PERMISSION: Permission = {
  id: 'permission-user-read',
  name: 'Read users',
  code: 'user:read'
};

/**
 * 测试数据使用固定的权限和角色，而不复用 Mock 数据库。
 * 测试应只依赖当前行为需要的最小数据，避免无关的演示数据变化导致权限测试失败。
 *
 * Test data uses fixed permissions and roles instead of the mock database.
 * Tests should depend on the smallest data set required by the behavior, avoiding failures when unrelated demo data changes.
 */
const CREATE_USER_PERMISSION: Permission = {
  id: 'permission-user-create',
  name: 'Create users',
  code: 'user:create'
};

const ADMIN_ROLE: Role = {
  id: 'role-admin',
  name: 'Administrator',
  code: 'ADMIN'
};

const EDITOR_ROLE: Role = {
  id: 'role-editor',
  name: 'Editor',
  code: 'EDITOR'
};

type AuthIdentity = Pick<User, 'permissions' | 'roles'>;

/**
 * 通过项目实际的 Zustand action 准备登录态，而不是 mock useAuthCheck。
 * 这样测试会同时经过 AuthGuard、useAuthCheck 和 Store 选择器，能发现这些模块之间的集成回归。
 * @param identity - 当前测试用户拥有的权限与角色。
 * @param accessToken - 有值表示已登录；省略时模拟未登录用户。
 *
 * Prepares authentication state through the project's real Zustand actions instead of mocking useAuthCheck.
 * The test then traverses AuthGuard, useAuthCheck, and store selectors, exposing integration regressions between them.
 * @param identity - Permissions and roles owned by the test user.
 * @param accessToken - A value represents a signed-in user; omission simulates a guest.
 */
const setAuthIdentity = (identity: AuthIdentity, accessToken?: string) => {
  const { result } = renderHook(() => useUserActions());

  /**
   * Zustand 更新会触发 React 订阅者重新渲染，必须放入 act，确保断言前所有状态更新都已完成。
   *
   * Zustand updates trigger React subscribers to re-render and must run inside act so all updates finish before assertions.
   */
  act(() => {
    result.current.setUserInfo(identity);
    result.current.setUserToken(accessToken ? { accessToken } : {});
  });
};

beforeEach(() => {
  const { result } = renderHook(() => useUserActions());

  /**
   * Store 使用 persist，测试之间若残留 token、权限或 localStorage，会产生依赖执行顺序的假阳性。
   * 每个用例开始前同时清空运行时 Store 和浏览器存储，保证它们独立、可重复运行。
   *
   * The store uses persist. Leftover tokens, permissions, or localStorage data can create order-dependent false positives.
   * Clear both the runtime store and browser storage before every case so tests remain isolated and repeatable.
   */
  act(() => {
    result.current.clearUserInfoAndToken();
  });
  localStorage.clear();
});

afterEach(() => {
  /**
   * 卸载上一个用例渲染的 DOM，避免 screen 查询到前一个用例留下的元素。
   *
   * Unmount the DOM rendered by the previous case so screen queries cannot find elements left by an earlier test.
   */
  cleanup();
});

describe('AuthGuard', () => {
  it('denies access without an access token even when user information contains matching permissions and roles', () => {
    /**
     * 权限和角色数据本身不能代表已认证；token 缺失时必须拒绝访问。
     * 该用例防止以后为了方便而把“用户信息存在”错误地当作“已经登录”。
     *
     * Permission and role data alone do not prove authentication; access must be denied when the token is absent.
     * This case prevents a future shortcut that mistakenly treats existing user information as a signed-in state.
     */
    setAuthIdentity(
      {
        permissions: [READ_USER_PERMISSION],
        roles: [ADMIN_ROLE]
      },
      undefined
    );

    render(
      <AuthGuard permission="user:read" role="ADMIN" fallback={<span>Access denied</span>}>
        <span>Protected content</span>
      </AuthGuard>
    );

    /**
     * 同时断言 fallback 出现、受保护内容不存在，完整验证分支渲染结果。
     * Assert both that the fallback appears and protected content is absent to verify the complete branch-rendering result.
     */
    expect(screen.getByText('Access denied')).toBeTruthy();
    expect(screen.queryByText('Protected content')).toBeNull();
  });

  it('renders protected content when the user has the required permission and role', () => {
    /**
     * 这是单权限与单角色同时匹配的正向基线。
     * AuthGuard 中权限条件与角色条件最终使用 AND 关系，缺少其中任一项都不应通过。
     *
     * This is the positive baseline where one permission and one role both match.
     * AuthGuard combines permission and role requirements with AND semantics, so either missing requirement must fail.
     */
    setAuthIdentity(
      {
        permissions: [READ_USER_PERMISSION],
        roles: [ADMIN_ROLE]
      },
      'access-token'
    );

    render(
      <AuthGuard permission="user:read" role="ADMIN" fallback={<span>Access denied</span>}>
        <span>Protected content</span>
      </AuthGuard>
    );

    expect(screen.getByText('Protected content')).toBeTruthy();
    expect(screen.queryByText('Access denied')).toBeNull();
  });

  it('supports OR matching for permissionAny and roleAny', () => {
    /**
     * 列表中故意放入一个不存在值和一个存在值，证明 Any 语义是“至少一个匹配”而不是“全部匹配”。
     *
     * Each list intentionally contains one missing value and one present value, proving Any means “at least one match” rather than “all match.”
     */
    setAuthIdentity(
      {
        permissions: [CREATE_USER_PERMISSION],
        roles: [EDITOR_ROLE]
      },
      'access-token'
    );

    render(
      <AuthGuard permissionAny={['user:delete', 'user:create']} roleAny={['AUDITOR', 'EDITOR']} fallback={<span>Access denied</span>}>
        <span>Protected content</span>
      </AuthGuard>
    );

    expect(screen.getByText('Protected content')).toBeTruthy();
  });

  it('requires every configured permission and role for permissionAll and roleAll', () => {
    /**
     * 与 Any 用例相对，这里给出完整集合，锁定 All 语义：任何一个配置项缺失时都必须拒绝。
     *
     * Unlike the Any case, this provides the complete set and locks All semantics: access must be denied when any configured item is missing.
     */
    setAuthIdentity(
      {
        permissions: [READ_USER_PERMISSION, CREATE_USER_PERMISSION],
        roles: [ADMIN_ROLE, EDITOR_ROLE]
      },
      'access-token'
    );

    render(
      <AuthGuard permissionAll={['user:read', 'user:create']} roleAll={['ADMIN', 'EDITOR']} fallback={<span>Access denied</span>}>
        <span>Protected content</span>
      </AuthGuard>
    );

    expect(screen.getByText('Protected content')).toBeTruthy();
  });

  it('denies access when either the permission or role requirement is not satisfied', () => {
    /**
     * 用户拥有要求的读取权限，却缺少 ADMIN 角色。
     * 该反例验证权限与角色不是两套互相替代的条件，避免敏感功能仅凭其中一项意外开放。
     *
     * The user has the required read permission but lacks the ADMIN role.
     * This negative case verifies permissions and roles are not interchangeable conditions, preventing sensitive features from opening with only one requirement.
     */
    setAuthIdentity(
      {
        permissions: [READ_USER_PERMISSION],
        roles: [EDITOR_ROLE]
      },
      'access-token'
    );

    render(
      <AuthGuard permission="user:read" role="ADMIN" fallback={<span>Access denied</span>}>
        <span>Protected content</span>
      </AuthGuard>
    );

    expect(screen.getByText('Access denied')).toBeTruthy();
    expect(screen.queryByText('Protected content')).toBeNull();
  });
});
