import { http, HttpResponse, delay } from 'msw';
import type { Role } from '#/entity';
import { GLOBAL_CONFIG } from '@/config/global';
import { ResultStatusEnum } from '#/enum';
import { ROLE_API_MAP } from '@/api/services/role';
import { mockRoles } from '@/pages/management/system/role/role-mock';

const roleStore: Role[] = structuredClone(mockRoles);

/**
 * 克隆角色列表，避免请求方意外改写 mock 数据源。
 * @returns 克隆后的角色列表。
 *
 * Clone the role list so callers cannot mutate the mock data source by reference.
 * @returns Cloned role list.
 */
const cloneRoleList = (): Role[] => structuredClone(roleStore);

/**
 * 统一角色列表排序。
 * 角色管理页默认按 order 升序展示；缺失排序值的角色放到最后，避免列表顺序飘忽不定。
 * @param data - 待排序的角色列表。
 * @returns 排序后的角色列表。
 *
 * Normalize role list ordering.
 * The role page shows roles in ascending order, and roles without an order value are pushed to the end to keep the list stable.
 * @param data - Role list to sort.
 * @returns Sorted role list.
 */
const sortRoles = (data: Role[]): Role[] =>
  [...data].sort((left, right) => {
    const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

    return leftOrder - rightOrder;
  });

/**
 * 规范化角色提交数据。
 * 这里统一裁剪空白并把 code 转成大写，避免“ admin ”和“ADMIN”被当成两个不同角色。
 * @param value - 原始提交数据。
 * @returns 规范化后的角色数据。
 *
 * Normalize the submitted role payload.
 * Whitespace is trimmed and the role code is uppercased so values like " admin " and "ADMIN" cannot drift into separate roles.
 * @param value - Raw submitted role payload.
 * @returns Normalized role payload.
 */
const normalizeRole = (value: Role): Role => ({
  ...value,
  name: value.name.trim(),
  code: value.code.trim().toUpperCase(),
  desc: value.desc?.trim() ?? '',
  order: value.order ?? 0,
  menus: structuredClone(value.menus ?? [])
});

/**
 * 校验角色编码是否重复。
 * 角色编码会用于权限和角色识别，重复编码会让编辑和鉴权结果都变得含糊。
 * @param value - 待校验的角色数据。
 * @returns 是否存在重复编码。
 *
 * Validate whether a role code is duplicated.
 * Role codes identify roles in permission flows, so duplicates make both editing and authorization ambiguous.
 * @param value - Role payload to validate.
 * @returns Whether the code is duplicated.
 */
const hasDuplicateRoleCode = (value: Role): boolean =>
  roleStore.some(item => item.code.trim().toUpperCase() === value.code.trim().toUpperCase() && item.id !== value.id);

/**
 * Mock 获取角色列表接口。
 *
 * Mock role list API.
 */
const getRoleList = http.get(GLOBAL_CONFIG.apiBaseUrl + ROLE_API_MAP.LIST, async () => {
  await delay(300);

  return HttpResponse.json({
    status: ResultStatusEnum.SUCCESS,
    message: '',
    data: sortRoles(cloneRoleList())
  });
});

/**
 * Mock 新增角色接口。
 *
 * Mock create role API.
 */
const createRole = http.post(GLOBAL_CONFIG.apiBaseUrl + ROLE_API_MAP.CREATE, async ({ request }) => {
  await delay(300);

  const value = normalizeRole((await request.json()) as Role);

  if (hasDuplicateRoleCode(value)) {
    return HttpResponse.json({
      status: 10001,
      message: 'Role code already exists'
    });
  }

  roleStore.push({
    ...value,
    id: value.id || `role-${Date.now()}`
  });

  return HttpResponse.json({
    status: ResultStatusEnum.SUCCESS,
    message: '',
    data: sortRoles(cloneRoleList())
  });
});

/**
 * Mock 更新角色接口。
 *
 * Mock update role API.
 */
const updateRole = http.post(GLOBAL_CONFIG.apiBaseUrl + ROLE_API_MAP.UPDATE, async ({ request }) => {
  await delay(300);

  const value = normalizeRole((await request.json()) as Role);

  if (hasDuplicateRoleCode(value)) {
    return HttpResponse.json({
      status: 10001,
      message: 'Role code already exists'
    });
  }

  const targetIndex = roleStore.findIndex(item => item.id === value.id);

  /*
   * 更新只能作用于已存在角色。
   * 这里直接返回错误而不是静默新增，避免表单携带过期 ID 时把“编辑”误写成“创建”。
   *
   * Updates must target an existing role.
   * Returning an error here avoids silently turning a stale edit into an unexpected create operation.
   */
  if (targetIndex < 0) {
    return HttpResponse.json({
      status: 10002,
      message: 'Role not found'
    });
  }

  roleStore[targetIndex] = {
    ...roleStore[targetIndex],
    ...value
  };

  return HttpResponse.json({
    status: ResultStatusEnum.SUCCESS,
    message: '',
    data: sortRoles(cloneRoleList())
  });
});

/**
 * Mock 删除角色接口。
 *
 * Mock delete role API.
 */
const deleteRole = http.post(GLOBAL_CONFIG.apiBaseUrl + ROLE_API_MAP.DELETE, async ({ request }) => {
  await delay(300);

  const { id } = (await request.json()) as { id: string };
  const targetIndex = roleStore.findIndex(item => item.id === id);

  /*
   * 删除请求命中不到角色时直接报错。
   * 这样列表页能明确知道当前数据已经过期，而不是误以为删除成功。
   *
   * Missing targets should fail explicitly.
   * This tells the list page that its data is stale instead of pretending the delete succeeded.
   */
  if (targetIndex < 0) {
    return HttpResponse.json({
      status: 10002,
      message: 'Role not found'
    });
  }

  roleStore.splice(targetIndex, 1);

  return HttpResponse.json({
    status: ResultStatusEnum.SUCCESS,
    message: '',
    data: sortRoles(cloneRoleList())
  });
});

export { createRole, deleteRole, getRoleList, updateRole };
