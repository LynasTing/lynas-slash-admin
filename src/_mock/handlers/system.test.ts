import { beforeAll, afterAll, afterEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { createMenu, deleteMenu, getMenuList, updateMenu } from './_menu';
import { createRole, deleteRole, getRoleDetail, getRoleList, getRoleOptions, updateRole } from './_role';
import { createUser, deleteUser, getUserDetail, getUserList, updateUser } from './_user';

const server = setupServer(
  getMenuList,
  createMenu,
  updateMenu,
  deleteMenu,
  getRoleList,
  getRoleOptions,
  getRoleDetail,
  createRole,
  updateRole,
  deleteRole,
  getUserList,
  getUserDetail,
  createUser,
  updateUser,
  deleteUser
);

const requestJson = async (path: string, init?: RequestInit): Promise<{ code: number; data: unknown }> => {
  const response = await fetch(`http://localhost${path}`, init);
  return response.json() as Promise<{ code: number; data: unknown }>;
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('system mock handlers', () => {
  it('returns backend-compatible menu tree and supports CRUD', async () => {
    const list = await requestJson('/api/system/menu/list');
    expect(Array.isArray(list.data)).toBe(true);
    const menus = list.data as Array<{ id: number }>;
    expect(typeof menus[0].id).toBe('number');

    const created = await requestJson('/api/system/menu/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parentId: 1, name: 'Test menu', code: 'test-menu', category: 3, sort: 9, status: 1, hidden: 0 })
    });
    expect(created.code).toBe(200);
  });

  it('returns paged roles and exposes options and details', async () => {
    const list = await requestJson('/api/system/role/list?pageNum=1&pageSize=10');
    const rolePage = list.data as { records: unknown[]; total: number };
    expect(Array.isArray(rolePage.records)).toBe(true);
    expect(typeof rolePage.total).toBe('number');

    const options = await requestJson('/api/system/role/options');
    expect(Array.isArray(options.data)).toBe(true);

    const detail = await requestJson('/api/system/role/1');
    const roleDetail = detail.data as { menuIds: number[] };
    expect(Array.isArray(roleDetail.menuIds)).toBe(true);
  });

  it('returns paged users and preserves profile fields on update', async () => {
    const list = await requestJson('/api/system/user/list?pageNum=1&pageSize=10');
    const userPage = list.data as { records: unknown[]; total: number };
    expect(Array.isArray(userPage.records)).toBe(true);
    expect(typeof userPage.total).toBe('number');

    const updated = await requestJson('/api/system/user/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin-updated',
        nickname: 'Updated Admin',
        password: '',
        email: 'admin-updated@example.com',
        phone: '13900139000',
        status: 1,
        roleIds: [1]
      })
    });
    expect(updated.code).toBe(200);

    const detail = await requestJson('/api/system/user/1');
    const userDetail = detail.data as { nickname: string; phone: string };
    expect(userDetail.nickname).toBe('Updated Admin');
    expect(userDetail.phone).toBe('13900139000');
  });
});
